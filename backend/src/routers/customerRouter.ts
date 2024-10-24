import { Router } from "express";
import { createCustomer, createCustomers, deleteCustomer, getCustomer, getCustomers, groupCreditCardsByLength, updateCustomer } from '../controllers/customerController';
import { Customer, CustomerEntry } from '../types';


const customerRouter = Router();

customerRouter.get('/', (req, res) => {
  res.send(getCustomers());
});

customerRouter.get('/get/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const customer = getCustomer(id);
  if (!customer) {
    res.status(404).send({ message: 'Customer not found' });
  }
  res.send(customer);
});

customerRouter.post('/create', (req, res) => {
  const customerEntry: CustomerEntry = req.body;
  try {
    createCustomer(customerEntry);
    res.status(201).send({ message: 'Customer created' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating customer' });
  }
});

customerRouter.post('/create-many', (req, res) => {
  const customers: Customer[] = req.body;
  try {
    createCustomers(customers);
    res.status(201).send({ message: 'Customers created' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating customers' });
  }
});

customerRouter.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const customerEntry: CustomerEntry = req.body;
  try {
    updateCustomer(id, customerEntry);
    res.send({ message: 'Customer updated' });
  } catch (error) {
    res.status(400).send({ message: 'Error updating customer' });
  }
});

customerRouter.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    deleteCustomer(id);
    res.send({ message: 'Customer deleted' });
  } catch (error) {
    res.status(400).send({ message: 'Error deleting customer' });
  }
});
customerRouter.get('/reports', (req, res) => {
  const content = groupCreditCardsByLength();
  res.status(200).send(content)
})
export default customerRouter;