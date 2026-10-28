import { connectDb } from "./db-DXe_0mj0.js";
import { Session, User } from "./models-BWSleU6g.js";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
//#region src/lib/server/auth.ts
var COOKIE_NAME = "asset_session";
function sha256(v) {
	return crypto.createHash("sha256").update(v).digest("hex");
}
function parseCookies(cookieHeader) {
	const out = {};
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
function getSessionTokenFromRequest(request) {
	return parseCookies(request.headers.get("cookie"))[COOKIE_NAME] || null;
}
async function hashPassword(password) {
	return bcrypt.hash(password, 12);
}
async function verifyPassword(password, hash) {
	return bcrypt.compare(password, hash);
}
async function createSession(userId) {
	await connectDb();
	const token = crypto.randomBytes(32).toString("hex");
	const tokenHash = sha256(token);
	const expiresAt = new Date(Date.now() + 6048e5);
	await Session.create({
		tokenHash,
		userId,
		expiresAt
	});
	return token;
}
async function getUserFromRequest(request) {
	const token = getSessionTokenFromRequest(request);
	if (!token) return null;
	await connectDb();
	const session = await Session.findOne({
		tokenHash: sha256(token),
		expiresAt: { $gt: /* @__PURE__ */ new Date() }
	});
	if (!session) return null;
	const user = await User.findById(session.userId);
	if (!user) return null;
	return {
		id: String(user._id),
		username: user.username,
		email: user.email,
		role: user.role
	};
}
async function destroySession(request) {
	const token = getSessionTokenFromRequest(request);
	if (!token) return;
	await connectDb();
	await Session.deleteOne({ tokenHash: sha256(token) });
}
function buildSessionCookie(token) {
	return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800; Secure`;
}
function buildClearCookie() {
	return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; Secure`;
}
async function requireUser(request) {
	const user = await getUserFromRequest(request);
	if (!user) throw new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	return user;
}
//#endregion
export { buildClearCookie, buildSessionCookie, createSession, destroySession, getUserFromRequest, hashPassword, requireUser, verifyPassword };
