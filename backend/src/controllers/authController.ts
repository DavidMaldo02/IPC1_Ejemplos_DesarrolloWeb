import { customers } from "./data"

export const login = (email: string, password: string) => {
  const customer = customers.find((c) => c.email === email && c.password === password);
  if (!customer) return null;
  return customer;
}