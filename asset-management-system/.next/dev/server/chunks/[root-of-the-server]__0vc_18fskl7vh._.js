module.exports = [
"[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("mongoose-8b99e611e7552af3", () => require("mongoose-8b99e611e7552af3"));

module.exports = mod;
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
    plant: {
        type: String,
        default: "",
        trim: true
    },
    division: {
        type: String,
        default: "",
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0vc_18fskl7vh._.js.map