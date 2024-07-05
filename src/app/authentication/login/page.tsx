import Link from "next/link";

import LoginForm from "@/src/components/authentication/login/LoginForm";
import "@/src/styles/app/authentication/login/login.css";
import { providerMap } from "@/src/lib/nextauth";
import OAuthButton from "@/src/components/authentication/login/OAuthButton";

export default function page() {
  return (
    <section className="login section container grid">
      <h1 className="login__title">¡Hola, Bienvenido de nuevo!</h1>
      <span className="login__subtitle">
        ¿Nuevo en Crowdfunding?{" "}
        <Link href="/authentication/register">¡Regístrate!</Link>
      </span>

      <div className="login__mode grid">
        <div className="login__button-container grid">
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

        <LoginForm />
      </div>

      {/* TODO: Implement email auth to make it work */}
      <Link href="" className="forgot__password-link">
        ¿Olvidaste tu Contraseña?
      </Link>
    </section>
  );
}
