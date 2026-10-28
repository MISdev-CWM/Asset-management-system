module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
async function POST(request) {
    try {
        const { LoginSchema } = await __turbopack_context__.A("[project]/src/lib/schemas.ts [app-route] (ecmascript, async loader)");
        const body = await request.json().catch(()=>({}));
        const parsed = LoginSchema.safeParse(body);
        if (!parsed.success) {
            return Response.json({
                error: "Invalid input",
                details: parsed.error.flatten()
            }, {
                status: 400
            });
        }
        const { connectDb } = await __turbopack_context__.A("[project]/src/lib/server/db.ts [app-route] (ecmascript, async loader)");
        await connectDb();
        const { User } = await __turbopack_context__.A("[project]/src/lib/server/models.ts [app-route] (ecmascript, async loader)");
        const { verifyPassword, createSession, buildSessionCookie } = await __turbopack_context__.A("[project]/src/lib/server/auth.ts [app-route] (ecmascript, async loader)");
        const { identifier, password } = parsed.data;
        const user = await User.findOne({
            $or: [
                {
                    email: identifier.toLowerCase()
                },
                {
                    username: identifier.toLowerCase()
                }
            ]
        });
        if (!user) {
            return Response.json({
                error: "Invalid credentials"
            }, {
                status: 401
            });
        }
        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) {
            return Response.json({
                error: "Invalid credentials"
            }, {
                status: 401
            });
        }
        const token = await createSession(String(user._id));
        return new Response(JSON.stringify({
            user: {
                id: String(user._id),
                username: user.username,
                email: user.email,
                role: user.role
            }
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": buildSessionCookie(token)
            }
        });
    } catch (err) {
        console.error(err);
        return Response.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0po24av1j3f8i._.js.map