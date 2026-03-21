const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/confirm', (req, res) => {
  exec('powershell.exe -File C:\\dreamteq\\deploy.ps1', (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${stderr}`);
    } else {
      res.send('Deployment triggered successfully!');
    }
  });
});

app.listen(5000, () => console.log('Webhook listening on port 5000'));
