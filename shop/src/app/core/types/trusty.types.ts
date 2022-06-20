export type TrustyUser = {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  username?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  roles?: TrustyRole[];
};

export type TrustyRole = {
  id?: string;
  productId: string;
  name: string;
  description: string;
};

export type TrustyCreateUser = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  password?: string;
  username?: string;
  productId?: string;
};
