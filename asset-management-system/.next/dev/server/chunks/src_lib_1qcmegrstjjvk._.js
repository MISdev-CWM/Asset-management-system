(()=>{"use strict";module.exports = [
"[project]/src/lib/schemas.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssetInputSchema",
    ()=>AssetInputSchema,
    "BootstrapSchema",
    ()=>BootstrapSchema,
    "HandoverSchema",
    ()=>HandoverSchema,
    "LoginSchema",
    ()=>LoginSchema,
    "ReturnSchema",
    ()=>ReturnSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$literal$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .literal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$coerce$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .coerce>");
;
const LoginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    identifier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Email or username is required"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1, "Password is required")
});
const AssetInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    assetNo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$literal$3e$__["z"].literal("")),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Name is required"),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Type is required"),
    department: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Department is required"),
    serialNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Serial number is required"),
    imei1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().optional().default(""),
    imei2: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().optional().default(""),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$coerce$3e$__["z"].coerce.number().min(0, "Price must be >= 0"),
    purchaseDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Purchase date is required")
});
const HandoverSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Handover date is required"),
    personName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Responsible person's name is required"),
    employeeId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Employee ID is required")
});
const ReturnSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Return date is required"),
    reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Return reason is required"),
    collectedByName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Collected by name is required"),
    collectedById: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1, "Collected by employee ID is required")
});
const BootstrapSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    secret: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    username: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(3),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(8)
});
}),
"[project]/src/lib/server/assets.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addHandoverToAsset",
    ()=>addHandoverToAsset,
    "addReturnToAsset",
    ()=>addReturnToAsset,
    "createAsset",
    ()=>createAsset,
    "generateAssetNo",
    ()=>generateAssetNo,
    "getAsset",
    ()=>getAsset,
    "listAssets",
    ()=>listAssets,
    "listHandovers",
    ()=>listHandovers,
    "listReturns",
    ()=>listReturns,
    "softDeleteAsset",
    ()=>softDeleteAsset,
    "updateAsset",
    ()=>updateAsset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schemas.ts [app-route] (ecmascript)");
