"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

import { Input } from "@/src/components/ui/Input/Input";
import { validateFormData } from "@/src/lib/validator";
import { responseSchema } from "@/src/types/response";
import {
  requestNewPasswordTokenSchema,
  RequestNewPasswordToken,
} from "@/src/types/authentication";
import "./RequestNewPasswordTokenForm.css";

export default function RequestNewPasswordTokenForm() {
  //#region State

  const [email, setEmail] = useState<RequestNewPasswordToken["email"]>("");

  //#endregion

  //#region Functions

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valid = validateFormData(requestNewPasswordTokenSchema, { email });

    if (!valid) return;

    try {
      const body = JSON.stringify({ email });
      const response = await fetch("/api/authentication/forgotPassword", {
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

      setEmail("");
      toast.success(responseData.success!);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  //#endregion

  return (
    <form onSubmit={handleSubmit} className="forgotPassword__form">
      <Input
        id="email"
        name="email"
        label="Correo Electronico..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="submit" className="button" />
    </form>
  );
}
