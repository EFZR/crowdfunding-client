"use client";

import { useState, ChangeEvent } from "react";
import { UserRegistrationForm } from "@/src/types/authentication";
import "@/src/styles/components/authentication/register/RegisterForm.css";

export default function RegisterForm() {
  //#region State

  const initialValues: UserRegistrationForm = {
    email: "",
    password: "",
    name: "",
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

  //#endregion

  return (
    <form method="POST" action="" className="register__form grid" noValidate>
      <div className="field">
        <input
          type="email"
          id="email"
          name="email"
          placeholder=""
          value={userRegistrationForm.email}
          onChange={handleChange}
        />
        <label className="label" htmlFor="email">
          Correo Electrónico
        </label>
      </div>

      <div className="field">
        <input
          type="text"
          id="username"
          placeholder=""
          name="username"
          value={userRegistrationForm.name}
          onChange={handleChange}
        />
        <label className="label" htmlFor="username">
          Nombre Completo
        </label>
      </div>

      <div className="field">
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={userRegistrationForm.password}
          onChange={handleChange}
        />
        <label className="label" htmlFor="password">
          Contraseña
        </label>
      </div>

      <input type="submit" className="button" />
    </form>
  );
}
