"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { authenticate } from "@/src/actions";
import { UserLoginForm } from "@/src/types/authentication";
import { FormStateResult, initialFormStateValues } from "@/src/types/formState";
import "@/src/styles/components/authentication/login/LoginForm.css";

export default function LoginForm() {
  //#region States

  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const [userLoginForm, setUserLoginForm] =
    useState<UserLoginForm>(initialValues);

  const [state, dispatch] = useFormState<FormStateResult, UserLoginForm>(
    handleLoginForm,
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
    setUserLoginForm({
      ...userLoginForm,
      [e.target.id]: e.target.value,
    });
  }

  async function handleLoginForm(): Promise<FormStateResult> {
    const result = await authenticate(userLoginForm);
    return result;
  }

  //#endregion

  return (
    <form className="login__form grid" action={dispatch} noValidate>
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
  );
}
