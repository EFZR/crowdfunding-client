import Link from "next/link";

import OTPFormConfirmation from "@/src/components/authentication/confirmation/OTPFormConfirmation";
import "./confirmation.css";

export default function page() {
  return (
    <div className="grid confirmation__container">
      <form className="confirmation__form">
        <h1 className="confirmation__title">Ingresa el token de confirmación</h1>
        <h2 className="confirmation__subtitle">
          Te enviamos un token de {""}
          <span>verificación al correo</span>
        </h2>
        <OTPFormConfirmation />
        <Link href="/authentication/request" className="confirmation__request-link">
          Renviar Token de validación
        </Link>
      </form>
    </div>
  );
}
