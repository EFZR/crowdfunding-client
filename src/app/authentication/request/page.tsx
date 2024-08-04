import Link from "next/link";

import RequestConfirmationTokenForm from "@/src/components/authentication/request/RequestConfirmationTokenForm";
import "./request.css";

export default function page() {
  return (
    <div className="grid request__container">
      <div className="request__content">
        <h1 className="request__title">Solicitar Código de Confirmación</h1>
        <h2 className="request__subtitle">
          Coloca tu correo para recibir un {""}
          <span>nuevo código</span>
        </h2>

        <RequestConfirmationTokenForm />

        <nav className="request__nav-link">
          <Link href="/authentication/login" className="request__auth-link">
            ¿Ya tienes cuenta? Iniciar Sesión
          </Link>
          <Link href="/authentication/forgotPassword" className="request__auth-link">
            ¿Olvidaste tu contraseña? Reestablecer
          </Link>
        </nav>
      </div>
    </div>
  );
}
