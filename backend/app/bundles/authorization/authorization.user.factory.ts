import * as bcrypt from "bcrypt";
import { getPerson } from "./authorization.person.factory";
import { LoginBodyPostReq } from "../../api/login/login.model";
import { RegisterBodyPostReq } from "../../api/register/register.model";

export const checkAuthAndUser = async (body: LoginBodyPostReq) => {
  const user = await getPerson(body.email);
  if (!user) {
    return false;
  }
  const is_correct_password = await bcrypt.compare(body.password, user.password);
  if (!is_correct_password) {
    return false;
  }
  return user;
};

export const checkCanRegister = async (body: RegisterBodyPostReq) => {
  const { email, password, passwordConfirm } = body;
  if (password !== passwordConfirm) {
    return false;
  }
  // eslint-disable-next-line no-useless-escape
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email.match(emailRegExp)) {
    return false;
  }
  const person = await getPerson(email);
  if (person) {
    return false;
  }
  return true;
};
