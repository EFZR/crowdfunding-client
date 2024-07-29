import Link from "next/link";

import { Input } from "@/src/components/ui/Input/Input";
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
        <form>
          <Input
            id="email"
            name="email"
            label="Correo Electronico..."
            placeholder=""
          />
          <input type="submit" className="button" />
        </form>

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
