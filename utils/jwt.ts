import type { ServerResponse } from "http";
import type { User, UserRole } from "@prisma/client";
import type { CookieSerializeOptions } from "cookie-es";
import { parse } from "cookie-es";
import { setCookie } from "h3";
import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

// Type safe authentication state validation
export interface AuthState {
  user: null | {
    id: number;
    role: UserRole;
  };
}

export const validateAuthState = (authState: AuthState): AuthState => ({
  user: authState?.user ? (({ id, role }) => ({ id, role }))(authState.user) : null,
});

// Decode and validate authentication state payload from (string) token
const jwtSecretKey = process.env.JWT_SECRET_KEY || "jwtsecretkey";

export const decodeJwt = (token: string): AuthState => {
  try {
    const authState = jwt.verify(token, jwtSecretKey) as AuthState;
    return validateAuthState(authState);
  } catch (error) {
    return { user: null };
  }
};

// Encode authentication state as JWT cookie in server response
export const jwtCookieName = process.env.JWT_COOKIE_NAME || "jwt";
const jwtSignOptions: SignOptions = { expiresIn: "2h" };
const jwtCookieOptions: CookieSerializeOptions = { path: "/", httpOnly: true };

export const setAuthState = (user: User | null, res: ServerResponse): AuthState => {
  const authState = validateAuthState({ user });
  setCookie(res, jwtCookieName, jwt.sign(authState, jwtSecretKey, jwtSignOptions), jwtCookieOptions);
  return authState;
};

// Extract JWT token from request.headers
export const getTokenFromHeaders = (headers: { cookie?: string }): string => {
  const cookies: Record<string, string> = parse(headers.cookie || "");
  return cookies[jwtCookieName] || "";
};
