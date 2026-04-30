import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email: rawEmail, password: rawPassword } = await request.json();
    const email = rawEmail?.trim();
    const password = rawPassword?.trim();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      console.error("Missing auth env vars")
      return NextResponse.json(
        { message: "Authentication not configured" },
        { status: 500 }
      )
    }


    if (email !== adminEmail) {
      return NextResponse.json(
        { message: "Invalid email" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const session = await getSession();
    session.user = {
      email: adminEmail,
      isAdmin: true,
    };
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ message: "Logged in successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
