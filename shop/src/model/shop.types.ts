export type Cart = {
  id?: string;
  userId: string;
  itemId: string;
  quantity: number;
};

export type Item = {
  id?: string;
  name: string;
  picture: string;
  price: number | null;
  description: string;
  quantity: number | null;
  discount: number | null;
  type: string;
};

export type ItemBalance = {
  id?: string;
  amount: number;
  date: string;
  itemId: string;
};

export type Order = {
  id?: string;
  date: string;
  sum: number;
  discount: number;
  comment: string;
  status: string;
  userId: string;
};

export type OrderItem = {
  id?: string;
  quantity: number;
  orderNumber: string;
  itemId: string;
};

export type Route = {
  id?: string;
  dispatchDate: string;
  deliveryDate: string;
  orderNumber: string;
  addressId: string;
  userId: string;
};

export type Address = {
  id?: string;
  city: string;
  street: string;
  building: number;
  apartment: number;
  zipCode: number;
};


