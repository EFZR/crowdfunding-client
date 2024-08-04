import Link from "next/link";

import RequestConfirmationTokenForm from "@/src/components/authentication/request/RequestConfirmationTokenForm";
import "./request.css";

export default function page() {
  return (
    <div className="grid form__container">
      <div className="content">
        <h1 className="title">Solicitar Código de Confirmación</h1>
        <h2 className="subtitle">
          Coloca tu correo para recibir un {""}
          <span>nuevo código</span>
        </h2>

        <RequestConfirmationTokenForm />

        <nav className="nav__link">
          <Link href="/authentication/login" className="auth__link">
            ¿Ya tienes cuenta? Iniciar Sesión
          </Link>
          <Link href="/authentication/register" className="auth__link">
            ¿Olvidaste tu contraseña? Reestablecer
          </Link>
        </nav>
      </div>
    </div>
  );
}
