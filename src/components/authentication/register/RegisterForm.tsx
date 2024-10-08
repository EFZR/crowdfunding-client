"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

import { UserRegistrationForm } from "@/src/types/authentication";
import { validateFormData } from "@/src/lib/validator";
import { registrationSchema } from "@/src/types/authentication";
import { responseSchema } from "@/src/types/response";
import { Input } from "../../ui/Input/Input";
import "./RegisterForm.css";

export default function RegisterForm() {
  //#region State

  const initialValues: UserRegistrationForm = {
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  };

  const [userRegistrationForm, setUserRegistrationForm] =
    useState<UserRegistrationForm>(initialValues);

  //#endregion

  //#region Functions

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserRegistrationForm({
      ...userRegistrationForm,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valid = validateFormData(registrationSchema, userRegistrationForm);

    if (!valid) return;

    try {
      const body = JSON.stringify(userRegistrationForm);
      const response = await fetch("/api/authentication/register", {
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
      setUserRegistrationForm(initialValues);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  //#endregion

  return (
    <form onSubmit={handleSubmit} className="grid register__form" noValidate>
      <Input
        type="email"
        id="email"
        name="email"
        label="Correo Electronico"
        value={userRegistrationForm.email}
        onChange={handleChange}
      />

      <Input
        type="text"
        id="username"
        name="username"
        label="Nombre Completo"
        value={userRegistrationForm.username}
        onChange={handleChange}
      />

      <Input
        type="password"
        id="password"
        name="password"
        label="Contraseña"
        value={userRegistrationForm.password}
        onChange={handleChange}
      />

      <Input
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        label="Confirmar Contraseña"
        value={userRegistrationForm.password_confirmation}
        onChange={handleChange}
      />

      <input type="submit" className="button" />
    </form>
  );
}
