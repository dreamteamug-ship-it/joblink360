<?php
define('AJAX_SCRIPT', true);
require_once('../../config.php');
header('Content-Type: application/json');
require_login();

$input = json_decode(file_get_contents('php://input'), true);
$question = $input['question'];

// DIRECT HANDSHAKE WITH OLLAMA (Bypassing Node.js Monitor)
$ch = curl_init('http://127.0.0.1:11434/api/generate');
$payload = json_encode([
    "model" => "qwen2.5-coder:1.5b",
    "prompt" => "You are Amanda, the JobLink 360 Career Coach. Context: Sovereign SOP. Student asks: $question",
    "stream" => false
]);

curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); 

$result = json_decode(curl_exec($ch), true);

if (curl_errno($ch)) {
    echo json_encode(['success' => false, 'error' => curl_error($ch)]);
} else {
    echo json_encode(['success' => true, 'response' => $result['response']]);
}
curl_close($ch);
