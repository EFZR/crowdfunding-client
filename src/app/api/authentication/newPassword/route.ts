import {
  newPasswordTokenSchema,
  newPasswordSchema,
} from "@/src/types/authentication";
import { logger } from "@/src/lib";

export async function POST(request: Request) {
  const requestData = await request.json();
  const validation = newPasswordTokenSchema.safeParse(requestData);

  if (!validation.success) {
    return Response.json({
      errors: "Respuesta invalida.",
    });
  }

  const body = JSON.stringify(validation.data);

  try {
    const response = await fetch(
      `${process.env.API_URL}/auth/validate-password-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const { errors } = responseData;
      return Response.json({
        errors,
      });
    }

    const { success } = responseData;
    return Response.json({
      success,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.critical(error.message);
      return Response.json({
        error: "Error interno, vuela a intentarlo mas tarde.",
      });
    }
  }
}

export async function PUT(request: Request) {
  const requestData = await request.json();
  const validation = newPasswordSchema.safeParse(requestData);

  if (!validation.success) {
    return Response.json({
      errors: "Respuesta invalida.",
    });
  }

  const body = JSON.stringify(validation.data);

  try {
    const response = await fetch(
      `${process.env.API_URL}/auth/update-password/${validation.data.token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const { errors } = responseData;
      return Response.json({
        errors,
      });
    }

    const { success } = responseData;
    return Response.json({
      success,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.critical(error.message);
      return Response.json({
        error: "Error interno, vuela a intentarlo mas tarde.",
      });
    }
  }
}
