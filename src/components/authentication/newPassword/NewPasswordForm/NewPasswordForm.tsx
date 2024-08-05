import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Input } from "@/src/components/ui/Input/Input";
import { NewPassword, newPasswordSchema } from "@/src/types/authentication";
import { responseSchema } from "@/src/types/response";
import { validateFormData } from "@/src/lib/validator";
import "./NewPasswordForm.css";

type NewPasswordFormProps = {
  token: string;
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  //#region States

  const initialState: NewPassword = {
    password: "",
    password_confirmation: "",
    token,
  };

  const [newPasswordForm, setNewPasswordForm] =
    useState<NewPassword>(initialState);

  const router = useRouter();

  //#endregion

  //#region Functions

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valid = validateFormData(newPasswordSchema, newPasswordForm);

    if (!valid) return;

    try {
      const body = JSON.stringify(newPasswordForm);
      const response = await fetch("/api/authentication/newPassword", {
        method: "PUT",
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

      setNewPasswordForm(initialState);
      toast.success(responseData.success!);

      router.push("/authentication/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNewPasswordForm({
      ...newPasswordForm,
      [e.target.id]: e.target.value,
    });
  }

  //#endregion

  return (
    <div className="grid newPasswordForm__container">
      <div className="newPasswordForm__content">
        <h1 className="newPasswordForm__title">Restablece tu Contraseña</h1>
        <h2 className="newPasswordForm__subtitle">
          Elige una nueva contraseña y{" "}
          <span>recupera el acceso a tu cuenta</span>
        </h2>

        <form onSubmit={handleSubmit} className="grid newPasswordForm__form">
          <Input
            type="password"
            id="password"
            name="password"
            label="Nueva Contraseña"
            value={newPasswordForm.password}
            onChange={handleChange}
          />

          <Input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            label="Confirmar Contraseña"
            value={newPasswordForm.password_confirmation}
            onChange={handleChange}
          />

          <input type="submit" className="button" />
        </form>
      </div>
    </div>
  );
}
