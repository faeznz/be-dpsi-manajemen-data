const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, jenisKelamin, email } = req.body;

    // Generate random noKaryawan
    const noKaryawan = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ 
      username, 
      password: hashedPassword, 
      jenisKelamin, 
      email, 
      noKaryawan 
    });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari pengguna berdasarkan username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Periksa password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user._id }, 'finalProjectDpsi', { expiresIn: '1h' });

    // Merespon dengan data pengguna dan token
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        jenisKelamin: user.jenisKelamin,
        email: user.email,
        noKaryawan: user.noKaryawan
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
