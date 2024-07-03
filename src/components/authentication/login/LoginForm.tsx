"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders } from "next-auth/react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { authenticate } from "@/src/actions";
import { UserLoginForm } from "@/src/types/authentication";
import { FormStateResult, initialFormStateValues } from "@/src/types/formState";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import "@/src/styles/components/authentication/login/LoginForm.css";

//#region Props

async function getLoginFormProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destiantion: "/dashboard" } };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

type LoginFormProps = InferGetServerSidePropsType<typeof getLoginFormProps>;

//#endregion

export default function LoginForm({ csrfToken }: LoginFormProps) {
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
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

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
