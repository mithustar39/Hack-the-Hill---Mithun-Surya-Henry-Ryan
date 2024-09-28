const express = require('express');
const cors = require('cors');
const app = express();
const port = 5174; // Ensure the port matches what your frontend expects

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON requests

// Simple login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic (replace with real logic if needed)
  if (username === 'test' && password === 'password') {
    return res.json({ token: 'realToken' });
  } else {
    return res.status(401).json({ message: 'Invalid login credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
