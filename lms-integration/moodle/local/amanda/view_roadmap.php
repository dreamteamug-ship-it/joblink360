<?php
require_once(__DIR__ . '/../../config.php');
require_login();
$context = context_system::instance();
$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/amanda/view_roadmap.php'));
$PAGE->set_title("Amanda AI | Sovereign Roadmap");

echo $OUTPUT->header();
?>
<div class="amanda-container">
    <h1>Sovereign Roadmap Retrieval</h1>
    <p>Loading encrypted data from JobLink 360 Core...</p>
</div>
<?php
echo $OUTPUT->footer();
