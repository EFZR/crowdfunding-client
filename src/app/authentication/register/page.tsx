import React from "react";
import Link from "next/link";
import Image from "next/image";

import RegisterForm from "@/src/components/authentication/register/RegisterForm";
import "@/src/styles/app/authentication/register/register.css";

export default function page() {
  return (
    <section className="register section container grid">
      <h1 className="register__title">
        ¡Invierte en los fundadores en los que confías!
      </h1>
      <span className="register__subtitle">
        ¿Ya tienes una cuenta en Crowdfunding?{" "}
        <Link href="/authentication/login">¡Inicia Sesión!</Link>
      </span>

      <div className="register__mode grid">
        <div className="register__button-container grid">
          <button className="login__oauth-button">
            <Image
              src={`/google.svg`}
              alt={`Google OAuth 2.0`}
              width={30}
              height={30}
            />
            <span>Continúa con Google</span>
          </button>

          <button className="login__oauth-button">
            <Image
              src={`/facebook.svg`}
              alt={`Facebook OAuth 2.0`}
              width={30}
              height={30}
            />
            <span>Continúa con Facebook</span>
          </button>
        </div>

        <div className="divisor">
          <span>or</span>
        </div>

        <RegisterForm />
      </div>
    </section>
  );
}
