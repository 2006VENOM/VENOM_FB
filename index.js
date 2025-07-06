```javascript
const axios = require('axios');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    if(message.body.startsWith('!fb ')) {
        const url = message.body.slice(4);
        try {
            const response = await axios.get(`https://api.apify.com/v2/actor-runs/2n2e5foKVOrRroYLe/outputs/default?token=apify_api_e3pthOULGS8haeIDYtc215p8JbfCOY49htmr&url=${encodeURIComponent(url)}`);
            if(response.data && response.data.videoUrl) {
                client.sendMessage(message.from, response.data.videoUrl);
            } else {
                client.sendMessage(message.from, 'Sorry, could not retrieve video.');
            }
        } catch (error) {
            client.sendMessage(message.from, 'Error fetching video.');
        }
    }
});

client.initialize();
```
