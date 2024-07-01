"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { UserRegistrationForm } from "@/src/types/authentication";
import { FormStateResult, initialFormStateValues } from "@/src/types/formState";
import { createAccount } from "@/src/actions";
import "@/src/styles/components/authentication/register/RegisterForm.css";

export default function RegisterForm() {
  //#region State

  const initialValues: UserRegistrationForm = {
    email: "",
    password: "",
    username: "",
  };

  const [userRegistrationForm, setUserRegistrationForm] =
    useState<UserRegistrationForm>(initialValues);

  const [state, dispatch] = useFormState<FormStateResult, UserRegistrationForm>(
    handleRegistrationForm,
    initialFormStateValues
  );

  // Handle errors.
  useEffect(() => {
    if (state.errors) {
      Object.keys(state.errors).forEach((key) => {
        state.errors[key].forEach((error) => {
          toast.error(error);
        });
      });
    }

    if (state.message !== "") {
      toast.success(state.message);
    }
  }, [state]);

  //#endregion

  //#region Functions

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserRegistrationForm({
      ...userRegistrationForm,
      [e.target.id]: e.target.value,
    });
  }

  async function handleRegistrationForm(): Promise<FormStateResult> {
    const result = await createAccount(userRegistrationForm);
    return result;
  }

  //#endregion

  return (
    <form className="register__form grid" action={dispatch} noValidate>
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
