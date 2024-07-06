import prisma from "@/src/lib/database";
import { NextResponse } from "next/server";
import { checkPassword } from "@/src/lib/bcrypt";
import { signIn } from "@/src/lib/nextauth";

export async function POST(req: Request) {
  const { password, email } = await req.json();
  try {
    // Search User.
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      return NextResponse.json(
        { user: null, error: "Usuario no encontrado." },
        { status: 409 }
      );
    }

    // TODO: Check if user is confirmed

    // Check password.
    if (!userExists.password) {
      return NextResponse.json(
        {
          user: null,
          error: "Usuario registrado utilizando un método diferente.",
        },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await checkPassword(
      password,
      userExists.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          user: null,
          error: "Contraseña Incorrecta.",
        },
        { status: 404 }
      );
    }

    const result = await signIn("credentials", {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      image: userExists.image,
      redirect: false,
    });

    console.log(result);

    return NextResponse.json(
      {
        message: "Autenticando.",
      },
      { status: 200 }
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
