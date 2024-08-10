"use client";

import { useAuth } from "@/src/hooks/useAuth";

export default function SignoutButton() {
  const { signOut } = useAuth();
  return <button className="button" onClick={signOut}>Cerrar sesión</button>;
}
