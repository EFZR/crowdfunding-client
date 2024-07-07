"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authenticate } from "@/src/actions";
import { loginSchema, UserLoginForm } from "@/src/types/authentication";
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

    const result = loginSchema.safeParse(userLoginForm);

    if (!result.success) {
      const errors: Record<string, string[]> =
        result.error.flatten().fieldErrors;

      // Showing errors.
      Object.keys(errors).map((key) => {
        const value = errors[key];
        toast.error(value[0]);
      });

      return;
    }

    try {
      const response = await authenticate(userLoginForm);
      if (!response) {
        toast.error("Revisa tus credenciales.");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("Revisa tus credenciales.");
    }
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
