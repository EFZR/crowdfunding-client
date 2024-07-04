"use client";
//Fix: AuthJs 5.0.0 not working with client.

import { ChangeEvent, useState } from "react";
import Image from "next/image";

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

  console.log(providerMap);

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
      <div className="login__mode grid">
        <div className="login__button-container grid">
          {providerMap.map(
            (provider) =>
              provider.id !== "credentials" && (
                <form
                  key={provider.id}
                  action={async () =>
                    await signIn(provider.id, { redirectTo: "/dashboard" })
                  }
                >
                  <button className="login__oauth-button">
                    <Image
                      src={`/${provider.id}.svg`}
                      alt={`${provider.name} OAuth 2.0`}
                      width={30}
                      height={30}
                    />
                    <span>Continúa con Google</span>
                  </button>
                </form>
              )
          )}
        </div>

        <div className="divisor">
          <span>or</span>
        </div>

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
      </div>
    </>
  );
}
