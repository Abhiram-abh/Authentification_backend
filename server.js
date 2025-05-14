const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming you have a User model

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true,
};
app.use(cors(corsOptions));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.redirect('/login');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.redirect('/login');
    req.user = user;
    next();
  });
};

// Role-Based Access Control Middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Forbidden: Insufficient Permissions' });
    }
    next();
  };
};

// Redirect root URL to login page
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dashboard Route – Protected by JWT and Role-Based Access Control
app.get('/api/dashboard', authenticateJWT, authorizeRoles('admin', 'user'), (req, res) => {
  res.json({ message: 'Welcome to the Dashboard' });
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
