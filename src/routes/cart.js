import { Router } from "express";

const router = Router();

router.get('/', async (req, res, next) => {
    const carts = await req.context.models.Cart.findAll();
    return res.send(carts);
});

router.get('/:id', async (req, res, next) => {
    const cart = await req.context.models.Cart.findByPk(req.params.id);
    return res.send(cart);
});

router.post('/', async(req,res, next) => {
    const newcart = await req.context.models.Cart.create({
        user_id: req.body.user_id,
        
    });
    res.send(newcart);
});

router.delete('/:id', async (req, res, next) => {
    const result = await req.context.models.Cart.destroy({
        where: {cart_id: req.params.id}
    });
    res.send(true);
});

export default router;

