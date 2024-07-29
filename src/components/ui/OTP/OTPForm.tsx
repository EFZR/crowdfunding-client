"use client";

import { useState, useRef, KeyboardEvent, FC, useEffect } from "react";
import toast from "react-hot-toast";
import "./OTPForm.css";

type OTPFormProps = {
  length: number;
  value: string;
  onSubmit: (token: string) => Promise<void>;
  onChange: (token: string) => void;
};

const OTPForm: FC<OTPFormProps> = ({ length, value, onSubmit, onChange }) => {
  //#region States

  const initialValue = new Array(length).fill("");
  const [otp, setOtp] = useState<string[]>(initialValue);
  const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Update the parent component's state whenever otp state changes
    onChange(otp.join(""));

    if (value.length === length) {
      handleSubmit();
    }
  }, [otp, value]);

  //#endregion

  //#region Functions

  async function handleSubmit() {
    try {
      await onSubmit(value);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Sucedio un error, porfavor intenta de nuevo mas tarde.");
      }
    }
  }

  async function handleChange(digit: string, index: number) {
    if (isNaN(+digit)) return;

    let newArr = [...otp];
    newArr[index] = digit;
    setOtp(newArr);

    if (digit && index < length - 1) {
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

    if (
      event.key === "Enter" &&
      !event.currentTarget.value &&
      index < length + 1
    ) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  //#endregion

  return (
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
  );
};

export default OTPForm;
