import { AssetInputSchema, HandoverSchema, ReturnSchema } from "./schemas-B94vF4vi.js";
import { connectDb } from "./db-DXe_0mj0.js";
import { Asset, Handover, ReturnRecord } from "./models-BWSleU6g.js";
//#region src/lib/server/assets.ts
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
		handovers: handovers.map((h) => ({
			id: String(h._id),
			date: h.date,
			personName: h.personName,
			employeeId: h.employeeId,
			createdAt: h.createdAt ? new Date(h.createdAt).toISOString() : ""
		})),
		returns: returns.map((r) => ({
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
	await connectDb();
	let n = await Asset.countDocuments({}) + 1;
	while (true) {
		const candidate = `AST-${String(n).padStart(4, "0")}`;
		if (!await Asset.exists({ assetNo: candidate })) return candidate;
		n += 1;
	}
}
async function listAssets(params) {
	await connectDb();
	const page = Math.max(1, params.page || 1);
	const limit = Math.min(100, Math.max(1, params.limit || 50));
	const skip = (page - 1) * limit;
	const filter = { isDeleted: false };
	if (params.q && params.q.trim()) {
		const re = new RegExp(params.q.trim().replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"), "i");
		filter.$or = [
			{ assetNo: re },
			{ name: re },
			{ type: re },
			{ department: re },
			{ serialNumber: re },
			{ currentResponsiblePersonName: re },
			{ currentResponsiblePersonEmployeeId: re }
		];
	}
	const [items, total] = await Promise.all([Asset.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(), Asset.countDocuments(filter)]);
	return {
		assets: items.map((a) => toAssetDTO(a, [], [])),
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit)
	};
}
async function createAsset(input) {
	await connectDb();
	const data = AssetInputSchema.parse(input);
	const assetNo = data.assetNo && data.assetNo.trim() ? data.assetNo.trim() : await generateAssetNo();
	if (await Asset.exists({ assetNo })) throw new Error("Asset number already exists");
	return toAssetDTO((await Asset.create({
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
	})).toObject(), [], []);
}
async function getAsset(id) {
	await connectDb();
	const asset = await Asset.findOne({
		_id: id,
		isDeleted: false
	}).lean();
	if (!asset) return null;
	return toAssetDTO(asset, await Handover.find({ assetId: id }).sort({ date: 1 }).lean(), await ReturnRecord.find({ assetId: id }).sort({ date: 1 }).lean());
}
async function updateAsset(id, input) {
	await connectDb();
	const data = AssetInputSchema.partial().parse(input);
	const asset = await Asset.findOne({
		_id: id,
		isDeleted: false
	});
	if (!asset) return null;
	if (data.assetNo && data.assetNo.trim() && data.assetNo.trim() !== asset.assetNo) {
		if (await Asset.exists({
			assetNo: data.assetNo.trim(),
			_id: { $ne: id }
		})) throw new Error("Asset number already exists");
		asset.assetNo = data.assetNo.trim();
	}
	if (data.name !== void 0) asset.name = data.name;
	if (data.type !== void 0) asset.type = data.type;
	if (data.department !== void 0) asset.department = data.department;
	if (data.serialNumber !== void 0) asset.serialNumber = data.serialNumber;
	if (data.imei1 !== void 0) asset.imei1 = data.imei1 || "";
	if (data.imei2 !== void 0) asset.imei2 = data.imei2 || "";
	if (data.price !== void 0) asset.purchasePrice = data.price;
	if (data.purchaseDate !== void 0) asset.purchaseDate = data.purchaseDate;
	await asset.save();
	const handovers = await Handover.find({ assetId: id }).sort({ date: 1 }).lean();
	const returns = await ReturnRecord.find({ assetId: id }).sort({ date: 1 }).lean();
	return toAssetDTO(asset.toObject(), handovers, returns);
}
async function softDeleteAsset(id) {
	await connectDb();
	const asset = await Asset.findOne({
		_id: id,
		isDeleted: false
	});
	if (!asset) return {
		ok: false,
		reason: "not_found"
	};
	const [hCount, rCount] = await Promise.all([Handover.countDocuments({ assetId: id }), ReturnRecord.countDocuments({ assetId: id })]);
	if (hCount > 0 || rCount > 0) return {
		ok: false,
		reason: "has_history"
	};
	asset.isDeleted = true;
	await asset.save();
	return { ok: true };
}
async function addHandoverToAsset(assetId, input) {
	await connectDb();
	const data = HandoverSchema.parse(input);
	const asset = await Asset.findOne({
		_id: assetId,
		isDeleted: false
	});
	if (!asset) throw new Error("Asset not found");
	const lastHandover = await Handover.findOne({ assetId }).sort({
		date: -1,
		createdAt: -1
	});
	const lastReturn = await ReturnRecord.findOne({ assetId }).sort({
		date: -1,
		createdAt: -1
	});
	if (!!lastHandover && (!lastReturn || lastHandover.date > lastReturn.date || lastHandover.date === lastReturn.date && lastHandover.createdAt > lastReturn.createdAt)) throw new Error("Asset is currently assigned; return it before handover");
	const handover = await Handover.create({
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
	await connectDb();
	return (await Handover.find({ assetId }).sort({ date: 1 }).lean()).map((h) => ({
		id: String(h._id),
		date: h.date,
		personName: h.personName,
		employeeId: h.employeeId,
		createdAt: h.createdAt ? new Date(h.createdAt).toISOString() : ""
	}));
}
async function addReturnToAsset(assetId, input) {
	await connectDb();
	const data = ReturnSchema.parse(input);
	const asset = await Asset.findOne({
		_id: assetId,
		isDeleted: false
	});
	if (!asset) throw new Error("Asset not found");
	const lastHandover = await Handover.findOne({ assetId }).sort({
		date: -1,
		createdAt: -1
	});
	const lastReturn = await ReturnRecord.findOne({ assetId }).sort({
		date: -1,
		createdAt: -1
	});
	if (!(!!lastHandover && (!lastReturn || lastHandover.date > lastReturn.date || lastHandover.date === lastReturn.date && lastHandover.createdAt > lastReturn.createdAt))) throw new Error("Asset is not currently assigned; cannot return");
	const ret = await ReturnRecord.create({
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
	await connectDb();
	return (await ReturnRecord.find({ assetId }).sort({ date: 1 }).lean()).map((r) => ({
		id: String(r._id),
		date: r.date,
		reason: r.reason,
		collectedByName: r.collectedByName,
		collectedById: r.collectedById,
		createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : ""
	}));
}
//#endregion
export { addHandoverToAsset, addReturnToAsset, createAsset, getAsset, listAssets, listHandovers, listReturns, softDeleteAsset, updateAsset };
