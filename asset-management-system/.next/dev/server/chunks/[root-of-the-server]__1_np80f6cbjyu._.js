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
"[project]/src/app/api/assets/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
async function GET(request, ctx) {
    try {
        const { requireUser } = await __turbopack_context__.A("[project]/src/lib/server/auth.ts [app-route] (ecmascript, async loader)");
        await requireUser(request);
        const { id } = await ctx.params;
        const { getAsset } = await __turbopack_context__.A("[project]/src/lib/server/assets.ts [app-route] (ecmascript, async loader)");
        const asset = await getAsset(id);
        if (!asset) return Response.json({
            error: "Not found"
        }, {
            status: 404
        });
        return Response.json(asset);
    } catch (err) {
        if (err instanceof Response) return err;
        console.error(err);
        return Response.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
async function PATCH(request, ctx) {
    try {
        const { requireUser } = await __turbopack_context__.A("[project]/src/lib/server/auth.ts [app-route] (ecmascript, async loader)");
        await requireUser(request);
        const { id } = await ctx.params;
        const body = await request.json().catch(()=>({}));
        const { updateAsset } = await __turbopack_context__.A("[project]/src/lib/server/assets.ts [app-route] (ecmascript, async loader)");
        const asset = await updateAsset(id, body);
        if (!asset) return Response.json({
            error: "Not found"
        }, {
            status: 404
        });
        return Response.json(asset);
    } catch (err) {
        if (err instanceof Response) return err;
        if (err?.name === "ZodError") {
            return Response.json({
                error: "Validation failed",
                details: err.flatten?.() ?? err.issues
            }, {
                status: 400
            });
        }
        const msg = err?.message || "Internal server error";
        const status = msg.includes("already exists") ? 409 : 500;
        console.error(err);
        return Response.json({
            error: msg
        }, {
            status
        });
    }
}
async function DELETE(request, ctx) {
    try {
        const { requireUser } = await __turbopack_context__.A("[project]/src/lib/server/auth.ts [app-route] (ecmascript, async loader)");
        await requireUser(request);
        const { id } = await ctx.params;
        const { softDeleteAsset } = await __turbopack_context__.A("[project]/src/lib/server/assets.ts [app-route] (ecmascript, async loader)");
        const result = await softDeleteAsset(id);
        if (!result.ok) {
            if (result.reason === "not_found") return Response.json({
                error: "Not found"
            }, {
                status: 404
            });
            if (result.reason === "has_history") {
                return Response.json({
                    error: "Cannot delete asset with handover or return history"
                }, {
                    status: 409
                });
            }
        }
        return Response.json({
            ok: true
        });
    } catch (err) {
        if (err instanceof Response) return err;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1_np80f6cbjyu._.js.map