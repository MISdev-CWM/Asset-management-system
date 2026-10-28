module.exports = [
"[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("mongoose-8b99e611e7552af3", () => require("mongoose-8b99e611e7552af3"));

module.exports = mod;
}),
"[project]/src/lib/server/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDb",
    ()=>connectDb,
    "isDbConnected",
    ()=>isDbConnected
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
;
const cached = /*TURBOPACK member replacement*/ __turbopack_context__.g._mongooseCache ?? (/*TURBOPACK member replacement*/ __turbopack_context__.g._mongooseCache = {
    conn: null,
    promise: null
});
async function connectDb() {
    if (cached.conn) return cached.conn;
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not set");
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(uri, {
            dbName: process.env.MONGODB_DB_NAME || undefined
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }
    return cached.conn;
}
function isDbConnected() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connection.readyState === 1;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0mpdqw4m0tr4r._.js.map