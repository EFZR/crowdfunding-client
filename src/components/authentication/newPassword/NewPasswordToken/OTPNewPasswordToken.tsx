"use client";

import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

import {
  NewPasswordToken,
  newPasswordTokenSchema,
} from "@/src/types/authentication";
import { responseSchema } from "@/src/types/response";
import { validateFormData } from "@/src/lib/validator";
import OTPForm from "../../../ui/OTP/OTPForm";
import "./OTPNewPasswordToken.css";

type NewPasswordTokenProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
};

export default function OTPNewPasswordToken({
  setIsValidToken,
}: NewPasswordTokenProps) {
  //#region States

  const [token, setToken] = useState<NewPasswordToken["token"]>("");
  const length = 6;

  //#endregion

  //#region Functions

  async function handleSubmit() {
    const valid = validateFormData(newPasswordTokenSchema, { token });

    if (!valid) return;

    try {
      const body = JSON.stringify({ token: token });
      const response = await fetch("/api/authentication/newPassword", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        throw new Error("Network response failed.");
      }

      const bodyResponse = await response.json();
      const responseValidation = responseSchema.safeParse(bodyResponse);

      if (!responseValidation.success) {
        toast.error("Respuesta Invalida");
        return;
      }

      const responseData = responseValidation.data;
      if (responseData.errors) {
        responseData.errors.forEach((error) => toast.error(error.message));
        return;
      }

      setIsValidToken(true);
      toast.success(responseData.success!);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  function handleChange(token: NewPasswordToken["token"]) {
    setToken(token);
  }

  //#endregion

  return (
    <div className="grid NewPasswordToken__container">
      <form className="NewPasswordToken__form">
        <h1 className="NewPasswordToken__title">
          Ingresa el token de confirmación
        </h1>
        <h2 className="NewPasswordToken__subtitle">
          Te hemos enviado un token para <span>restablecer tu contraseña</span>
        </h2>

        <OTPForm
          length={length}
          value={token}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
}
