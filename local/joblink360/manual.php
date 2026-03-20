<?php
require_once(__DIR__ . '/../../config.php');
require_login();

// 1. Get the Job ID from the URL (e.g., manual.php?batch=1)
$batchId = optional_param('batch', 1, PARAM_INT);
$PAGE->set_url(new moodle_url('/local/joblink360/manual.php', array('batch' => $batchId)));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("JobLink 360 | Deep-Delve Training");

echo $OUTPUT->header();

// 2. Define the path to Amanda's Refined Manuals
$manualFile = $CFG->dirroot . "/local/amanda/assets/knowledge_base/Refined_Manuals/manual_batch_{$batchId}.html";

echo "<div class='sovereign-viewer' style='background:#f4f4f4; padding:20px; min-height:100vh;'>";

if (file_exists($manualFile)) {
    echo "<div class='alert alert-info'>Viewing Reverse-Engineered Batch: $batchId (March 2026 Strategy)</div>";
    
    // 3. Inject the A4 Content into the Moodle Page
    $content = file_get_content($manualFile);
    echo "<div class='a4-container' style='display:flex; justify-content:center;'>";
    echo $content; 
    echo "</div>";
} else {
    echo "<div class='alert alert-danger'>
            <h4>Manual Not Found</h4>
            <p>Amanda is still processing this batch. Please ensure the <strong>Batch_Refiner.ps1</strong> has been executed in the Engine Room.</p>
          </div>";
}

echo "</div>";
echo $OUTPUT->footer();
