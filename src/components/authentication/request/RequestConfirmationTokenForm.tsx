"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

import { Input } from "@/src/components/ui/Input/Input";
import { validateFormData } from "@/src/lib/validator";
import {
  requestConfirmationToken,
  RequestConfirmationToken,
} from "@/src/types/authentication";
import "./RequestConfirmationTokenForm.css";

export default function RequestConfirmationTokenForm() {
  //#region State

  const [email, setEmail] = useState<RequestConfirmationToken["email"]>("");

  //#endregion

  //#region Functions

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valid = validateFormData(requestConfirmationToken, { email });

    if (!valid) return;

    try {
      console.log(email);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  //#endregion

  return (
    <form onSubmit={handleSubmit}>
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
