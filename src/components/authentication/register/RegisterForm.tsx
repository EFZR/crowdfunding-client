"use client";

import "@/src/styles/components/authentication/register/RegisterForm.css";

export default function RegisterForm() {
  return (
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
  );
}
