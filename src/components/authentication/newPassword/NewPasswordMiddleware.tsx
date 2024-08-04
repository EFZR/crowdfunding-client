"use client";

import { useState } from "react";
import OTPNewPasswordToken from "./NewPasswordToken/OTPNewPasswordToken";

export default function NewPasswordMiddleware() {
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  return isValidToken ? (
    <p>Valid Token</p>
  ) : (
    <OTPNewPasswordToken setIsValidToken={setIsValidToken} />
  );
}
