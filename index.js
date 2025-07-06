const { Client, LocalAuth } = require('whatsapp-web.js');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

// Load Firebase credentials
const serviceAccount = require('./credentials.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "venom-bot"
  }),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.3.html'
  }
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async msg => {
  if (msg.body === 'ping') {
    msg.reply('pong');
  }
});

client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
});

client.on('authenticated', () => {
  console.log('Authenticated successfully');
});

client.initialize();
