import Link from "next/link";
import Image from "next/image";

import LoginForm from "@/src/components/authentication/login/LoginForm";
import "@/src/styles/app/authentication/login/login.css";

export default function page() {
  return (
    <section className="login section container grid">
      <h1 className="login__title">¡Hola, Bienvenido de nuevo!</h1>
      <span className="login__subtitle">
        ¿Nuevo en Crowdfunding?{" "}
        <Link href="/authentication/register">¡Regístrate!</Link>
      </span>

      <LoginForm />

      {/* TODO: Implement email auth to make it work */}
      <Link href="" className="forgot__password-link">
        ¿Olvidaste tu Contraseña?
      </Link>
    </section>
  );
}
