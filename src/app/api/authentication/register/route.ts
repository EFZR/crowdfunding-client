import prisma from "@/src/lib/database";
import { NextResponse } from "next/server";
import { hashPassword } from "@/src/lib/bcrypt";

export async function POST(req: Request) {
  const { password, email, name } = await req.json();
  try {
    // Prevent duplicate records.
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { user: null, error: "Usuario con ese correo, ya esta registrado." },
        { status: 409 }
      );
    }

    // Hash password.
    const hashedPassword = await hashPassword(password);

    // Init creation user.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        user,
        message: "Usuario creado correctamente.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error interno, intente de nuevo luego.",
      },
      { status: 500 }
    );
  }
}
