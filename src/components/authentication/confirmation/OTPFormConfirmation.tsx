"use client";

import { useState, FormEvent, KeyboardEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { confirmationToken } from "@/src/types/authentication";
import { responseSchema } from "@/src/types/response";
import "./OTPForm.css";

export default function OTPFormConfirmation() {
  //#region States

  const initialValue: string[] = new Array(6).fill("");
  const [otp, setOtp] = useState<string[]>(initialValue);
  const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  //#endregion

  //#region Functions

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = otp.join("");
    const valid = validateFormData();

    if (!valid) return;

    try {
      const body = JSON.stringify({ token: token });
      const response = await fetch("/api/authentication/confirmation", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        throw new Error("Network response failed.");
      }

      const bodyResponse = await response.json();
      const responseValidation = responseSchema.safeParse(bodyResponse);

      if (!responseValidation.success) {
        toast.error("Respuesta Invalida");
        return;
      }

      const responseData = responseValidation.data;
      if (responseData.errors) {
        responseData.errors.forEach((error) => toast.error(error.message));
        return;
      }

      toast.success(responseData.success!);
      router.push("/authentication/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  // TODO: make an own function for each problem with the same issue.
  function validateFormData(): boolean {
    const token = otp.join("");
    const result = confirmationToken.safeParse({ token });

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      const errors: Record<string, string[]> = fieldErrors;

      // Showing errors.
      Object.entries(errors).forEach(([key, value]) => {
        if (value && value.length > 0) {
          toast.error(value[0]);
        }
      });

      return false;
    }

    return true;
  }

  function handleChange(value: string, index: number) {
    if (isNaN(+value)) return;

    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 6 - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  function handleBackspaceAndEnter(
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }

    if (event.key === "Enter" && !event.currentTarget.value && index < 6 + 1) {
      otpBoxReference.current[index + 1]?.focus();
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
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                ref={(reference: HTMLInputElement | null) => {
                  otpBoxReference.current[index] = reference;
                }}
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
