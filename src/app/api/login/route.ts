import { NextRequest, NextResponse } from "next/server";
import { logInfo, logError } from "@/src/lib";
import { signIn } from "@/src/lib/nextauth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const provider = data.providerId;
    await signIn(provider, { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof Error) {
      logError(error);
    }
    return new NextResponse(
      JSON.stringify({
        error: "Something went wrong.",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
