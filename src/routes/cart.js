import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

const getSID = async (req, res, next) => {
  const currentSid = req.headers.cookie.match(/sid=([^;]+)/)[1];
  if (!currentSid) {
    next();
  }
  req.sid = currentSid;
  next();
}


router.get('/', async (req, res, next) => {
    const carts = await req.context.models.Cart.findAll();
    return res.send(carts);
});

// curl -X GET http://localhost:3000/carts/cart -H "Cookie: sid=pQL4Mn4Rv0fc6W36sDDJhN5P42phgxFM" -H "Content-Type: application/json"
router.get('/cart', getSID,  async (req, res) => {
    try {
        const sessionData = await req.context.models.Session.findOne({
          where: {
            sid: req.sid
          }
        });
        const sessionDataParsed = JSON.parse(sessionData.data);
        const cart = sessionDataParsed.cart;

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

// curl -X POST -H "Content-Type: application/json" -b "sid=pQL4Mn4Rv0fc6W36sDDJhN5P42phgxFM" -d '{"product_id": 2}' http://localhost:3000/carts/add-to-cart
router.post('/add-to-cart',
[check('product_id').isInt().withMessage('Product id must be a valid integer')],
getSID,
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
  }
  try {
    const { product_id } = req.body;
    const checkIfProduct = await req.context.models.Product.findByPk(product_id);
    if (!checkIfProduct) {
      res.send('Unknown product');
      console.log('Wrong product_id');
      return;
    }
    const sessionData = await req.context.models.Session.findOne({
      where: {
        sid: req.sid
      }
    });
    const sessionDataParsed = JSON.parse(sessionData.data);
    let cart = sessionDataParsed.cart;
    if (!cart) {
      cart = [];
    }
    cart.push(product_id);
    const updatedSessionData = {
      ...sessionDataParsed,
      cart
    };
    await req.context.models.Session.update({
      data: JSON.stringify(updatedSessionData)
    }, {
      where: {
        sid: req.sid
      }
    });
    res.send(`Product with id ${product_id} has been added to the cart`);
  } catch (error) {
    console.log(error);
    res.send('An error occured');
  }
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

