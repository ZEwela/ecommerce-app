import { Router } from "express";
// const bcrypt = require('bcryptjs');

const router = Router();

router.get('/', async (req, res, next) => {
    const users = await req.context.models.User.findAll();
    return res.send(users);
});

router.get('/:id', async (req, res, next) => {
    const user = await req.context.models.User.findByPk(req.params.id);
    return res.send(user);
});

// router.post('/register', async(req,res, next) => {
//     const { name, email, password } = req.body;
//     let errors = [];
    
//     if (!name || !email || !password) {
//       errors.push({ msg: 'Please enter all fields' });
//     }
    
//     if (password.length < 6) {
//       errors.push({ msg: 'Password must be at least 6 characters' });
//     }
    
//     if (errors.length > 0) {
//       res.render('register', {
//         errors,
//         name,
//         email,
//         password
//       });
//     } else {
//       User.findOne({ email: email }).then(user => {
//         if (user) {
//           errors.push({ msg: 'Email already exists' });
//           res.render('register', {
//             errors,
//             name,
//             email,
//             password
//           });
//         } else {
//           const newUser = new User({
//             name,
//             email,
//             password
//           });
    
//           bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//               if (err) throw err;
//               newUser.password = hash;
//               newUser
//                 .save()
//                 .then(user => {
//                   req.flash(
//                     'success_msg',
//                     'You are now registered and can log in'
//                   );
//                   res.redirect('/login');
//                 })
//                 .catch(err => console.log(err));
//             });
//           });
//         }
//       });
//     }    
// });

router.delete('/:id', async (req, res, next) => {
    const result = await req.context.models.User.destroy({
        where: {user_id: req.params.id}
    });
    res.send(true);
});

export default router;