export type Cart = {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
}

export type Item = {
  id: number;
  name: string;
  picture: string;
  price: number | null;
  description: string;
  quantity: number | null;
  discount: number | null;
  type: string;
}

