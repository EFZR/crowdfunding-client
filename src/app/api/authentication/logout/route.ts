import { cookies } from "next/headers";
import { logger } from "@/src/lib";

export async function POST() {
  cookies().delete("token");

  logger.success("User Logged out.");

  return Response.json({
    message: "Sesión cerrada correctamente.",
  });
}
