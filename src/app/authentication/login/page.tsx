import Link from "next/link";

import LoginForm from "@/src/components/authentication/login/LoginForm";
import OAuthButton from "@/src/components/ui/OAuth/OAuthButton";
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
          <OAuthButton
            src="/google.svg"
            alt="google"
            provider="google"
            height={30}
            width={30}
            key={"google"}
          />

          <OAuthButton
            src="/facebook.svg"
            alt="facebook"
            provider="facebook"
            height={30}
            width={30}
            key={"facebook"}
          />
        </div>

        <div className="login__divisor">
          <span>or</span>
        </div>

        <LoginForm />
      </div>

      <Link
        href="/authentication/forgotPassword"
        className="login__forgotPassword-link"
      >
        ¿Olvidaste tu Contraseña?
      </Link>
    </section>
  );
}
