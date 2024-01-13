import { TimeStamp, Uuid4 } from "../unique.type";


export type Cookie = {
  id: number;
  cookie_key: string;
  user_id: Uuid4;
  expires: TimeStamp;
};
