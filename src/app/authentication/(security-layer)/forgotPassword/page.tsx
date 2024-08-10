import Link from "next/link";

import RequestNewPasswordTokenForm from "@/src/components/authentication/forgotPassword/RequestNewPasswordTokenForm";
import "./forgotPassword.css";

export default function page() {
  return (
    <>
      <h1 className="forgotPassword__title">Reestablecer Contraseña</h1>
      <h2 className="forgotPassword__subtitle">
        ¿Olvidaste Password? Coloca tu E-Mail y {""}
        <span>restablece tu password</span>
      </h2>

      <RequestNewPasswordTokenForm />

      <nav className="forgotPassword__nav-link">
        <Link
          href="/authentication/login"
          className="forgotPassword__auth-link"
        >
          ¿Ya tienes cuenta? Iniciar Sesión.
        </Link>
        <Link
          href="/authentication/register"
          className="forgotPassword__auth-link"
        >
          ¿No tienes cuenta? Crea una.
        </Link>
      </nav>
    </>
  );
}
