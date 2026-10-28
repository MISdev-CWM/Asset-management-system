import "server-only";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { connectDb } from "./db";
import { User, Session } from "./models";

const COOKIE_NAME = "asset_session";
const SESSION_DAYS = 7;

export type SafeUser = { id: string; username: string; email: string; role: string };

function sha256(v: string) {
  return crypto.createHash("sha256").update(v).digest("hex");
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(";")) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    try {
      out[k] = decodeURIComponent(v);
    } catch {
      out[k] = v;
    }
  }
  return out;
}

export function getSessionTokenFromRequest(request: Request): string | null {
  const cookies = parseCookies(request.headers.get("cookie"));
  return cookies[COOKIE_NAME] || null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string): Promise<string> {
  await connectDb();
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await Session.create({ tokenHash, userId, expiresAt });
  return token;
}

export async function getUserFromRequest(request: Request): Promise<SafeUser | null> {
  const token = getSessionTokenFromRequest(request);
  if (!token) return null;
  await connectDb();
  const session = await Session.findOne({ tokenHash: sha256(token), expiresAt: { $gt: new Date() } });
  if (!session) return null;
  const user = await User.findById(session.userId);
  if (!user) return null;
  return { id: String(user._id), username: user.username, email: user.email, role: user.role };
}

export async function destroySession(request: Request): Promise<void> {
  const token = getSessionTokenFromRequest(request);
  if (!token) return;
  await connectDb();
  await Session.deleteOne({ tokenHash: sha256(token) });
}

export function buildSessionCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export function buildClearCookie(): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`;
}

export async function requireUser(request: Request): Promise<SafeUser> {
  const user = await getUserFromRequest(request);
  if (!user) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return user;
}
