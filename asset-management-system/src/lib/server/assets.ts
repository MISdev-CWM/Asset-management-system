import "server-only";

import { connectDb } from "./db";
import { Asset, Handover, ReturnRecord } from "./models";
import { AssetInputSchema, HandoverSchema, ReturnSchema } from "../schemas";
import { z } from "zod";

export type AssetDTO = {
  id: string;
  assetNo: string;
  name: string;
  type: string;
  department: string;
  serialNumber: string;
  imei1: string;
  imei2: string;
  price: number;
  purchaseDate: string;
  currentResponsiblePersonName: string;
  currentResponsiblePersonEmployeeId: string;
  status: "Available" | "Assigned" | "Returned";
  createdAt: string;
  updatedAt: string;
  handovers: { id: string; date: string; personName: string; employeeId: string; createdAt: string }[];
  returns: { id: string; date: string; reason: string; collectedByName: string; collectedById: string; createdAt: string }[];
};

function toAssetDTO(asset: any, handovers: any[] = [], returns: any[] = []): AssetDTO {
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
    handovers: handovers.map((h) => ({
      id: String(h._id),
      date: h.date,
      personName: h.personName,
      employeeId: h.employeeId,
      createdAt: h.createdAt ? new Date(h.createdAt).toISOString() : "",
    })),
    returns: returns.map((r) => ({
      id: String(r._id),
      date: r.date,
      reason: r.reason,
      collectedByName: r.collectedByName,
      collectedById: r.collectedById,
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : "",
    })),
  };
}

export async function generateAssetNo(): Promise<string> {
  await connectDb();
  const count = await Asset.countDocuments({});
  let n = count + 1;
  while (true) {
    const candidate = `AST-${String(n).padStart(4, "0")}`;
    const exists = await Asset.exists({ assetNo: candidate });
    if (!exists) return candidate;
    n += 1;
  }
}

