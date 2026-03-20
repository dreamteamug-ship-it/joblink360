<?php
require_once(__DIR__ . '/../../config.php');
require_login();

$PAGE->set_url(new moodle_url('/local/joblink360/partner_upload.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("Partner Intelligence Portal | JobLink 360");

echo $OUTPUT->header();

echo "<div style='max-width:800px; margin:auto; padding:30px; background:#fff; border-radius:15px; border: 1px solid #ddd;'>";
echo "<h2>Submit Your Expert Intelligence</h2>";
echo "<p>Upload your training content. Amanda will analyze the quality and value in real-time.</p>";

echo "<form action='process_upload.php' method='post' enctype='multipart/form-data' style='margin-top:20px;'>";
echo "  <div class='form-group'>
            <label>Content Title:</label>
            <input type='text' name='title' class='form-control' required placeholder='e.g., Advanced Prompting for Kenyan Real Estate'>
        </div><br>";
echo "  <div class='form-group'>
            <label>Select Video/Audio/PDF:</label>
            <input type='file' name='expert_content' class='form-control' required>
        </div><br>";
echo "  <button type='submit' class='btn btn-primary' style='background:#d4af37; border:none;'>Analyze & Submit for Payment</button>";
echo "</form>";

echo "<hr><p style='font-size:0.9em; color:#666;'>Note: Payments are calculated based on 'Information Density' and 'Market Relevance' for the 26 Focus Countries.</p>";
echo "</div>";

echo $OUTPUT->footer();
