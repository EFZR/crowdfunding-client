"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import "@/src/styles/components/authentication/confirmation/OTPForm.css";

export default function OTPFormConfirmation() {
  //#region States

  const initialValue: string[] = new Array(6).fill("");
  const [otp, setOtp] = useState<string[]>(initialValue);

  //#endregion

  //#region Functions

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(otp);
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>, index: number) {
    if (isNaN(+event.target.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? event.target.value : d))]);

    const nextInput = event.target
      .nextElementSibling as HTMLInputElement | null;

    if (nextInput && nextInput.tagName === "INPUT") {
      nextInput.focus();
    }
  }

  //#endregion

  return (
    <div className="grid OTP__container">
      <form onSubmit={handleSubmit}>
        <h1 className="title">Ingresa el token de confirmación</h1>
        <h2 className="text">Te enviamos un token de verificación al correo</h2>
        <div className="input__container">
          {otp.map((data, index) => {
            return (
              <input
                type="text"
                maxLength={1}
                key={index}
                value={data}
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleInput(e, index)}
              />
            );
          })}
        </div>
        <a href="#" className="resend__text">
          Renviar Token de validación
        </a>
        <input type="submit" value="verificar" className="button" />
      </form>
    </div>
  );
}
