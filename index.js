const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // serve static files (CSS, images, JS)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Dummy endpoint to simulate session ID generation
app.post('/get-session', (req, res) => {
  const { phoneNumber } = req.body;
  if(!phoneNumber) return res.status(400).json({ error: 'Phone number required' });

  // Simulate a session ID (in real, generate or get from WhatsApp lib)
  const sessionId = `session_phoneNumber_{Date.now()}`;
  
  // Return the session ID
  res.json({ sessionId });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
