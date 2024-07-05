"use client";

import { ChangeEvent, useState } from "react";

import { signIn, providerMap } from "@/src/lib/nextauth";
import { UserLoginForm } from "@/src/types/authentication";
import "@/src/styles/components/authentication/login/LoginForm.css";

export default async function LoginForm() {
  //#region States

  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const [userLoginForm, setUserLoginForm] =
    useState<UserLoginForm>(initialValues);

  //#endregion

  //#region Functions

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserLoginForm({
      ...userLoginForm,
      [e.target.id]: e.target.value,
    });
  }

  //#endregion

  return (
    <>
      <form className="login__form grid" noValidate>
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
