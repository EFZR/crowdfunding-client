import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const token = cookies.get("token")?.value;
  console.log(token);

  if (token && ["authentication"].includes(nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
  }

  return NextResponse.next();
}
