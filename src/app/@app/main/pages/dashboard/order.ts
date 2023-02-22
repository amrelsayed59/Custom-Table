export interface Order {
    id?: number;
    agent?: string;
    name?: string;
    city?: string;
    amount?: number | string;
    price?: number;
    discount?: number;
  }