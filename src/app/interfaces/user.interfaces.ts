export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  name: string;
  email: string;
  phone: string;
  age: number;
  password: string;
  role: "user" | "admin";
  address: IAddress;
}
