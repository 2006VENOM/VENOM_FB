const { Client } = require('whatsapp-web.js');
const axios = require('axios');

const SESSION_ID = process.env.SESSION_ID;

const client = new Client({
  session: JSON.parse(SESSION_ID)
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async msg => {
  if (msg.body.startsWith('!fb ')) {
    const url = msg.body.slice(4);
    try {
      const response = await axios.get(`https://api.apify.com/v2/actor-runs/2n2e5foKVOrRroYLe/outputs/default?token=apify_api_e3pthOULGS8haeIDYtc215p8JbfCOY49htmr&url=${encodeURIComponent(url)}`);
      if (response.data && response.data.videoUrl) {
        client.sendMessage(msg.from, response.data.videoUrl);
      } else {
        client.sendMessage(msg.from, 'Video not found.');
      }
    } catch {
      client.sendMessage(msg.from, 'Error fetching video.');
    }
  }
});

client.initialize();
