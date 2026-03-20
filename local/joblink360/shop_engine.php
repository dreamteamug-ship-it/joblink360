<div class="sovereign-shop-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; padding: 20px; font-family: sans-serif;">
    <?php
    // BATCH DATA (Loaded from our March 2026 Scraper)
    $batches = [
        ['id' => 1, 'title' => 'AI Prompt Engineering (KE Focus)', 'jobs' => 42, 'fee' => 'KES 1,288', 'usd' => 10],
        ['id' => 2, 'title' => 'SADC Digital Logistics', 'jobs' => 18, 'fee' => 'KES 1,288', 'usd' => 10]
    ];

    foreach ($batches as $batch) {
        echo "
        <div class='card' style='background:#111; border: 2px solid #d4af37; border-radius:15px; padding:25px; color:#fff; box-shadow: 0 10px 30px rgba(0,0,0,0.5);'>
            <div style='background:#d4af37; color:#000; padding:5px 10px; display:inline-block; font-weight:bold; border-radius:5px; margin-bottom:15px;'>LIVE BATCH</div>
            <h3 style='margin:0;'>{$batch['title']}</h3>
            <p style='color:#888;'>{$batch['jobs']} Verified High-Growth Roles</p>
            <hr style='border-color:#333; margin:20px 0;'>
            
            <div style='background:#222; padding:15px; border-radius:10px; margin-bottom:20px;'>
                <p style='margin:0; font-size:0.8em; color:#d4af37;'>PAYMENT CHANNELS (IMMEDIATE UNLOCK):</p>
                <div style='font-size:0.9em; margin-top:10px;'>
                    <strong>🇰🇪 M-PESA Paybill:</strong> 400200 | Acc: [Your Phone/Acc]<br>
                    <strong>🌍 PayPal:</strong> payments@joblink360.com<br>
                    <strong>🏦 NCBA Bank:</strong> [Your Acc Number] | Swift: NCBAKENA
                </div>
            </div>

            <form action='verify_payment.php' method='POST' enctype='multipart/form-data'>
                <input type='hidden' name='batch_id' value='{$batch['id']}'>
                <label style='font-size:0.8em; color:#aaa;'>Input M-PESA Code / Transaction ID:</label>
                <input type='text' name='tx_id' placeholder='e.g. RCP5X2LQ9Z' required style='width:100%; padding:10px; margin:10px 0; border-radius:5px; border:none;'>
                <button type='submit' style='width:100%; background:#d4af37; color:#000; padding:15px; border:none; border-radius:5px; font-weight:bold; cursor:pointer; font-size:1em;'>
                    ACTIVATE DEEP-DELVE ACCESS
                </button>
            </form>
        </div>";
    }
    ?>
</div>
