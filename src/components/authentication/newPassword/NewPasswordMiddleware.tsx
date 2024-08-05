"use client";

import { useState } from "react";

import { NewPasswordToken } from "@/src/types/authentication";
import NewPasswordForm from "./NewPasswordForm/NewPasswordForm";
import OTPNewPasswordToken from "./NewPasswordToken/OTPNewPasswordToken";

export default function NewPasswordMiddleware() {
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [token, setToken] = useState<NewPasswordToken["token"]>("");

  return isValidToken ? (
    <NewPasswordForm token={token} />
  ) : (
    <OTPNewPasswordToken
      setIsValidToken={setIsValidToken}
      token={token}
      setToken={setToken}
    />
  );
}
