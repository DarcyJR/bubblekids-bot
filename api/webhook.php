<?php
// Lê o JSON enviado pelo Telegram
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Apenas pra teste — grava o corpo em log.txt (opcional)
file_put_contents("log.txt", $content . PHP_EOL, FILE_APPEND);

// Verifica se é um clique de botão
if (isset($update["callback_query"])) {
    $callback = $update["callback_query"];
    $chat_id = $callback["message"]["chat"]["id"];
    $data = $callback["data"];

    $token = "8373241128:AAFC-sYdvXJkxTzGmEdu7Qo0xeyfcAMK554";
    $url = "https://api.telegram.org/bot$token/sendMessage";

    $text = "";
    if ($data === "vendido_001") {
        $text = "✅ Venda confirmada!";
    } elseif ($data === "cancelar_001") {
        $text = "❌ Venda cancelada!";
    }

    $payload = [
        "chat_id" => $chat_id,
        "text" => $text
    ];

    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($payload)
        ]
    ];

    file_get_contents($url, false, stream_context_create($options));
}

echo json_encode(["ok" => true]);
