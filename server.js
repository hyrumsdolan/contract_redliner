const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use('/knowledge_base', express.static('knowledge_base'));

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('contract'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ file: req.file.filename });
});

app.get('/api/contracts', (req, res) => {
  fs.readdir('knowledge_base', (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to list contracts' });
    }
    res.json({ files });
  });
});

app.post('/api/compare', express.json(), async (req, res) => {
  const { uploadedFileName, baseContractName } = req.body;
  // TODO: integrate OpenAI ChatGPT 4.1 to compare contracts
  // Placeholder response
  const result = `Compared ${uploadedFileName} with ${baseContractName || 'default contract'}`;
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
