import { Bcrypt, Uuid4 } from "../unique.type";

export type Person = Admin | User;

export type User = {
  id: Uuid4;
  login: string;
  password: Bcrypt;
  type: "user";
};

export type Admin = {
  id: Uuid4;
  login: string;
  password: Bcrypt;
  super_admin: boolean;
  type: "admin";
};
