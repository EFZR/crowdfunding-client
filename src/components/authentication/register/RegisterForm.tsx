"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

import { UserRegistrationForm } from "@/src/types/authentication";
import { registrationSchema } from "@/src/types/authentication";
import "@/src/styles/components/authentication/register/RegisterForm.css";

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
    const url = "/api/authentication/register";

    // Checking integrity of data.
    const valid = validateFormData();

    if (!valid) return;

    try {
      // const response = await createAccount(userRegistrationForm);
      // toast.success(response);
      // setUserRegistrationForm(initialValues);
    } catch (error) {
      // if (error instanceof Error) {
      //   toast.error(error.message);
      // }
    }
  }

  // TODO: make an own function for each problem with the same issue.
  function validateFormData(): boolean {
    const result = registrationSchema.safeParse(userRegistrationForm);

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
    <form onSubmit={handleSubmit} className="register__form grid" noValidate>
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
          value={userRegistrationForm.username}
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
