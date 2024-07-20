import { loginSchema } from "@/src/types/authentication";
import { logger } from "@/src/lib";

export async function POST(request: Request) {
  const requestData = await request.json();
  const validation = loginSchema.safeParse(requestData);

  if (!validation.success) {
    return Response.json({
      error: "Respuesta invalida.",
    });
  }

  const body = JSON.stringify(validation.data);

  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const responseData = await response.json();

    if (!response.ok) {
      const { errors } = responseData;
      return Response.json({
        errors,
      });
    }

    const { token } = responseData;
    return Response.json({
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.critical(error.message);
      return new Response("Error interno, vuela a intentarlo mas tarde.", {
        status: 500,
      });
    }
  }
}
