const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;
const validKey = '1234';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Doğrulama endpointi
app.post('/auth', (req, res) => {
  const { key } = req.body;
  res.json({ success: key === validKey });
});

// Komut gönderme endpointi
app.post('/command', (req, res) => {
  const { action } = req.body;
  switch (action) {
    case 'volume_up':
      exec('nircmd.exe changesysvolume 5000');
      break;
    case 'volume_down':
      exec('nircmd.exe changesysvolume -5000');
      break;
    case 'shutdown':
      exec('shutdown /s /t 0');
      break;
    case 'restart':
      exec('shutdown /r /t 0');
      break;
    case 'open_chrome':
      exec('start chrome');
      break;
    case 'open_vscode':
      exec('code');
      break;
    default:
      return res.json({ success: false, message: 'Unknown command' });
  }
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});
