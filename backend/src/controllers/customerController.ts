import { Customer, CustomerEntry } from "../types";
import { customers } from "./data";

export const getCustomers = (): Customer[] => {
  return customers;
}

export const getCustomer = (id: number): Customer | null => {
  const customer = customers.find((customer) => customer.id === id);
  if (!customer) return null;
  return customer;
}

export const createCustomer = (customerEntry: CustomerEntry) => {
  const id: number = customers[customers.length - 1].id + 1;
  const customer: Customer = { id, ...customerEntry };
  try {
    customers.push(customer);
  } catch (error) {
    throw new Error('Error al crear el cliente');
  }
}

export const createCustomers = (_customers: Customer[]) => {
  try {
    _customers.forEach((customer) => {
      customers.push(customer);
    });
  } catch (error) {
    throw new Error('Error al crear los clientes');
  }
}

export const updateCustomer = (id: number, customerEntry: CustomerEntry) => {
  const index = customers.findIndex((customer) => customer.id === id);
  if (index === -1) throw new Error('Customer not found');
  customers[index] = { id, ...customerEntry };
}

export const deleteCustomer = (id: number) => {
  const index = customers.findIndex((customer) => customer.id === id);
  if (index === -1) throw new Error('Customer not found');
  customers.splice(index, 1);
}

export const groupCreditCardsByLength = () => {
    const creditCardLengths = customers.map(c => c.creditCard.length);
    const creditCardLengthsCount = creditCardLengths.reduce((acc, length) => {
        acc[length] = (acc[length] || 0) + 1;
        return acc;
    }, {} as {[key: number]: number})
    return creditCardLengthsCount;
}