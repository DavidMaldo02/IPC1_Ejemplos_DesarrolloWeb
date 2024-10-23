export interface CustomerEntry {
  firstName: string;
  lastName: string;
  email: string;
  creditCard: string;
  password: string;
}

export interface Customer extends CustomerEntry {
  id: number;
}