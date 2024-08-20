import express, { Request, Response } from "express";
import Item from "../models/ItemModel";

export const items = express.Router();

items.post('/items', async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    next(e);
  }
});

items.get('/items', async (req, res, next) => {
    try {
        res.json(await Item.findAll());
      } catch (e) {
        next(e);
      }
})

items.get('/items/:id', async (req, res, next) => {
    try {
        const movie = await Item.findByPk(req.params['id']);
        res.json(movie);
    } catch (e) {
        next(e);
    }
});

items.put('/items/:id', async (req, res, next) => {
    try {
      await Item.update<Item>(req.body, {where: {id: req.params['id']}});
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  });

items.delete('/items/:id', async (req, res, next) => {
    try {
        await Item.destroy<Item>({where: {id: req.params['id']}});
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
});
  