"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { loginSchema, UserLoginForm } from "@/src/types/authentication";
import { responseSchema } from "@/src/types/response";
import "@/src/styles/components/authentication/login/LoginForm.css";

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

    const valid = validateFormData();

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

      toast.success("Autenticado Correctamente.");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        // logger.critical(error.message);
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  // TODO: make an own function for each problem with the same issue.
  function validateFormData(): boolean {
    const result = loginSchema.safeParse(userLoginForm);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      const errors: Record<string, string[]> = fieldErrors;

      // Showing errors.
      Object.entries(errors).forEach(([key, value]) => {
        if (value && value.length > 0) {
          toast.error(value[0]);
        }
      });

      return false;
    }

    return true;
  }

  //#endregion

  return (
    <>
      <form className="login__form grid" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=""
            value={userLoginForm.email}
            onChange={handleChange}
          />
          <label className="label" htmlFor="email">
            Correo Electronico
          </label>
        </div>

        <div className="field">
          <input
            type="password"
            id="password"
            name="password"
            placeholder=""
            value={userLoginForm.password}
            onChange={handleChange}
          />
          <label className="label" htmlFor="password">
            Contraseña
          </label>
        </div>

        <input type="submit" className="button" />
      </form>
    </>
  );
}
