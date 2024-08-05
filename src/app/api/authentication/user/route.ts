import { headers } from "next/headers";
import { userSchema } from "@/src/types/authentication";
import { logger } from "@/src/lib";

export async function GET() {
  const bearer = headers().get("Authorization");
  const [_, token] = bearer!.split(" ");

  try {
    const response = await fetch(`${process.env.API_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      const { errors } = responseData;
      return Response.json({
        errors,
      });
    }

    const responseDataValidation = userSchema.safeParse(responseData);

    if (!responseDataValidation.success) {
      return Response.json({
        errors: [
          {
            message: "Respuesta Invalida.",
          },
        ],
      });
    }

    return Response.json(responseDataValidation.data);
  } catch (error) {
    if (error instanceof Error) {
      logger.critical(error.message);
      return new Response("Error interno, vuela a intentarlo mas tarde.", {
        status: 500,
      });
    }
  }
}
