import { BOOLEAN, Bcrypt, Uuid4 } from "../unique.type";

export type User = {
  id: Uuid4;
  login: string;
  password: Bcrypt;
  super_admin: BOOLEAN;
};
