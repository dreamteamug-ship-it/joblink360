<?php
define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../config.php');
require_login();

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'error' => 'No data packet received']);
    exit;
}

// Prepare the Moodle Database Object
$record = new stdClass();
$record->userid = $USER->id;
$record->student_name = s($input['student']);
// We keep the HTML tags for the Roadmap layout
$record->roadmap_content = $input['content']; 
$record->milestones = $input['milestones'];
$record->timecreated = time();

try {
    $DB->insert_record('local_amanda_roadmaps', $record);
    echo json_encode(['success' => true, 'message' => 'Roadmap Sovereignly Secured']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
