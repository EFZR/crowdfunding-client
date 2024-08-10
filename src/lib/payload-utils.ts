import { NextRequest } from "next/server";
import { userSchema } from "../types/authentication";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function getServerSideUser(
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) {
  const token = cookies.get("token")?.value;

  if (!token) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return null;

    const responseData = await response.json();

    const { success, data } = userSchema.safeParse(responseData);

    return success ? data : null;
  } catch {
    return null;
  }
}

