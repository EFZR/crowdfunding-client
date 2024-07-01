import jwt from "jsonwebtoken";
import env from "../env";

type UserPayload = {
  id: number;
  email: string;
};

export function generateJWT(payload: UserPayload) {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.EXPIRATION_TIME,
  });

  return token;
}
