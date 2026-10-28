import "@tanstack/react-start/server-only";

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;

// ---------- User ----------
const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "admin" },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

// ---------- Session ----------
const SessionSchema = new Schema(
  {
    tokenHash: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// ---------- Asset ----------
const AssetSchema = new Schema(
  {
    assetNo: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    serialNumber: { type: String, required: true, trim: true },
    imei1: { type: String, default: "", trim: true },
    imei2: { type: String, default: "", trim: true },
    purchasePrice: { type: Number, required: true, min: 0 },
    purchaseDate: { type: String, required: true },
    currentResponsiblePersonName: { type: String, default: "", trim: true },
    currentResponsiblePersonEmployeeId: { type: String, default: "", trim: true },
    status: { type: String, enum: ["Available", "Assigned", "Returned"], default: "Available" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

// ---------- Handover ----------
const HandoverSchema = new Schema(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "Asset", required: true, index: true },
    date: { type: String, required: true },
    personName: { type: String, required: true, trim: true },
    employeeId: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

// ---------- Return ----------
const ReturnSchema = new Schema(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "Asset", required: true, index: true },
    date: { type: String, required: true },
    reason: { type: String, required: true, trim: true },
    collectedByName: { type: String, required: true, trim: true },
    collectedById: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

export const User = models.User || model("User", UserSchema);
export const Session = models.Session || model("Session", SessionSchema);
export const Asset = models.Asset || model("Asset", AssetSchema);
export const Handover = models.Handover || model("Handover", HandoverSchema);
export const ReturnRecord = models.ReturnRecord || model("ReturnRecord", ReturnSchema, "returns");

export type AssetDoc = mongoose.InferSchemaType<typeof AssetSchema>;
