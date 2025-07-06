import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const user = {
  username: 'admin',
  password: bcrypt.hashSync('admin123', 8),
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

export default router;