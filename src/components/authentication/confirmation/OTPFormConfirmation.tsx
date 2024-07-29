"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  ConfirmationToken,
  confirmationTokenSchema,
} from "@/src/types/authentication";
import { responseSchema } from "@/src/types/response";
import { validateFormData } from "@/src/lib/validator";
import OTPForm from "../../ui/OTP/OTPForm";

export default function OTPFormConfirmation() {
  //#region States

  const [token, setToken] = useState<ConfirmationToken["token"]>("");
  const router = useRouter();

  const length = 6;

  //#endregion

  //#region Functions

  async function handleSubmit() {
    const valid = validateFormData(confirmationTokenSchema, { token });

    if (!valid) return;

    try {
      const body = JSON.stringify({ token: token });
      const response = await fetch("/api/authentication/confirmation", {
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

      toast.success(responseData.success!);
      router.push("/authentication/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  function handleChange(token: ConfirmationToken["token"]) {
    setToken(token);
  }

  //#endregion

  return (
    <OTPForm
      length={length}
      value={token}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
