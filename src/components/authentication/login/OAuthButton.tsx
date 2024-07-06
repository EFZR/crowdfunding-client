import Image from "next/image";
import { signIn } from "@/src/lib/nextauth";
import "@/src/styles/components/authentication/login/OAuthButton.css";

type OAuthButtonProps = {
  providerId: string;
  providerName: string;
};

export default function OAuthButton({
  providerId,
  providerName,
}: OAuthButtonProps) {
  return (
    <form
      key={providerId}
      action={async () => {
        "use server";
        await signIn(providerId, { redirectTo: "/" });
      }}
    >
      <button className="login__oauth-button">
        <Image
          src={`/${providerId}.svg`}
          alt={`${providerName} OAuth 2.0`}
          width={30}
          height={30}
        />
        <span>Continúa con {providerName}</span>
      </button>
    </form>
  );
}
