//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/lib/auth-client.ts
var auth_client_exports = /* @__PURE__ */ __exportAll({
	getCurrentUser: () => getCurrentUser,
	login: () => login,
	logout: () => logout
});
async function login(identifier, password) {
	const res = await fetch("/api/auth/login", {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			identifier,
			password
		})
	});
	if (!res.ok) {
		let msg = "Login failed";
		try {
			const data = await res.json();
			if (data?.error) msg = data.error;
		} catch {}
		throw new Error(msg);
	}
	return (await res.json()).user ?? null;
}
async function logout() {
	await fetch("/api/auth/logout", {
		method: "POST",
		credentials: "include"
	});
}
async function getCurrentUser() {
	try {
		const res = await fetch("/api/auth/me", { credentials: "include" });
		if (!res.ok) return null;
		return (await res.json()).user ?? null;
	} catch {
		return null;
	}
}
//#endregion
export { getCurrentUser as n, logout as r, auth_client_exports as t };
