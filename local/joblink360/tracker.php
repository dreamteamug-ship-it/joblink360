<?php
require_once(__DIR__ . '/../../config.php');
require_login();

$PAGE->set_url(new moodle_url('/local/joblink360/tracker.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("JobLink 360 | My Income Roadmap");
$PAGE->set_heading("Your 90-Day Sovereign Progress");

echo $OUTPUT->header();

// 1. March 2026 Rates (Nairobi Market Live)
$kes_rate = 128.82; 
$target_monthly_usd = 1500; // Sample Target

echo "<div class='tracker-container' style='padding:20px; font-family: sans-serif;'>";

// 2. The Income Progress Bar
echo "<div style='background:#eee; border-radius:10px; height:30px; margin-bottom:10px;'>
        <div style='background:#d4af37; width:35%; height:100%; border-radius:10px; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;'>
            35% of Goal Reached
        </div>
      </div>";

echo "<h3>Financial Outlook (March 2026)</h3>";
echo "<table class='table' style='width:100%; background:#fff; border:1px solid #ddd;'>";
echo "<tr><td><strong>Current Training Track:</strong></td><td>AI Prompt Engineering (Batch 4)</td></tr>";
echo "<tr><td><strong>Target Monthly Gross:</strong></td><td>$" . number_format($target_monthly_usd, 2) . "</td></tr>";
echo "<tr><td><strong>Platform Revenue Share (30%):</strong></td><td style='color:red;'>-$" . number_format($target_monthly_usd * 0.3, 2) . "</td></tr>";
echo "<tr><td><strong>Your Net Monthly (70%):</strong></td><td style='color:green; font-size:1.2em; font-weight:bold;'>KES " . number_format(($target_monthly_usd * 0.7) * $kes_rate, 2) . "</td></tr>";
echo "</table>";

echo "<h3>Active Deep-Delve Manuals</h3>";
echo "<ul>
        <li><a href='manual.php?batch=4'>Mastering RAG Systems (SADC Focus)</a> - 80% Complete</li>
        <li><a href='manual.php?batch=7'>Llama 3 Fine-tuning</a> - 10% Complete</li>
      </ul>";

echo "</div>";
echo $OUTPUT->footer();
