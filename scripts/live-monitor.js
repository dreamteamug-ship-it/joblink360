const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            console.log(`\n[${new Date().toLocaleTimeString()}] 🧠 AMANDA THOUGHTS:`);
            console.log(`👤 Student: ${data.student || 'Sande Allan'}`);
            console.log(`❓ Query: ${data.question}`);
            console.log(`-----------------------------------------------`);
            res.end(JSON.stringify({ status: 'ok' }));
        } catch (e) { res.end(JSON.stringify({ status: 'error' })); }
    });
});
server.listen(8080, '127.0.0.1', () => {
    console.log('📡 Amanda Live Monitor HARD-BOUND to http://127.0.0.1:8080');
});
