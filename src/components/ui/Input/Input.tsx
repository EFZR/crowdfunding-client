"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, name, ...props }, ref) => {
    return (
      <div className="field">
        <input id={id} name={name} ref={ref} className="input" {...props} />
        <label className="label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
