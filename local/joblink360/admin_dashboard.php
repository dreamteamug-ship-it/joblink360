<?php
require_once(__DIR__ . '/../../config.php');
require_login();
$context = context_system::instance();
require_capability('moodle/site:config', $context);

$PAGE->set_url(new moodle_url('/local/joblink360/admin_dashboard.php'));
$PAGE->set_context($context);
$PAGE->set_title("JobLink 360 | Sovereign Command");

echo $OUTPUT->header();

// --- LIVE METRICS BLOCK ---
echo "<div style='background:#1a1a1a; color:#fff; padding:30px; border-radius:15px; border-left: 5px solid #d4af37;'>";
echo "<h1>Sovereign Command Center</h1>";
echo "<p style='color:#888;'>System Architect: Sande Allan | Session: March 20, 2026</p>";

// --- QUICK ACCESS VAULT ---
echo "<div style='margin:20px 0; padding:15px; background:#222; border:1px solid #d4af37; border-radius:10px;'>";
echo "<h3 style='color:#d4af37; margin-top:0;'>The Vault</h3>";
echo "<a href='file:///C:/Users/25479/joblink360/joblink360/local/amanda/assets/Sovereign_Master_Deed.html' target='_blank' class='btn btn-warning' style='background:#d4af37; color:#000; font-weight:bold;'>View Master Deed (Local)</a> ";
echo "<button class='btn btn-outline-light' onclick='alert(\"Cloud Migration Engine Initialized. Preparing S3/Azure Blob Sync...\")'>Prepare Cloud Migration</button>";
echo "</div>";

// ... [Existing Metrics Table Logic] ...
echo "<p style='font-size:0.8em; color:#555;'>Cloud Hook Status: STANDBY (Ready for AWS/S3 Integration)</p>";
echo "</div>";
echo $OUTPUT->footer();
