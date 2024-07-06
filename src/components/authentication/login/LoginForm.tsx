import { signIn } from "@/src/lib/nextauth";
import "@/src/styles/components/authentication/login/LoginForm.css";

export default function LoginForm() {
  return (
    <>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", {
            redirectTo: "/",
            email: formData.get("email"),
            password: formData.get("password"),
          });
        }}
        className="login__form grid"
        noValidate
      >
        <div className="field">
          <input type="email" id="email" name="email" placeholder="" />
          <label className="label" htmlFor="email">
            Correo Electronico
          </label>
        </div>

        <div className="field">
          <input type="password" id="password" name="password" placeholder="" />
          <label className="label" htmlFor="password">
            Contraseña
          </label>
        </div>

        <input type="submit" className="button" />
      </form>
    </>
  );
}
