import { cookies } from "next/headers";

const COOKIE_NAME = "belyzlash-auth-token";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
  };
}

export async function getAuthToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value;
}

export async function setAuthToken(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, cookieOptions());
}

export async function deleteAuthToken() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { ...cookieOptions(), maxAge: 0 });
}

export { COOKIE_NAME };