export async function listAssets(params: { q?: string; page?: number; limit?: number }) {
  await connectDb();
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 50));
  const skip = (page - 1) * limit;

  const filter: any = { isDeleted: false };
  if (params.q && params.q.trim()) {
    const re = new RegExp(params.q.trim().replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"), "i");
    filter.$or = [
      { assetNo: re },
      { name: re },
      { type: re },
      { department: re },
      { serialNumber: re },
      { currentResponsiblePersonName: re },
      { currentResponsiblePersonEmployeeId: re },
    ];
  }

  const [items, total] = await Promise.all([
    Asset.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Asset.countDocuments(filter),
  ]);

  const assets = items.map((a: any) => toAssetDTO(a, [], []));
  return { assets, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function createAsset(input: unknown) {
  await connectDb();
  const data = AssetInputSchema.parse(input);
  const assetNo = data.assetNo && data.assetNo.trim() ? data.assetNo.trim() : await generateAssetNo();

  const dup = await Asset.exists({ assetNo });
  if (dup) {
    throw new Error("Asset number already exists");
  }

  const doc = await Asset.create({
    assetNo,
    name: data.name,
    type: data.type,
    department: data.department,
    serialNumber: data.serialNumber,
    imei1: data.imei1 || "",
    imei2: data.imei2 || "",
    purchasePrice: data.price,
    purchaseDate: data.purchaseDate,
    status: "Available",
  });

  return toAssetDTO(doc.toObject(), [], []);
}
export async function getAsset(id: string) {
  await connectDb();
  const asset = await Asset.findOne({ _id: id, isDeleted: false }).lean();
  if (!asset) return null;
  const handovers = await Handover.find({ assetId: id }).sort({ date: 1 }).lean();
  const returns = await ReturnRecord.find({ assetId: id }).sort({ date: 1 }).lean();
  return toAssetDTO(asset, handovers, returns);
}

export async function updateAsset(id: string, input: unknown) {
  await connectDb();
  const data = AssetInputSchema.partial().parse(input);
  const asset = await Asset.findOne({ _id: id, isDeleted: false });
  if (!asset) return null;

  if (data.assetNo && data.assetNo.trim() && data.assetNo.trim() !== asset.assetNo) {
    const dup = await Asset.exists({ assetNo: data.assetNo.trim(), _id: { $ne: id } });
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
  const handovers = await Handover.find({ assetId: id }).sort({ date: 1 }).lean();
  const returns = await ReturnRecord.find({ assetId: id }).sort({ date: 1 }).lean();
  return toAssetDTO(asset.toObject(), handovers, returns);
}

export async function softDeleteAsset(id: string) {
  await connectDb();
  const asset = await Asset.findOne({ _id: id, isDeleted: false });
  if (!asset) return { ok: false, reason: "not_found" };

  const [hCount, rCount] = await Promise.all([
    Handover.countDocuments({ assetId: id }),
    ReturnRecord.countDocuments({ assetId: id }),
  ]);
  if (hCount > 0 || rCount > 0) {
    return { ok: false, reason: "has_history" };
  }

  asset.isDeleted = true;
  await asset.save();
  return { ok: true };
}

export async function addHandoverToAsset(assetId: string, input: unknown) {
  await connectDb();
  const data = HandoverSchema.parse(input);
  const asset = await Asset.findOne({ _id: assetId, isDeleted: false });
  if (!asset) throw new Error("Asset not found");

  const lastHandover = await Handover.findOne({ assetId }).sort({ date: -1, createdAt: -1 });
  const lastReturn = await ReturnRecord.findOne({ assetId }).sort({ date: -1, createdAt: -1 });
  const assigned =
    !!lastHandover && (!lastReturn || lastHandover.date > lastReturn.date || (lastHandover.date === lastReturn.date && lastHandover.createdAt > lastReturn.createdAt));
  if (assigned) {
    throw new Error("Asset is currently assigned; return it before handover");
  }

  const handover = await Handover.create({
    assetId,
    date: data.date,
    personName: data.personName,
    employeeId: data.employeeId,
  });

  asset.currentResponsiblePersonName = data.personName;
  asset.currentResponsiblePersonEmployeeId = data.employeeId;
  asset.status = "Assigned";
  await asset.save();

  return {
    id: String(handover._id),
    date: handover.date,
    personName: handover.personName,
    employeeId: handover.employeeId,
  };
}

export async function listHandovers(assetId: string) {
  await connectDb();
  const items = await Handover.find({ assetId }).sort({ date: 1 }).lean();
  return items.map((h: any) => ({
    id: String(h._id),
    date: h.date,
    personName: h.personName,
    employeeId: h.employeeId,
    createdAt: h.createdAt ? new Date(h.createdAt).toISOString() : "",
  }));
}

export async function addReturnToAsset(assetId: string, input: unknown) {
  await connectDb();
  const data = ReturnSchema.parse(input);
  const asset = await Asset.findOne({ _id: assetId, isDeleted: false });
  if (!asset) throw new Error("Asset not found");

  const lastHandover = await Handover.findOne({ assetId }).sort({ date: -1, createdAt: -1 });
  const lastReturn = await ReturnRecord.findOne({ assetId }).sort({ date: -1, createdAt: -1 });
  const assigned =
    !!lastHandover && (!lastReturn || lastHandover.date > lastReturn.date || (lastHandover.date === lastReturn.date && lastHandover.createdAt > lastReturn.createdAt));
  if (!assigned) {
    throw new Error("Asset is not currently assigned; cannot return");
  }

  const ret = await ReturnRecord.create({
    assetId,
    date: data.date,
    reason: data.reason,
    collectedByName: data.collectedByName,
    collectedById: data.collectedById,
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
    collectedById: ret.collectedById,
  };
}

export async function listReturns(assetId: string) {
  await connectDb();
  const items = await ReturnRecord.find({ assetId }).sort({ date: 1 }).lean();
  return items.map((r: any) => ({
    id: String(r._id),
    date: r.date,
    reason: r.reason,
    collectedByName: r.collectedByName,
    collectedById: r.collectedById,
    createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : "",
  }));
}

