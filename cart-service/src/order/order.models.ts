
export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  comment?: string;
}

export interface OrderPayload {
  address: Address;
  items: { productId: string; count: number };
  total: number;
}
