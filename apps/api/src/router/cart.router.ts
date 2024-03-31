import authMiddleware from '@/middleware/auth.middleware';
import prisma from '@/prisma';
import { Router } from 'express';

const cartRouter: Router = Router();
cartRouter.use(authMiddleware);
cartRouter.get('/', async (req, res) => {
  try {
    const { id } = req.body;
    console.log('id', id);
    const cart = await prisma.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        product: { include: { image: true } }, // Include product information
      },
    });
    res.status(200).json(cart);
    console.log(cart);
  } catch (error) {}
});
cartRouter.post('/', async (req, res) => {
  try {
    const { id } = req.body;
    console.log('post', id);
    const cartItem = await prisma.cart.create({
      data: {
        userId: id,
        productId: 1,
        quantity: 10,
      },
    });
    res.status(200).json(cartItem);
    console.log(cartItem);
  } catch (error) {}
});
export default cartRouter;
