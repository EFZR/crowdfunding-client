import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const token = cookies.get("token")?.value;
  console.log(nextUrl.pathname);

  if (
    token &&
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
