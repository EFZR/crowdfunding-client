import OTPFormConfirmation from "@/src/components/authentication/confirmation/OTPFormConfirmation";
import "./confirmation.css";

export default function page() {
  return (
    <div className="grid OTP__container">
      <form>
        <h1 className="title">Ingresa el token de confirmación</h1>
        <h2 className="text">Te enviamos un token de verificación al correo</h2>
        <OTPFormConfirmation />
        <a href="#" className="resend__text">
          Renviar Token de validación
        </a>
      </form>
    </div>
  );
}
