import type { IUSER } from "../model/userModel.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUSER;
    }
  }
}
