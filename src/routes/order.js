import { Router } from "express";

const router = Router();

router.get('/', async (req, res, next) => {
    const orders = await req.context.models.Order.findAll();
    return res.send(orders);
});

router.get('/:id', async (req, res, next) => {
    const order = await req.context.models.Order.findByPk(req.params.id);
    return res.send(order);
});


export default router;