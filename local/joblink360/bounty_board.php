<?php
require_once(__DIR__ . '/../../config.php');
require_login();

$PAGE->set_url(new moodle_url('/local/joblink360/bounty_board.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("Intelligence Bounties | JobLink 360");

echo $OUTPUT->header();

$bountyFile = $CFG->dirroot . '/local/amanda/assets/knowledge_base/active_bounties.txt';

echo "<div style='padding:30px; background:#fff; border-radius:15px; border-left: 5px solid #ff4444;'>";
echo "<h2>Live Intelligence Bounties (March 2026)</h2>";
echo "<p>Amanda has identified these high-demand gaps. First-to-submit high-quality content gets paid.</p>";

if (file_exists($bountyFile)) {
    $bounties = file($bountyFile);
    echo "<ul class='list-group'>";
    foreach (array_reverse($bounties) as $bounty) {
        echo "<li class='list-group-item' style='margin-bottom:10px;'>
                <strong>$bounty</strong> 
                <a href='partner_upload.php' class='btn btn-sm btn-dark' style='float:right;'>Submit Intel</a>
              </li>";
    }
    echo "ul>";
} else {
    echo "<p>All intelligence sectors are currently saturated. Check back in 24 hours.</p>";
}

echo "</div>";
echo $OUTPUT->footer();
