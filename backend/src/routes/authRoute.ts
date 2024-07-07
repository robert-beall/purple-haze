import express, { Request, Response } from 'express';

export const authRoute = express.Router();

authRoute.post('/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log(process.env.USERNAME);
  
    // Simple validation
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
      // Set a cookie indicating successful login
      res.cookie('authToken', 'validSession', { maxAge: 3600000, httpOnly: true });
      res.status(200).send('Logged in successfully');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });

  authRoute.get('/auth/logout', (req: Request, res: Response) => {
    // Clear the authentication cookie
    res.clearCookie('authToken');
  
    // Respond to the client
    res.status(200).json({ message: 'Logged out successfully' });
  });