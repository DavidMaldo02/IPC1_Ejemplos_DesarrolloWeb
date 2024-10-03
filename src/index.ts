import express from 'express';
import customerRouter from './routers/customerRouter';

const app = express();
app.use(express.json());
app.use('/api/customers', customerRouter);

const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Hola IPC1');
});

app.listen(PORT, () => {
  console.log(`Servidor esta ejecutándose en http://localhost:${PORT}`);
});