;
;
;
;
function toAssetDTO(asset, handovers = [], returns = []) {
    return {
        id: String(asset._id),
        assetNo: asset.assetNo,
        name: asset.name,
        type: asset.type,
        department: asset.department,
        serialNumber: asset.serialNumber,
        imei1: asset.imei1 || "",
        imei2: asset.imei2 || "",
        price: asset.purchasePrice,
        purchaseDate: asset.purchaseDate,
        currentResponsiblePersonName: asset.currentResponsiblePersonName || "",
        currentResponsiblePersonEmployeeId: asset.currentResponsiblePersonEmployeeId || "",
        status: asset.status,
        createdAt: asset.createdAt ? new Date(asset.createdAt).toISOString() : "",
        updatedAt: asset.updatedAt ? new Date(asset.updatedAt).toISOString() : "",
        handovers: handovers.map((h)=>({
                id: String(h._id),
                date: h.date,
                personName: h.personName,
                employeeId: h.employeeId,
                createdAt: h.createdAt ? new Date(h.createdAt).toISOString() : ""
            })),
        returns: returns.map((r)=>({
                id: String(r._id),
                date: r.date,
                reason: r.reason,
                collectedByName: r.collectedByName,
                collectedById: r.collectedById,
                createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : ""
            }))
    };
}
async function generateAssetNo() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const count = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].countDocuments({});
    let n = count + 1;
    while(true){
        const candidate = `AST-${String(n).padStart(4, "0")}`;
        const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].exists({
            assetNo: candidate
        });
        if (!exists) return candidate;
        n += 1;
    }
}
async function listAssets(params) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 50));
    const skip = (page - 1) * limit;
    const filter = {
        isDeleted: false
    };
    if (params.q && params.q.trim()) {
        const re = new RegExp(params.q.trim().replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"), "i");
        filter.$or = [
            {
                assetNo: re
            },
            {
                name: re
            },
            {
                type: re
            },
            {
                department: re
            },
            {
                serialNumber: re
            },
            {
                currentResponsiblePersonName: re
            },
            {
                currentResponsiblePersonEmployeeId: re
            }
        ];
    }
    const [items, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].find(filter).sort({
            createdAt: -1
        }).skip(skip).limit(limit).lean(),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].countDocuments(filter)
    ]);
    const assets = items.map((a)=>toAssetDTO(a, [], []));
    return {
        assets,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function createAsset(input) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssetInputSchema"].parse(input);
    const assetNo = data.assetNo && data.assetNo.trim() ? data.assetNo.trim() : await generateAssetNo();
    const dup = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].exists({
        assetNo
    });
    if (dup) {
        throw new Error("Asset number already exists");
    }
    const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].create({
        assetNo,
        name: data.name,
        type: data.type,
        department: data.department,
        serialNumber: data.serialNumber,
        imei1: data.imei1 || "",
        imei2: data.imei2 || "",
        purchasePrice: data.price,
        purchaseDate: data.purchaseDate,
        status: "Available"
    });
    return toAssetDTO(doc.toObject(), [], []);
}
async function getAsset(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].findOne({
        _id: id,
        isDeleted: false
    }).lean();
    if (!asset) return null;
    const handovers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handover"].find({
        assetId: id
    }).sort({
        date: 1
    }).lean();
    const returns = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReturnRecord"].find({
        assetId: id
    }).sort({
        date: 1
    }).lean();
    return toAssetDTO(asset, handovers, returns);
}
async function updateAsset(id, input) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssetInputSchema"].partial().parse(input);
    const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].findOne({
        _id: id,
        isDeleted: false
    });
    if (!asset) return null;
    if (data.assetNo && data.assetNo.trim() && data.assetNo.trim() !== asset.assetNo) {
        const dup = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].exists({
            assetNo: data.assetNo.trim(),
            _id: {
                $ne: id
            }
        });
        if (dup) throw new Error("Asset number already exists");
        asset.assetNo = data.assetNo.trim();
    }
    if (data.name !== undefined) asset.name = data.name;
    if (data.type !== undefined) asset.type = data.type;
    if (data.department !== undefined) asset.department = data.department;
    if (data.serialNumber !== undefined) asset.serialNumber = data.serialNumber;
    if (data.imei1 !== undefined) asset.imei1 = data.imei1 || "";
    if (data.imei2 !== undefined) asset.imei2 = data.imei2 || "";
    if (data.price !== undefined) asset.purchasePrice = data.price;
    if (data.purchaseDate !== undefined) asset.purchaseDate = data.purchaseDate;
    await asset.save();
    const handovers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handover"].find({
        assetId: id
    }).sort({
        date: 1
    }).lean();
    const returns = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReturnRecord"].find({
        assetId: id
    }).sort({
        date: 1
    }).lean();
    return toAssetDTO(asset.toObject(), handovers, returns);
}
async function softDeleteAsset(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].findOne({
        _id: id,
        isDeleted: false
    });
    if (!asset) return {
        ok: false,
        reason: "not_found"
    };
    const [hCount, rCount] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handover"].countDocuments({
            assetId: id
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReturnRecord"].countDocuments({
            assetId: id
        })
    ]);
    if (hCount > 0 || rCount > 0) {
        return {
            ok: false,
            reason: "has_history"
        };
    }
    asset.isDeleted = true;
    await asset.save();
    return {
        ok: true
    };
}
async function addHandoverToAsset(assetId, input) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HandoverSchema"].parse(input);
    const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].findOne({
        _id: assetId,
        isDeleted: false
    });
    if (!asset) throw new Error("Asset not found");
    const lastHandover = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handover"].findOne({
        assetId
    }).sort({
        date: -1,
        createdAt: -1
    });
    const lastReturn = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReturnRecord"].findOne({
        assetId
    }).sort({
        date: -1,
        createdAt: -1
    });
    const assigned = !!lastHandover && (!lastReturn || lastHandover.date > lastReturn.date || lastHandover.date === lastReturn.date && lastHandover.createdAt > lastReturn.createdAt);
    if (assigned) {
        throw new Error("Asset is currently assigned; return it before handover");
    }
    const handover = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handover"].create({
        assetId,
        date: data.date,
        personName: data.personName,
        employeeId: data.employeeId
    });
    asset.currentResponsiblePersonName = data.personName;
    asset.currentResponsiblePersonEmployeeId = data.employeeId;
    asset.status = "Assigned";
    await asset.save();
    return {
        id: String(handover._id),
        date: handover.date,
        personName: handover.personName,
        employeeId: handover.employeeId
    };
}
async function listHandovers(assetId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const items = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handover"].find({
        assetId
    }).sort({
        date: 1
    }).lean();
    return items.map((h)=>({
            id: String(h._id),
            date: h.date,
            personName: h.personName,
            employeeId: h.employeeId,
            createdAt: h.createdAt ? new Date(h.createdAt).toISOString() : ""
        }));
}
async function addReturnToAsset(assetId, input) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReturnSchema"].parse(input);
    const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Asset"].findOne({
        _id: assetId,
        isDeleted: false
    });
    if (!asset) throw new Error("Asset not found");
    const lastHandover = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Handover"].findOne({
        assetId
    }).sort({
        date: -1,
        createdAt: -1
    });
    const lastReturn = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReturnRecord"].findOne({
        assetId
    }).sort({
        date: -1,
        createdAt: -1
    });
    const assigned = !!lastHandover && (!lastReturn || lastHandover.date > lastReturn.date || lastHandover.date === lastReturn.date && lastHandover.createdAt > lastReturn.createdAt);
    if (!assigned) {
        throw new Error("Asset is not currently assigned; cannot return");
    }
    const ret = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReturnRecord"].create({
        assetId,
        date: data.date,
        reason: data.reason,
        collectedByName: data.collectedByName,
        collectedById: data.collectedById
    });
    asset.currentResponsiblePersonName = "";
    asset.currentResponsiblePersonEmployeeId = "";
    asset.status = "Returned";
    await asset.save();
    return {
        id: String(ret._id),
        date: ret.date,
        reason: ret.reason,
        collectedByName: ret.collectedByName,
        collectedById: ret.collectedById
    };
}
async function listReturns(assetId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
    const items = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReturnRecord"].find({
        assetId
    }).sort({
        date: 1
    }).lean();
    return items.map((r)=>({
            id: String(r._id),
            date: r.date,
            reason: r.reason,
            collectedByName: r.collectedByName,
            collectedById: r.collectedById,
            createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : ""
        }));
}
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
"[project]/src/lib/server/models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Asset",
    ()=>Asset,
    "Handover",
    ()=>Handover,
    "ReturnRecord",
    ()=>ReturnRecord,
    "Session",
    ()=>Session,
    "User",
    ()=>User
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
;
const Schema = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].Schema;
const model = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model;
const models = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models;
// ---------- User ----------
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [
            "admin",
            "user"
        ],
        default: "admin"
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
// ---------- Session ----------
const SessionSchema = new Schema({
    tokenHash: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
SessionSchema.index({
    expiresAt: 1
}, {
    expireAfterSeconds: 0
});
// ---------- Asset ----------
const AssetSchema = new Schema({
    assetNo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    serialNumber: {
        type: String,
        required: true,
        trim: true
    },
    imei1: {
        type: String,
        default: "",
        trim: true
    },
    imei2: {
        type: String,
        default: "",
        trim: true
    },
    purchasePrice: {
        type: Number,
        required: true,
        min: 0
    },
    purchaseDate: {
        type: String,
        required: true
    },
    currentResponsiblePersonName: {
        type: String,
        default: "",
        trim: true
    },
    currentResponsiblePersonEmployeeId: {
        type: String,
        default: "",
        trim: true
    },
    status: {
        type: String,
        enum: [
            "Available",
            "Assigned",
            "Returned"
        ],
        default: "Available"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
// ---------- Handover ----------
const HandoverSchema = new Schema({
    assetId: {
        type: Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
        index: true
    },
    date: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true,
        trim: true
    },
    employeeId: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
// ---------- Return ----------
const ReturnSchema = new Schema({
    assetId: {
        type: Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
        index: true
    },
    date: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    collectedByName: {
        type: String,
        required: true,
        trim: true
    },
    collectedById: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
const User = models.User || model("User", UserSchema);
const Session = models.Session || model("Session", SessionSchema);
const Asset = models.Asset || model("Asset", AssetSchema);
const Handover = models.Handover || model("Handover", HandoverSchema);
const ReturnRecord = models.ReturnRecord || model("ReturnRecord", ReturnSchema, "returns");
}),
];})()

//# sourceMappingURL=src_lib_1qcmegrstjjvk._.js.map