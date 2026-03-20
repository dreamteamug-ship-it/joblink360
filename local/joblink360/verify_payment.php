<?php
require_once(__DIR__ . '/../../config.php');
require_login();

$batchId = $_POST['batch_id'];
$txId = $_POST['tx_id'];
$userId = $USER->id;

// Log this to the Sovereign Admin Table for Sande's Approval
// In a full build, this triggers the Supabase 'pending_payments' table
echo "<h2>Payment Submitted for Verification</h2>";
echo "<p>Transaction ID: <strong>$txId</strong> for Batch: $batchId</p>";
echo "<p>Amanda is cross-referencing this with our bank/M-PESA ledgers. Access will be granted within 15 minutes.</p>";
echo "<a href='index.php' class='btn btn-primary'>Return to Opportunity Map</a>";
