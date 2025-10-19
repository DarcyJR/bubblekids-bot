<?php
// Vercel PHP serverless handler

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header("HTTP/1.1 405 Method Not Allowed");
  echo json_encode(["ok" => false, "message" => "Method not allowed"]);
  exit;
}

// Lê o JSON enviado pelo Telegram
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Só pra debug (opcional)
file_put_contents("log.txt", date('Y-m-d H:i:s') . " - " . $content . PHP_EOL, FILE_APPEND);

if (isset($update["callback_query"])) {
  $callback = $update["callback_query"];
  $chat_id = $callback["message"]["chat"]["id"];
  $data = $callback["data"];

  $token = "8373241128:AAFC-sYdvXJkxTzGmEdu7Qo0xeyfcAMK554";
  $url = "https://api.telegram.org/bot$token/sendMessage";

  $text = match($data) {
    "vendido_001" => "✅ Venda confirmada!",
    "cancelar_001" => "❌ Venda cancelada!",
    default => "⚠️ Ação desconhecida: " . $data,
  };

  $payload = json_encode([
    "chat_id" => $chat_id,
    "text" => $text
  ]);

  $opts = [
    'http' => [
      'method' => 'POST',
      'header' => "Content-Type: application/json\r\n",
      'content' => $payload
    ]
  ];
  file_get_contents($url, false, stream_context_create($opts));
}

header("Content-Type: application/json");
echo json_encode(["ok" => true]);
