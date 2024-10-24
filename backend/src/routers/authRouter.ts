import { Router } from 'express';
import { login } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const customer = login(email, password);
  if (!customer) {
    res.status(404).send({ message: 'Credenciales incorrectas!' });
    return;
  }

  res.send(customer);
});

export default authRouter;