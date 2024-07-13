import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authRoute = express.Router();

authRoute.post('/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
      // Set a cookie indicating successful login
      const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.send({token});
    } else {
      res.status(401).send('Invalid credentials');
    }
  });