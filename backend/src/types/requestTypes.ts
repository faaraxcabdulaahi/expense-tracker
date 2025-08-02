import { IUSER } from "../model/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUSER;
    }
  }
}
