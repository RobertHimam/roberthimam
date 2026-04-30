import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  user?: {
    email: string;
    isAdmin: boolean;
  };
  isLoggedIn: boolean;
}

export const sessionOptions = {
  password: process.env.AUTH_SECRET || "complex_password_at_least_32_characters_long",
  cookieName: "robert_himam_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }

  return session;
}
