import jwt from "jsonwebtoken";

type UserPayload = {
  id: number;
  email: string;
};

export function generateJWT(payload: UserPayload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.EXPIRATION_TIME,
  });
  return token;
}

export function verifyJWT(token: string) {
  const response = jwt.verify(token, process.env.JWT_SECRET!);
  console.log(response);
}
