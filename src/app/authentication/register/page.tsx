import Link from "next/link";

import RegisterForm from "@/src/components/authentication/register/RegisterForm";
import OAuthButton from "@/src/components/ui/OAuth/OAuthButton";
import "./register.css";

export default function page() {
  return (
    <section className="container section grid register">
      <h1 className="register__title">
        ¡Invierte en los fundadores en los que confías!
      </h1>
      <span className="register__subtitle">
        ¿Ya tienes una cuenta en Crowdfunding?{" "}
        <Link href="/authentication/login">¡Inicia Sesión!</Link>
      </span>

      <div className="grid register__mode">
        <div className="grid register__button-container">
          <OAuthButton
            src="/google.svg"
            alt="google"
            provider="google"
            height={30}
            width={30}
            key={"google"}
          />

          <OAuthButton
            src="/facebook.svg"
            alt="facebook"
            provider="facebook"
            height={30}
            width={30}
            key={"facebook"}
          />
        </div>

        <div className="register__divisor">
          <span>or</span>
        </div>

        <RegisterForm />
      </div>
    </section>
  );
}
