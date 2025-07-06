const express = require('express');
const path = require('path');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

let client;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/start', (req, res) => {
  const phoneNumber = req.body.phone;

  if (client) {
    client.destroy();
  }

  client = new Client({
    authStrategy: new LegacySessionAuth(),puppeteer: { headless: true }
  });

  client.on('qr', qr => {
    console.log('QR code:', qr);
    qrcode.generate(qr, { small: true });
  });

  client.on('authenticated', (session) => {
    console.log('Authenticated!');
    // Send session data back to front-end or just console.log
    res.json({ sessionId: JSON.stringify(session) });
  });

  client.on('ready', () => {
    console.log('Client ready!');
  });

  client.on('auth_failure', () => {
    console.log('Authentication failure, restart required.');
  });

  client.initialize();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
