<?php
require_once(__DIR__ . '/../../config.php');
require_login();
$PAGE->set_url(new moodle_url('/local/joblink360/index.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("JobLink 360 | Opportunity Map");
$PAGE->set_heading("Continental Demand (March 2026)");
echo $OUTPUT->header();
echo "<div style='padding:20px; background:#fff; border-top: 5px solid #d4af37;'>";
echo "<h1 style='color:#1a1a1a;'>Opportunity Map: 26 Countries</h1>";
echo "<p>Sovereign Exchange Rates: KES 128.82 | NGN 1352.89 | UGX 3754.24</p>";
echo "<table class='generaltable' style='width:100%'><thead><tr><th>Job</th><th>Region</th><th>Net Pay (70%)</th><th>Action</th></tr></thead><tbody>";
// Logic to read C:\Users\25479\joblink360\joblink360\local\amanda\assets\knowledge_base\Continental_Demand.csv
echo "</tbody></table></div>";
echo $OUTPUT->footer();
