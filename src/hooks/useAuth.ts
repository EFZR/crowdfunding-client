import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useAuth = () => {
  const router = useRouter();

  async function signOut() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Sesión cerrada correctamente");

      router.push("/authentication/login");

      router.refresh();
    } catch (err) {
      toast.error("No se pudo cerrar la sesión, por favor inténtalo de nuevo.");
    }
  }

  return { signOut };
};
