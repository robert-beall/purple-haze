import express, { Request, Response } from 'express';
import sequelize from '../sequelize';
import Item from '../models/ItemModel';

export const dbTestRoute = express.Router();

dbTestRoute.get('/db/db-test', async (_req: Request, res: Response) => {
    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        res.send('success');
    } catch (error) {
        res.status(500).send(error)
        console.error('Unable to connect to the database:', error);
    }
});

dbTestRoute.post('/greeting', (req: Request, res: Response) => {
        const { name } = req.body;

        if (typeof name === 'undefined') {
            return res.status(400).json({
                success: false,
                message: 'No name specified',
            });
        }

        return res.send(`Hello ${name}`);
})