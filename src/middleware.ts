import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";

export default async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const user = await getServerSideUser(cookies);

  if (
    user &&
    ["/authentication/login", "/authentication/register"].includes(
      nextUrl.pathname
    )
  ) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}`, req.url)
    );
  }

  return NextResponse.next();
}
