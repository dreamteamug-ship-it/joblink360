<?php
require_once('../../config.php');
require_login();
$PAGE->set_url(new moodle_url('/local/amanda/chat.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("Amanda AI - Sovereign Mentor");

echo $OUTPUT->header();
?>
<style>
:root { --deep-blue: #0A192F; --matte-gold: #D4AF37; --matte-cream: #FFFDF5; }
body { background-color: var(--matte-cream); font-family: 'Montserrat', sans-serif; }
.amanda-container { max-width: 800px; margin: 20px auto; border: 2px solid var(--matte-gold); border-radius: 8px; overflow: hidden; }
.amanda-header { background: var(--deep-blue); color: white; padding: 15px; border-bottom: 3px solid var(--matte-gold); text-align: center; }
.chat-box { height: 400px; overflow-y: auto; padding: 20px; background: white; }
.amanda-message { border-left: 5px solid var(--matte-gold); background: #f9f9f9; padding: 15px; margin-bottom: 10px; border-radius: 0 8px 8px 0; }
.user-input { display: flex; border-top: 1px solid #ddd; }
#query { flex: 1; padding: 15px; border: none; outline: none; }
#send-btn { background: var(--deep-blue); color: white; padding: 0 25px; border: none; cursor: pointer; border-left: 1px solid var(--matte-gold); }
</style>

<div class="amanda-container">
    <div class="amanda-header"><h3>AMANDA AI: SOVEREIGN MENTOR</h3></div>
    <div id="chat-box" class="chat-box">
        <div class="amanda-message">Greetings. I am Amanda. What are we building today?</div>
    </div>
    <div class="user-input">
        <input type="text" id="query" placeholder="Ask about your career or AI agency...">
        <button id="send-btn">SEND</button>
    </div>
</div>

<script>
document.getElementById('send-btn').onclick = async () => {
    const query = document.getElementById('query').value;
    if(!query) return;
    
    const box = document.getElementById('chat-box');
    box.innerHTML += `<div style="text-align:right; margin-bottom:10px;"><b>You:</b> ${query}</div>`;
    
    const response = await fetch('ajax_handler.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question: query})
    });
    const data = await response.json();
    box.innerHTML += `<div class="amanda-message"><b>Amanda:</b> ${data.response}</div>`;
    document.getElementById('query').value = '';
    box.scrollTop = box.scrollHeight;
};
</script>
<?php echo $OUTPUT->footer(); ?>
