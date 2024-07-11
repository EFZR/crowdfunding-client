import Link from "next/link";
import Image from "next/image";

import LoginForm from "@/src/components/authentication/login/LoginForm";
import "@/src/styles/app/authentication/login/login.css";

/**
 * FIX: CSRF Token not present when signIn
 */

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

        <LoginForm />
      </div>

      {/* TODO: Implement email auth to make it work */}
      <Link href="" className="forgot__password-link">
        ¿Olvidaste tu Contraseña?
      </Link>
    </section>
  );
}
