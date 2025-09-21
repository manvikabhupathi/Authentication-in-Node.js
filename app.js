const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;
const SECRET_KEY = 'your_jwt_secret'; // Use env variables in production

app.get('/',(req,res)=>{
  res.send("welcome to the authentication api")
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});
// In-memory user storage: [{ username, passwordHash }]
const users = [];

// Registration Endpoint: POST /register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  // Password hashing
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });
  res.send('User registered successfully.');
});

// Login Endpoint: POST /login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).send('Invalid credentials');
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).send('Invalid credentials');
  res.send('Login successful');
});

// JWT Login Endpoint: POST /jwt-login
app.post('/jwt-login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).send('Invalid credentials');
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).send('Invalid credentials');
  // Create JWT token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to verify JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).send('Invalid token');
      req.user = user;
      next();
    });
  } else {
    res.status(401).send('No token provided');
  }
}

// Protected Route: GET /protected
app.get('/protected', authenticateJWT, (req, res) => {
  res.send(`Welcome ${req.user.username}`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
