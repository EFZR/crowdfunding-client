"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { authenticate } from "@/src/actions/authentication";
import "@/src/styles/components/authentication/login/LoginForm.css";
import { UserLoginForm } from "@/src/types/authentication";

export default function LoginForm() {
  //#region States

  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginForm>({ defaultValues: initialValues });

  //#endregion

  function handleLoginForm() {}

  return (
    <form className="login__form grid">
      <div className="field">
        <input type="email" id="email" name="email" placeholder="" />
        <label className="label" htmlFor="email">
          Correo Electronico
        </label>
      </div>

      <div className="field">
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
        />
        <label className="label" htmlFor="password">
          Contraseña
        </label>
      </div>

      <input type="submit" className="button" />
    </form>
  );
}
