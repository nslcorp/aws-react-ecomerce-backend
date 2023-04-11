// import { CartItem } from '../../cart/models';

export type Order = {
  id?: string,
  userId: string;
  cartId: string;
  // items: CartItem[]
  delivery: {
    firstName: string,
    lastName: string
    address: string,
    comment?: string,
  },
  payment: {
    creditCard: string,
  },
  status: string;
  total: number;
}
