<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$configPaths = [
    __DIR__ . '/contact-config.php',
    __DIR__ . '/../contact-config.php',
];

$configPath = '';

foreach ($configPaths as $path) {
    if (is_file($path)) {
        $configPath = $path;
        break;
    }
}

if ($configPath === '') {
    respond(500, ['ok' => false, 'error' => 'Email configuration is missing.']);
}

$config = require $configPath;

$tenantId = trim((string)($config['tenant_id'] ?? ''));
$clientId = trim((string)($config['client_id'] ?? ''));
$clientSecret = trim((string)($config['client_secret'] ?? ''));
$senderEmail = trim((string)($config['sender_email'] ?? 'gs@kefaru.com'));
$recipientEmail = trim((string)($config['recipient_email'] ?? 'gs@kefaru.com'));
$siteUrl = trim((string)($config['site_url'] ?? 'https://gurpreetbahara.com/'));
$brandName = trim((string)($config['brand_name'] ?? 'Gurpreet Bahara'));

if ($tenantId === '' || $clientId === '' || $clientSecret === '') {
    respond(500, ['ok' => false, 'error' => 'Email configuration is incomplete.']);
}

$input = json_decode(file_get_contents('php://input') ?: '', true);

if (!is_array($input)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

$name = cleanText((string)($input['name'] ?? ''), 120);
$email = cleanText((string)($input['email'] ?? ''), 180);
$message = cleanText((string)($input['message'] ?? ''), 4000);
$website = trim((string)($input['website'] ?? ''));

if ($website !== '') {
    respond(200, ['ok' => true]);
}

if ($name === '' || $email === '' || $message === '') {
    respond(400, ['ok' => false, 'error' => 'Please fill all required fields.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}

$requestId = strtoupper(bin2hex(random_bytes(4)));
$submittedAt = gmdate('d M Y, H:i') . ' UTC';

$tokenResponse = httpPostForm(
    "https://login.microsoftonline.com/{$tenantId}/oauth2/v2.0/token",
    [
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
        'scope' => 'https://graph.microsoft.com/.default',
        'grant_type' => 'client_credentials',
    ]
);

if (!isset($tokenResponse['access_token'])) {
    error_log('Microsoft Graph auth failed: ' . json_encode($tokenResponse));
    respond(500, ['ok' => false, 'error' => 'Could not authenticate email service.']);
}

$accessToken = (string)$tokenResponse['access_token'];

$ownerSubject = "New Portfolio Inquiry | {$name} | {$requestId}";
$ownerHtml = buildOwnerEmail($name, $email, $message, $siteUrl, $brandName, $requestId, $submittedAt);

$ownerResult = sendGraphMail(
    $senderEmail,
    $recipientEmail,
    $ownerSubject,
    $ownerHtml,
    $accessToken,
    [['address' => $email, 'name' => $name]]
);

if (!$ownerResult['ok']) {
    error_log('Owner notification failed: ' . json_encode($ownerResult));

    $publicError = 'Message could not be sent.';

    if ($debugEmailErrors) {
        $graphDetails = trim((string)($ownerResult['response'] ?? $ownerResult['error'] ?? ''));
        $status = (int)($ownerResult['status'] ?? 0);

        $publicError .= ' Microsoft Graph status: ' . $status . '.';

        if ($graphDetails !== '') {
            $publicError .= ' Microsoft Graph response: ' . cleanText($graphDetails, 900);
        }
    }

    respond(500, ['ok' => false, 'error' => $publicError]);
}

$replySubject = "Thank you for reaching out to {$brandName}";
$replyHtml = buildAutoReplyEmail($name, $message, $siteUrl, $brandName, $requestId);

$replyResult = sendGraphMail(
    $senderEmail,
    $email,
    $replySubject,
    $replyHtml,
    $accessToken,
    [['address' => $senderEmail, 'name' => $brandName]]
);

if (!$replyResult['ok']) {
    error_log('Auto-reply failed: ' . json_encode($replyResult));
}

respond(200, [
    'ok' => true,
    'requestId' => $requestId,
    'autoReplySent' => $replyResult['ok'],
]);

function buildOwnerEmail(
    string $name,
    string $email,
    string $message,
    string $siteUrl,
    string $brandName,
    string $requestId,
    string $submittedAt
): string {
    $safeName = h($name);
    $safeEmail = h($email);
    $safeMessage = nl2br(h($message));
    $safeSiteUrl = h($siteUrl);
    $safeBrand = h($brandName);
    $safeRequestId = h($requestId);
    $safeSubmittedAt = h($submittedAt);
    $footerImageSrc = h(emailFooterImageSrc());

    return <<<HTML
<!doctype html>
<html>
  <body style="margin:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <div style="max-width:760px;margin:0 auto;padding:34px 16px;">
      <div style="border-radius:24px;overflow:hidden;background:#ffffff;border:1px solid #d9e2ef;box-shadow:0 28px 80px rgba(15,23,42,0.14);">
        <div style="background:#071225;padding:34px;color:#ffffff;">
          <div style="font-size:11px;line-height:1;letter-spacing:3px;text-transform:uppercase;color:#d6b36a;font-weight:700;">
            Portfolio Inquiry
          </div>
          <h1 style="margin:14px 0 0;font-size:31px;line-height:1.2;font-weight:700;color:#ffffff;">
            New message for {$safeBrand}
          </h1>
          <p style="margin:14px 0 0;font-size:14px;line-height:1.7;color:#c8d3e2;">
            Request ID: <strong style="color:#ffffff;">{$safeRequestId}</strong> &nbsp;|&nbsp; {$safeSubmittedAt}
          </p>
        </div>

        <div style="padding:34px;background:#ffffff;">
          <div style="margin:0 0 24px;padding:22px;border-radius:18px;background:#f7f9fc;border:1px solid #dbe4f0;">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a6a2d;font-weight:700;">
              Lead Snapshot
            </div>

            <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:14px;">
              <tr>
                <td style="padding:12px 0;color:#667085;font-size:13px;width:110px;">Name</td>
                <td style="padding:12px 0;color:#111827;font-size:16px;font-weight:700;">{$safeName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#667085;font-size:13px;">Email</td>
                <td style="padding:12px 0;font-size:16px;">
                  <a href="mailto:{$safeEmail}" style="color:#0b5cab;text-decoration:none;font-weight:700;">{$safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#667085;font-size:13px;">Source</td>
                <td style="padding:12px 0;font-size:16px;">
                  <a href="{$safeSiteUrl}" style="color:#0b5cab;text-decoration:none;font-weight:700;">{$safeSiteUrl}</a>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin:0 0 24px;padding:26px;border-radius:20px;background:#071225;color:#ffffff;">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d6b36a;font-weight:700;">
              Inquiry Message
            </div>
            <div style="margin-top:16px;font-size:17px;line-height:1.8;color:#e6edf7;">
              {$safeMessage}
            </div>
          </div>

          <div style="display:block;margin:0 0 26px;padding:22px;border-radius:18px;background:#fbf7ed;border:1px solid #ead9b7;">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a6a2d;font-weight:700;">
              Recommended Next Step
            </div>
            <div style="margin-top:10px;font-size:15px;line-height:1.7;color:#5f4b22;">
              Reply directly to this inquiry within one business day. The sender has already received
              an automated acknowledgement with the same request ID.
            </div>
          </div>

          <div style="margin:30px 0 0;color:#111827;">
            <div style="font-size:19px;line-height:1.35;font-weight:700;">
              Gurpreet Singh <span style="font-weight:400;">| Founder</span>
            </div>
            <div style="height:1px;background:#111827;margin:6px 0 10px;width:100%;max-width:420px;"></div>

            <div style="font-size:14px;line-height:1.8;color:#111827;">
              <strong>Contact :</strong> +91 9561117952<br />
              <strong>Email :</strong> <a href="mailto:gs@kefaru.com" style="color:#0b5cab;text-decoration:none;">gs@kefaru.com</a><br />
              <strong>Website:</strong> <a href="https://kefaru.com/" style="color:#0b5cab;text-decoration:none;">https://Kefaru.com</a>
            </div>

            <div style="height:1px;background:#111827;margin:8px 0 8px;width:100%;max-width:420px;"></div>
            <div style="font-size:14px;line-height:1.4;font-weight:800;color:#111827;">
              Kefaru Technologies INC
            </div>
          </div>
        </div>

        <div style="background:#ffffff;padding:0 0 26px;">
          <img src="{$footerImageSrc}" alt="Kefaru Technologies INC" style="display:block;width:100%;max-width:540px;height:auto;border:0;outline:none;text-decoration:none;" />
        </div>

        <div style="background:#071225;padding:18px 34px;color:#9fb0c5;">
          <div style="font-size:12px;line-height:1.7;color:#9fb0c5;">
            This owner notification was sent from the official {$safeBrand} portfolio website.
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
HTML;
}

function buildAutoReplyEmail(
    string $name,
    string $message,
    string $siteUrl,
    string $brandName,
    string $requestId
): string {
    $firstName = h(firstName($name));
    $safeBrand = h($brandName);
    $safeRequestId = h($requestId);
    $footerImageSrc = h(emailFooterImageSrc());

    return <<<HTML
<!doctype html>
<html>
  <body style="margin:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <div style="max-width:720px;margin:0 auto;padding:34px 16px;">
      <div style="border-radius:24px;overflow:hidden;background:#ffffff;border:1px solid #d9e2ef;box-shadow:0 28px 80px rgba(15,23,42,0.14);">
        <div style="background:#071225;padding:34px 34px 30px;color:#ffffff;">
          <div style="font-size:11px;line-height:1;letter-spacing:3px;text-transform:uppercase;color:#d6b36a;font-weight:700;">
            Message Received
          </div>
          <h1 style="margin:14px 0 0;font-size:31px;line-height:1.2;font-weight:700;color:#ffffff;">
            Thank you for reaching out.
          </h1>
          <p style="margin:14px 0 0;max-width:540px;font-size:15px;line-height:1.75;color:#c8d3e2;">
            Your message has been received by the Office of {$safeBrand}.
          </p>
        </div>

        <div style="padding:34px;background:#ffffff;">
          <p style="margin:0 0 20px;font-size:16px;line-height:1.75;color:#111827;">
            Dear {$firstName},
          </p>

          <p style="margin:0 0 20px;font-size:16px;line-height:1.75;color:#263244;">
            Thank you for contacting {$safeBrand}. Your message has been received successfully and
            will be reviewed with care.
          </p>

          <p style="margin:0 0 24px;font-size:16px;line-height:1.75;color:#263244;">
            If your inquiry relates to business growth, technology partnerships, global expansion,
            Kefaru Technologies, or Sardar Swaran Singh's Anandvan, the appropriate context will be
            considered before responding.
          </p>

          <div style="margin:28px 0;padding:22px;border-radius:18px;background:#f7f9fc;border:1px solid #dbe4f0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="vertical-align:top;width:54px;">
                  <div style="width:42px;height:42px;border-radius:50%;background:#071225;color:#d6b36a;text-align:center;line-height:42px;font-size:20px;font-weight:700;">
                    G
                  </div>
                </td>
                <td style="vertical-align:top;">
                  <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a6a2d;font-weight:700;">
                    Reference
                  </div>
                  <div style="margin-top:7px;font-size:16px;color:#111827;">
                    Request ID: <strong>{$safeRequestId}</strong>
                  </div>
                  <div style="margin-top:8px;font-size:13px;line-height:1.6;color:#667085;">
                    Please keep this reference if you reply with additional details.
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin:30px 0 0;padding:24px;border-left:4px solid #d6b36a;background:#fbf7ed;">
            <div style="font-size:13px;line-height:1.7;color:#5f4b22;">
              This acknowledgement confirms receipt only. A considered response will follow where
              the inquiry requires direct review.
            </div>
          </div>

          <div style="margin:32px 0 0;color:#111827;">
            <div style="font-size:19px;line-height:1.35;font-weight:700;">
              Gurpreet Singh <span style="font-weight:400;">| Founder</span>
            </div>
            <div style="height:1px;background:#111827;margin:6px 0 10px;width:100%;max-width:420px;"></div>

            <div style="font-size:14px;line-height:1.8;color:#111827;">
              <strong>Contact :</strong> +91 9561117952<br />
              <strong>Email :</strong> <a href="mailto:gs@kefaru.com" style="color:#0b5cab;text-decoration:none;">gs@kefaru.com</a><br />
              <strong>Website:</strong> <a href="https://kefaru.com/" style="color:#0b5cab;text-decoration:none;">https://Kefaru.com</a>
            </div>

            <div style="height:1px;background:#111827;margin:8px 0 8px;width:100%;max-width:420px;"></div>
            <div style="font-size:14px;line-height:1.4;font-weight:800;color:#111827;">
              Kefaru Technologies INC
            </div>
          </div>
        </div>

        <div style="background:#ffffff;padding:0 0 26px;">
          <img src="{$footerImageSrc}" alt="Kefaru Technologies INC" style="display:block;width:100%;max-width:540px;height:auto;border:0;outline:none;text-decoration:none;" />
        </div>

        <div style="background:#071225;padding:18px 34px;color:#9fb0c5;">
          <div style="font-size:12px;line-height:1.7;color:#9fb0c5;">
            This is an automated acknowledgement. You can reply to this email if you need to add more details.
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
HTML;
}

function emailFooterImageSrc(): string
{
    $paths = [
        __DIR__ . '/../src/assets/footer.png',
        __DIR__ . '/assets/footer.png',
        __DIR__ . '/footer.png',
    ];

    foreach ($paths as $path) {
        if (is_file($path)) {
            $data = base64_encode((string)file_get_contents($path));
            return 'data:image/png;base64,' . $data;
        }
    }

    return '';
}
function sendGraphMail(
    string $senderEmail,
    string $toEmail,
    string $subject,
    string $htmlBody,
    string $accessToken,
    array $replyTo = []
): array {
    $message = [
        'subject' => $subject,
        'body' => [
            'contentType' => 'HTML',
            'content' => $htmlBody,
        ],
        'toRecipients' => [
            [
                'emailAddress' => [
                    'address' => $toEmail,
                ],
            ],
        ],
    ];

    if ($replyTo !== []) {
        $message['replyTo'] = array_map(
            fn ($item) => [
                'emailAddress' => [
                    'address' => $item['address'],
                    'name' => $item['name'] ?? $item['address'],
                ],
            ],
            $replyTo
        );
    }

    return httpPostJson(
        'https://graph.microsoft.com/v1.0/users/' . rawurlencode($senderEmail) . '/sendMail',
        [
            'message' => $message,
            'saveToSentItems' => true,
        ],
        $accessToken
    );
}

function cleanText(string $value, int $maxLength): string
{
    $value = trim(str_replace(["\0", "\r"], '', $value));
    return mb_substr($value, 0, $maxLength);
}

function firstName(string $name): string
{
    $parts = preg_split('/\s+/', trim($name));
    return $parts && $parts[0] !== '' ? $parts[0] : 'there';
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function httpPostForm(string $url, array $data): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($data),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_TIMEOUT => 20,
    ]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        return ['error' => $error ?: 'Token request failed.'];
    }

    $decoded = json_decode((string)$response, true);
    return is_array($decoded) ? $decoded : [];
}

function httpPostJson(string $url, array $data, string $accessToken): array
{
    $ch = curl_init($url);

    if ($ch === false) {
        return [
            'ok' => false,
            'status' => 0,
            'response' => null,
            'error' => 'Could not initialize cURL.',
        ];
    }

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT => 20,
    ]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'ok' => $status >= 200 && $status < 300,
        'status' => $status,
        'response' => $response,
        'error' => $error,
    ];
}