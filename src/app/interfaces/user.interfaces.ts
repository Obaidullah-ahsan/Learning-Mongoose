import { Model } from "mongoose";

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

export interface userInstancreMethod {
  hashPassword(password: string): string;
}
export interface userStaticMethod extends Model<IUser> {
  hashPassword(password: string): string;
}
