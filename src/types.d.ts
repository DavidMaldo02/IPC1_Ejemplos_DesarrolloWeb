export interface CustomerEntry {
  firstName: string;
  lastName: string;
  email: string;
  creditCard: string;
}

export interface Customer extends CustomerEntry {
  id: number;
}