"use client";

import Image from "next/image";
import "./OAuthButton.css";

type OAuthButtonProps = {
  src: string;
  alt: string;
  provider: string;
  width: number;
  height: number;
};

export default function OAuthButton({
  src,
  alt,
  width = 30,
  height = 30,
  provider,
}: OAuthButtonProps) {
  return (
    <a
      className="oauth-button"
      href={`${process.env.API_URL}/auth/${provider}/authentication`}
    >
      <Image src={src} alt={alt} width={width} height={height} />
      <span>Continúa con {provider}</span>
    </a>
  );
}
