import express, { Request, Response } from 'express';

export const helloWorldRoute = express.Router();

helloWorldRoute.get('/hello', (_req: Request, res: Response) => {
    res.send('Hello World');
});

helloWorldRoute.post('/greeting', (req: Request, res: Response) => {
        const { name } = req.body;

        if (typeof name === 'undefined') {
            return res.status(400).json({
                success: false,
                message: 'No name specified',
            });
        }

        return res.send(`Hello ${name}`);
})