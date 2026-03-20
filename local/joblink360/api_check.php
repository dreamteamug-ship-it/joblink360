<?php
// Admin API Status Checker
$required_apis = [
    'SAFARICOM_DARAJA_CONSUMER_KEY',
    'SAFARICOM_DARAJA_CONSUMER_SECRET',
    'SAFARICOM_DARAJA_SHORTCODE',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
];

echo "<h3>API Infrastructure Audit</h3>";
echo "<ul class='list-group'>";
foreach ($required_apis as $api) {
    $status = getenv($api) ? "✅ SECURED" : "❌ MISSING";
    $color = getenv($api) ? "green" : "red";
    echo "<li class='list-group-item'>$api: <strong style='color:$color;'>$status</strong></li>";
}
echo "</ul>";
