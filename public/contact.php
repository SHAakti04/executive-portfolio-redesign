<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$configPath = __DIR__ . '/../contact-config.php';

if (!file_exists($configPath)) {
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
    respond(500, ['ok' => false, 'error' => 'Message could not be sent.']);
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

    return <<<HTML
<!doctype html>
<html>
  <body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#0f172a;">
    <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
      <div style="background:#071225;color:#ffffff;border-radius:18px 18px 0 0;padding:28px;">
        <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7dd3fc;">Portfolio Inquiry</div>
        <h1 style="margin:10px 0 0;font-size:26px;line-height:1.3;">New message for {$safeBrand}</h1>
        <p style="margin:10px 0 0;color:#cbd5e1;font-size:14px;">Request ID: {$safeRequestId} · {$safeSubmittedAt}</p>
      </div>

      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:0;padding:28px;">
        <h2 style="margin:0 0 14px;font-size:18px;">Contact Details</h2>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr>
            <td style="padding:10px 0;color:#64748b;width:120px;">Name</td>
            <td style="padding:10px 0;font-weight:700;">{$safeName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#64748b;">Email</td>
            <td style="padding:10px 0;"><a href="mailto:{$safeEmail}" style="color:#2563eb;">{$safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#64748b;">Source</td>
            <td style="padding:10px 0;"><a href="{$safeSiteUrl}" style="color:#2563eb;">{$safeSiteUrl}</a></td>
          </tr>
        </table>

        <div style="margin-top:24px;padding:22px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;">
          <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;font-weight:700;">Message</div>
          <div style="margin-top:12px;font-size:16px;line-height:1.7;color:#0f172a;">{$safeMessage}</div>
        </div>

        <div style="margin-top:24px;padding:18px;border-radius:14px;background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;">
          <strong>Recommended next step:</strong> Reply directly to this email within one business day.
        </div>
      </div>

      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 18px 18px;padding:20px 28px;color:#64748b;font-size:12px;">
        This message was sent from the official {$safeBrand} portfolio website.
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
    $safeSiteUrl = h($siteUrl);
    $safeBrand = h($brandName);
    $safeRequestId = h($requestId);

    return <<<HTML
<!doctype html>
<html>
  <body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#0f172a;">
    <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
      <div style="background:#071225;color:#ffffff;border-radius:18px 18px 0 0;padding:30px;">
        <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7dd3fc;">Message Received</div>
        <h1 style="margin:10px 0 0;font-size:26px;line-height:1.3;">Thank you for reaching out</h1>
      </div>

      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:0;padding:30px;">
        <p style="margin:0 0 18px;font-size:16px;line-height:1.7;">Dear {$firstName},</p>

        <p style="margin:0 0 18px;font-size:16px;line-height:1.7;">
          Thank you for contacting {$safeBrand}. Your message has been received successfully.
        </p>

        <p style="margin:0 0 18px;font-size:16px;line-height:1.7;">
          We appreciate your interest and the time you took to share your note. If your inquiry relates
          to business growth, technology partnerships, global expansion, Kefaru Technologies, or Anandvan,
          it will be reviewed with care and responded to as soon as possible.
        </p>

        <div style="margin:24px 0;padding:18px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;">
          <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;font-weight:700;">Reference</div>
          <div style="margin-top:8px;font-size:15px;color:#0f172a;">Request ID: <strong>{$safeRequestId}</strong></div>
        </div>

        <p style="margin:0;font-size:16px;line-height:1.7;">
          Warm regards,<br />
          <strong>Office of {$safeBrand}</strong><br />
          <a href="{$safeSiteUrl}" style="color:#2563eb;">{$safeSiteUrl}</a>
        </p>
      </div>

      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 18px 18px;padding:20px 30px;color:#64748b;font-size:12px;line-height:1.6;">
        This is an automated acknowledgement. You can reply to this email if you need to add more details.
      </div>
    </div>
  </body>
</html>
HTML;
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
        "https://graph.microsoft.com/v1.0/users/{$senderEmail}/sendMail",
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