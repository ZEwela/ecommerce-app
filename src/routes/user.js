import { Router } from "express";

const router = Router();

router.get('/', async (req, res, next) => {
    const users = await req.context.models.User.findAll();
    return res.send(users);
});

router.get('/:id', async (req, res, next) => {
    const user = await req.context.models.User.findByPk(req.params.id);
    return res.send(user);
});

router.put('/:id', async (req,res,next) => {
    try {
        const updatedUser = await req.context.models.User.update(req.body, { where: {user_id: req.params.id} });
        if (updatedUser[0] === 1) {
            const updatedUser = await req.context.models.User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

router.delete('/:id', async (req, res, next) => {
    const result = await req.context.models.User.destroy({
        where: {user_id: req.params.id}
    });
    res.send(true);
});

export default router;