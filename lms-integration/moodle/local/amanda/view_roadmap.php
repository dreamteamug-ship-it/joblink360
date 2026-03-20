<?php
require_once(__DIR__ . '/../../config.php');
require_login();

$id = required_param('id', PARAM_INT);
$roadmap = $DB->get_record('local_amanda_roadmaps', ['id' => $id], '*', MUST_EXIST);

$PAGE->set_url(new moodle_url('/local/amanda/view_roadmap.php', ['id' => $id]));
$PAGE->set_context(context_system::instance());
$PAGE->set_title('Viewing Roadmap: ' . $roadmap->student_name);

echo $OUTPUT->header();
?>
<div id="a4-viewer" style="width: 210mm; margin: auto; padding: 20mm; background: white; border: 1px solid #C5A059; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h1 style="color: #0A192F; border-bottom: 2px solid #C5A059;"><?php echo $roadmap->student_name; ?></h1>
    <h3>Strategic Focus</h3>
    <div><?php echo $roadmap->roadmap_content; ?></div>
    <h3>Milestones</h3>
    <div><?php echo $roadmap->milestones; ?></div>
    <hr>
    <p style="font-size: 10px; color: #888;">Submitted: <?php echo userdate($roadmap->timecreated); ?></p>
</div>
<div style="text-align:center; margin-top:20px;">
    <button onclick="window.print()" class="btn btn-secondary">Print to PDF</button>
</div>
<?php
echo $OUTPUT->footer();
