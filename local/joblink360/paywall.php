<?php
require_once(__DIR__ . '/../../config.php');
require_login();

$batchId = required_param('batch', PARAM_INT);
$PAGE->set_url(new moodle_url('/local/joblink360/paywall.php', array('batch' => $batchId)));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("Sovereign Access | Unlock Batch $batchId");

echo $OUTPUT->header();

// March 20, 2026 - Deployment Rates
$unlock_fee_usd = 10; // Nominal entry fee to filter "tourists"
$kes_fee = 1288; // ~$10 USD at 128.82 rate

echo "<div style='max-width:600px; margin:auto; padding:40px; background:#fff; border-radius:15px; box-shadow:0 10px 30px rgba(0,0,0,0.1); border-top: 5px solid #d4af37;'>";
echo "<h2 style='text-align:center;'>Unlock Deep-Delve Intelligence</h2>";
echo "<p style='text-align:center; color:#666;'>Batch $batchId contains 10 Verified High-Growth Jobs.</p>";

echo "<div style='background:#f9f9f9; padding:20px; border-radius:10px; margin:20px 0;'>";
echo "<h4>Sovereign Commitment:</h4>";
echo "<ul>
        <li>One-time Unlock: <strong>KES $kes_fee</strong></li>
        <li>Future Revenue Share: <strong>30% of earned income</strong></li>
        <li>90-Day Income Guarantee: <strong>Active</strong></li>
      </ul>";
echo "</div>";

echo "<div style='text-align:center;'>";
echo "<button class='btn btn-success' style='padding:15px 30px; font-size:1.2em;'>Pay via M-PESA / Card</button>";
echo "<p style='margin-top:15px; font-size:0.8em;'>By clicking, you accept the JobLink 360 Rev-Share Agreement.</p>";
echo "</div>";

echo "</div>";
echo $OUTPUT->footer();
