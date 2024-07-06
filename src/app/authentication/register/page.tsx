import React from "react";
import Link from "next/link";

import RegisterForm from "@/src/components/authentication/register/RegisterForm";
import OAuthButton from "@/src/components/authentication/login/OAuthButton";
import { providerMap } from "@/src/lib/nextauth";
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
          {providerMap.map(
            (provider) =>
              provider.id !== "credentials" && (
                <OAuthButton
                  key={provider.id}
                  providerId={provider.id}
                  providerName={provider.name}
                />
              )
          )}
        </div>

        <div className="divisor">
          <span>or</span>
        </div>

        <RegisterForm />
      </div>
    </section>
  );
}
