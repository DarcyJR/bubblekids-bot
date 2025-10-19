<?php
// webhook.php — compatível com Vercel

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(200); // evita 405
  echo "OK";
  exit;
}

$update = json_decode(file_get_contents("php://input"), true);

// Apenas para teste: salva o conteúdo recebido no log
file_put_contents("log.txt", print_r($update, true), FILE_APPEND);

// Responde OK pro Telegram
http_response_code(200);
echo "OK";
?>
