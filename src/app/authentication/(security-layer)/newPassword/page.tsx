"use client";

import { useState } from "react";
import { NewPasswordToken } from "@/src/types/authentication";
import NewPasswordForm from "@/src/components/authentication/newPassword/NewPasswordForm/NewPasswordForm";
import OTPNewPasswordToken from "@/src/components/authentication/newPassword/NewPasswordToken/OTPNewPasswordToken";

export default function page() {
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
