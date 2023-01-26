import { Router } from "express";

const router = Router();

router.get('/', async (req, res, next) => {
    const carts = await req.context.models.Cart.findAll();
    return res.send(carts);
});

router.get('/cart', async (req, res) => {
    try {
        const currentSid = req.session.id;
        const sessionData = await req.context.models.Session.findOne({
          where: {
            sid: currentSid
          }
        });
        const cart = sessionData.data.cart;
        if (!cart) {
          res.send('Your cart is empty');
        } else {
          res.send(`Your cart contains: ${cart}`);
        }
      } catch(error) {
        console.log(error);
        res.send('An error occured');
      }
});


router.get('/:id', async (req, res, next) => {
    const cart = await req.context.models.Cart.findByPk(req.params.id);
    return res.send(cart);
});


router.post('/add-to-cart', (req, res) => {
    const productId = req.body.product_id;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push(productId);
    console.log(req.session);
    res.send('Product added to cart');
});

router.delete('/remove-from-cart/:product_id', (req, res) => {
    const productId = req.params.product_id;
    if (!req.session.cart) {
      res.send('Your cart is empty');
    } else {
      req.session.cart = req.session.cart.filter(id => id !== productId);
      res.send(`Product with id ${productId} removed from cart`);
    }
});

router.delete('/:id', async (req, res, next) => {
    const result = await req.context.models.Cart.destroy({
        where: {cart_id: req.params.id}
    });
    res.send(true);
});


// Checkout usually has multiple moving parts. First, we must validate the cart to ensure that it exists. Second, we must attempt to process the payment and ensure that payment details submitted are accurate. Lastly, an order must be created to reflect the successful payment. There are multiple ways to handle the checkout endpoint, but one way would be to leverage the existing cart resource you created previously:

// POST /cart/{cartId}/checkout

export default router;

