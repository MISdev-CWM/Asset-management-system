import mongoose from "mongoose";
//#region src/lib/server/models.ts
var Schema = mongoose.Schema;
var model = mongoose.model;
var models = mongoose.models;
var UserSchema = new Schema({
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
		enum: ["admin", "user"],
		default: "admin"
	}
}, { timestamps: {
	createdAt: "createdAt",
	updatedAt: "updatedAt"
} });
var SessionSchema = new Schema({
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
}, { timestamps: {
	createdAt: "createdAt",
	updatedAt: "updatedAt"
} });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
var AssetSchema = new Schema({
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
}, { timestamps: {
	createdAt: "createdAt",
	updatedAt: "updatedAt"
} });
var HandoverSchema = new Schema({
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
}, { timestamps: {
	createdAt: "createdAt",
	updatedAt: "updatedAt"
} });
var ReturnSchema = new Schema({
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
}, { timestamps: {
	createdAt: "createdAt",
	updatedAt: "updatedAt"
} });
var User = models.User || model("User", UserSchema);
var Session = models.Session || model("Session", SessionSchema);
var Asset = models.Asset || model("Asset", AssetSchema);
var Handover = models.Handover || model("Handover", HandoverSchema);
var ReturnRecord = models.ReturnRecord || model("ReturnRecord", ReturnSchema, "returns");
//#endregion
export { Asset, Handover, ReturnRecord, Session, User };
