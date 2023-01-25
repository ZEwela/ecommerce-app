import { Router } from "express";

const router = Router();

router.get('/', async (req, res, next) => {
    const products = await req.context.models.Product.findAll();
    return res.send(products);
});

router.get('/:id', async (req, res, next) => {
    const product = await req.context.models.Product.findByPk(req.params.id);
    return res.send(product);
});

router.post('/', async(req,res, next) => {
    const newproduct = await req.context.models.Product.create({
        name: req.body.name
    });
    res.send(newproduct);
});

router.delete('/:id', async (req, res, next) => {
    const result = await req.context.models.Product.destroy({
        where: {product_id: req.params.id}
    });
    res.send(true);
});

export default router;

// List of products with the most actual price:
// const products = await req.context.models.Product.findAll({
//     attributes: ['name'],
//     include: [{
//         model: req.context.models.Price,
//         attributes: ['amount'],
//         where: req.context.sequelize.where(req.context.sequelize.col('created_at'), 
//             req.context.sequelize.literal('(SELECT MAX(created_at) FROM product_prices WHERE product_prices.product_id = product.product_id)'))
//     }]
// });