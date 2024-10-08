"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Input } from "../../ui/Input/Input";
import { loginSchema, UserLoginForm } from "@/src/types/authentication";
import { responseSchema } from "@/src/types/response";
import { validateFormData } from "@/src/lib/validator";
import "./LoginForm.css";

export default function LoginForm() {
  //#region States

  const initialValue: UserLoginForm = {
    email: "",
    password: "",
  };

  const [userLoginForm, setUserLoginForm] =
    useState<UserLoginForm>(initialValue);

  const router = useRouter();

  //#endregion

  //#region Functions

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserLoginForm({
      ...userLoginForm,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valid = validateFormData(loginSchema, userLoginForm);

    if (!valid) return;

    try {
      const body = JSON.stringify(userLoginForm);
      const response = await fetch("/api/authentication/login", {
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

      toast.success("Cuenta autenticada correctamente.");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  //#endregion

  return (
    <>
      <form className="grid login__form" onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          id="email"
          name="email"
          label="Correo Electronico"
          value={userLoginForm.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          id="password"
          name="password"
          label="Contraseña"
          value={userLoginForm.password}
          onChange={handleChange}
        />

        <input type="submit" className="button" />
      </form>
    </>
  );
}
