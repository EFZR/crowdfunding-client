import Link from "next/link";
import Image from "next/image";

import LoginForm from "@/src/components/authentication/login/LoginForm";
import "./login.css";

export default function page() {
  return (
    <section className="container section grid login">
      <h1 className="login__title">¡Hola, Bienvenido de nuevo!</h1>
      <span className="login__subtitle">
        ¿Nuevo en Crowdfunding?{" "}
        <Link href="/authentication/register">¡Regístrate!</Link>
      </span>

      <div className="grid login__mode">
        <div className="grid login__button-container">
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

        <div className="login__divisor">
          <span>or</span>
        </div>

        <LoginForm />
      </div>

      <Link href="/authentication/forgotPassword" className="login__forgotPassword-link">
        ¿Olvidaste tu Contraseña?
      </Link>
    </section>
  );
}
