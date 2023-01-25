import { Router } from "express";

const router = Router();

// router.post('/orders', async (req, res, next) => {
//     const { user_id, order_product, created_at } = req.body;
//     //create order 
//     Order.create({ user_id, order_product, created_at }).then((order) => {
//       //create order product
//       OrderProduct.create({ order_id: order.id, product_id, quantity }).then(() => {
//         //create order status
//         OrderStatus.create({ order_id: order.id, status_id }).then(() => {
//           res.status(201).json(order);
//         });
//       });
//     });
//   });
export default router;