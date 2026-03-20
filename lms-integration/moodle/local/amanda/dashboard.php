<?php
require_once(__DIR__ . '/../../config.php');
require_login();

// Security: Only allow Teachers or Admins
$context = context_system::instance();
require_capability('moodle/site:config', $context); 

$PAGE->set_url(new moodle_url('/local/amanda/dashboard.php'));
$PAGE->set_context($context);
$PAGE->set_title('JobLink 360 | Mentor Dashboard');

echo $OUTPUT->header();
echo $OUTPUT->heading('Sovereign Roadmap Submissions');

// Fetch all roadmaps joined with user names
$sql = "SELECT r.*, u.firstname, u.lastname 
        FROM {local_amanda_roadmaps} r 
        JOIN {user} u ON r.userid = u.id 
        ORDER BY r.timecreated DESC";

$roadmaps = $DB->get_records_sql($sql);

if ($roadmaps) {
    echo '<table class="generaltable" style="width:100%; border-collapse: collapse;">';
    echo '<thead><tr><th>Student</th><th>Date</th><th>Strategic Focus</th><th>Action</th></tr></thead>';
    echo '<tbody>';
    foreach ($roadmaps as $rm) {
        $date = userdate($rm->timecreated);
        echo "<tr>
                <td>{$rm->firstname} {$rm->lastname}</td>
                <td>{$date}</td>
                <td style='max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;'>".format_text($rm->roadmap_content)."</td>
                <td><a href='view_roadmap.php?id={$rm->id}' class='btn btn-primary'>View Full A4</a></td>
              </tr>";
    }
    echo '</tbody></table>';
} else {
    echo $OUTPUT->notification('No roadmaps have been submitted yet.', 'info');
}

echo $OUTPUT->footer();
