import { useEffect, useState } from "react";
//#region src/lib/assets-store.ts
var ASSET_TYPES = [
	"Laptop",
	"Desktop",
	"Mobile Phone",
	"Tablet",
	"Monitor",
	"Printer",
	"Other"
];
var DEPARTMENTS = [
	"IT",
	"Finance",
	"HR",
	"Operations",
	"Sales",
	"Marketing"
];
var assets = [];
var loading = false;
var listeners = /* @__PURE__ */ new Set();
var emit = () => listeners.forEach((l) => l());
var subscribe = (l) => {
	listeners.add(l);
	return () => {
		listeners.delete(l);
	};
};
async function apiFetch(path, init) {
	const res = await fetch(path, {
		credentials: "include",
		...init
	});
	if (!res.ok) {
		let msg = `Request failed (${res.status})`;
		try {
			const data = await res.json();
			if (data?.error) msg = data.error;
		} catch {}
		throw new Error(msg);
	}
	if (res.status === 204) return null;
	return res.json();
}
async function refreshAssets() {
	loading = true;
	emit();
	try {
		assets = ((await apiFetch("/api/assets?limit=1000"))?.assets ?? []).map(normalizeAsset);
	} catch (err) {
		console.error(err);
	} finally {
		loading = false;
		emit();
	}
}
function normalizeAsset(a) {
	return {
		id: String(a.id),
		assetNo: a.assetNo,
		name: a.name,
		type: a.type,
		department: a.department,
		serialNumber: a.serialNumber,
		imei1: a.imei1 || "",
		imei2: a.imei2 || "",
		price: Number(a.price) || 0,
		purchaseDate: a.purchaseDate,
		status: a.status,
		currentResponsiblePersonName: a.currentResponsiblePersonName,
		currentResponsiblePersonEmployeeId: a.currentResponsiblePersonEmployeeId,
		createdAt: a.createdAt,
		updatedAt: a.updatedAt,
		handovers: (a.handovers ?? []).map((h) => ({
			id: h.id,
			date: h.date,
			personName: h.personName,
			employeeId: h.employeeId,
			createdAt: h.createdAt
		})),
		returns: (a.returns ?? []).map((r) => ({
			id: r.id,
			date: r.date,
			reason: r.reason,
			collectedByName: r.collectedByName,
			collectedById: r.collectedById,
			createdAt: r.createdAt
		}))
	};
}
function useAssets() {
	const [snapshot, setSnapshot] = useState(assets);
	useEffect(() => {
		const unsub = subscribe(() => setSnapshot([...assets]));
		if (assets.length === 0 && !loading) refreshAssets();
		return unsub;
	}, []);
	return snapshot;
}
async function getAsset(id) {
	try {
		return normalizeAsset(await apiFetch(`/api/assets/${id}`));
	} catch {
		return null;
	}
}
function useAsset(id) {
	const [asset, setAsset] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const refresh = async () => {
		setIsLoading(true);
		const a = await getAsset(id);
		setAsset(a);
		setIsLoading(false);
	};
	useEffect(() => {
		let active = true;
		(async () => {
			setIsLoading(true);
			const a = await getAsset(id);
			if (active) {
				setAsset(a);
				setIsLoading(false);
			}
		})();
		return () => {
			active = false;
		};
	}, [id]);
	return {
		asset,
		isLoading,
		refresh
	};
}
function currentHolder(a) {
	const lastH = a.handovers.at(-1);
	if (!lastH) return void 0;
	const lastR = a.returns.at(-1);
	if (lastR && lastR.date >= lastH.date) return void 0;
	return lastH;
}
async function addAsset(data) {
	const payload = {
		assetNo: data.assetNo,
		name: data.name,
		type: data.type,
		department: data.department,
		serialNumber: data.serialNumber,
		imei1: data.imei1,
		imei2: data.imei2,
		price: Number(data.price) || 0,
		purchaseDate: data.purchaseDate
	};
	const asset = await apiFetch("/api/assets", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
	await refreshAssets();
	return String(asset.id);
}
function nextAssetNo() {
	return `AST-${String(assets.length + 1).padStart(4, "0")}`;
}
async function addHandover(id, h) {
	await apiFetch(`/api/assets/${id}/handovers`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(h)
	});
	await refreshAssets();
}
async function addReturn(id, r) {
	await apiFetch(`/api/assets/${id}/returns`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(r)
	});
	await refreshAssets();
}
async function deleteAsset(id) {
	await apiFetch(`/api/assets/${id}`, { method: "DELETE" });
	await refreshAssets();
}
//#endregion
export { addReturn as a, nextAssetNo as c, addHandover as i, useAsset as l, DEPARTMENTS as n, currentHolder as o, addAsset as r, deleteAsset as s, ASSET_TYPES as t, useAssets as u };
