"use client";

import { useState, FormEvent, ChangeEvent, KeyboardEvent } from "react";
import toast from "react-hot-toast";
import "@/src/styles/components/authentication/confirmation/OTPForm.css";

export default function OTPFormConfirmation() {
  //#region States

  const initialValue: string[] = new Array(6).fill("");
  const [otp, setOtp] = useState<string[]>(initialValue);

  //#endregion

  //#region Functions

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = otp.join("");
    if (token.length === otp.length) {
      console.log(otp);
    }
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

  // TODO: Fix prevInput
  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === "Backspace" && !event.currentTarget.value) {
      const prevInput = event.currentTarget
        .previousElementSibling as HTMLInputElement | null;

      if (prevInput && prevInput.tagName === "INPUT") {
        prevInput.focus();
        setOtp([...otp.map((d, idx) => (idx === index - 1 ? "" : d))]);
      }
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
                onKeyDown={(e) => handleKeyDown(e, index)}
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
