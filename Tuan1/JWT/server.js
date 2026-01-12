// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load các biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware để xử lý JSON trong body
app.use(express.json());

// Middleware để xác thực JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Lấy token sau "Bearer "

  if (!token) {
    return res.status(403).send('Token is required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid or expired token');
    }
    req.user = decoded;
    next();
  });
}

// Route để đăng nhập và lấy token
app.post('/login', (req, res) => {
  const { username, password } = req.body; // Giả sử bạn sẽ kiểm tra username và password ở đây
  
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Giả sử người dùng đăng nhập thành công, bạn có thể kiểm tra username, password ở đây
  const user = { id: 1, username }; // Tạo một đối tượng người dùng giả, có thể thay bằng dữ liệu thực từ database

  // Tạo JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.json({
    message: 'Login successful',
    token: token,
  });
});

// Route cần xác thực với JWT
app.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user,
  });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
