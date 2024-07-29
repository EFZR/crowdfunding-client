import Link from "next/link";

import OTPFormConfirmation from "@/src/components/authentication/confirmation/OTPFormConfirmation";
import "./confirmation.css";

export default function page() {
  return (
    <div className="grid OTP__container">
      <form>
        <h1 className="title">Ingresa el token de confirmación</h1>
        <h2 className="subtitle">
          Te enviamos un token de {""}
          <span>verificación al correo</span>
        </h2>
        <OTPFormConfirmation />
        <Link href="/authentication/request" className="request__link">
          Renviar Token de validación
        </Link>
      </form>
    </div>
  );
}
