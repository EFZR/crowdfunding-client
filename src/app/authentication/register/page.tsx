import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/authentication/register.css";

export default function page() {
  return (
    <section className="register section container grid">
      <h1 className="register__title">
        ¡Invierte en los fundadores en los que confías!
      </h1>
      <span className="register__subtitle">
        ¿Ya tienes una cuenta en Crowdfunding?{" "}
        <Link href="/authentication/login">¡Inicia Sesión!</Link>
      </span>

      <div className="register__mode grid">
        <div className="register__button-container grid">
          <button className="register__oauth-button">
            <Image
              src={"/google.svg"}
              width={30}
              height={30}
              alt="Google OAuth 2.0"
            />
            <span>Continúa con Google</span>
          </button>
          <button className="register__oauth-button">
            <Image
              src={"/facebook.svg"}
              width={30}
              height={30}
              alt="Google OAuth 2.0"
            />
            <span>Continúa con Facebook</span>
          </button>
          <button className="register__oauth-button">
            <Image
              src={"/apple.svg"}
              width={30}
              height={30}
              alt="Google OAuth 2.0"
            />
            <span>Continúa con Apple</span>
          </button>
        </div>

        <div className="divisor">
          <span>or</span>
        </div>

        <form className="register__form grid">
          <div className="field">
            <input type="email" id="email" name="email" placeholder="" />
            <label className="label" htmlFor="email">
              Correo Electrónico
            </label>
          </div>

          <div className="field">
            <input type="text" id="name" placeholder="" name="name" />
            <label className="label" htmlFor="name">
              Nombre Completo
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
    </section>
  );
}
