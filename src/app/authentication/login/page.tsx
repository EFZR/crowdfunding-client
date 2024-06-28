import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/src/styles/authentication/login.css";

export default function page() {
  return (
    <section className="login section container grid">
      <h1 className="login__title">¡Hola, Bienvenido de nuevo!</h1>
      <span className="login__subtitle">
        ¿Nuevo en Crowdfunding?{" "}
        <Link href="/authentication/register">¡Regístrate!</Link>
      </span>

      <div className="login__mode grid">
        <div className="login__button-container grid">
          <button className="login__oauth-button">
            <Image
              src={"/google.svg"}
              width={30}
              height={30}
              alt="Google OAuth 2.0"
            />
            <span>Continúa con Google</span>
          </button>
          <button className="login__oauth-button">
            <Image
              src={"/facebook.svg"}
              width={30}
              height={30}
              alt="Facebook OAuth 2.0"
            />
            <span>Continúa con Facebook</span>
          </button>
          <button className="login__oauth-button">
            <Image
              src={"/apple.svg"}
              width={30}
              height={30}
              alt="Apple OAuth 2.0"
            />
            <span>Continúa con Apple</span>
          </button>
        </div>

        <div className="divisor">
          <span>or</span>
        </div>

        <form className="login__form grid">
          <div className="field">
            <input type="email" id="email" name="email" placeholder="" />
            <label className="label" htmlFor="email">
              Correo Electronico
            </label>
          </div>

          <div className="field">
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
            />
            <label className="label" htmlFor="password">
              Contraseña
            </label>
          </div>

          <input type="submit" className="button" />
        </form>
      </div>

      {/* TODO: Implement email auth to make it work */}
      <Link href="" className="forgot__password-link">
        ¿Olvidaste tu Contraseña?
      </Link>
    </section>
  );
}
