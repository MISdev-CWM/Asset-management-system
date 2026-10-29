import { useState, useEffect, useCallback } from "react";

export type Handover = { id?: string; date: string; personName: string; employeeId: string; createdAt?: string };
export type ReturnInfo = { id?: string; date: string; reason: string; collectedByName: string; collectedById: string; createdAt?: string };

export type Asset = {
  id: string;
  assetNo: string;
  name: string;
  type: string;
  department: string;
  plant: string;
  division: string;
  serialNumber: string;
  imei1: string;
  imei2: string;
  price: number;
  purchaseDate: string;
  status?: "Available" | "Assigned" | "Returned";
  currentResponsiblePersonName?: string;
  currentResponsiblePersonEmployeeId?: string;
  createdAt?: string;
  updatedAt?: string;
  handovers: Handover[];
  returns: ReturnInfo[];
};

export const ASSET_TYPES = ["Laptop", "Desktop", "Mobile Phone", "Tablet", "Monitor", "Printer", "Other"];
export const DEPARTMENTS = ["Admin", "Finance", "HR", "MIS", "Marketing"];
export const PLANTS = ["2001-Head office - Corporate Division",
   "2002-Export Division - HO/MK", 
   "2003-Scan Division - HO/MK",
   "2004-Scan Division - Horana Sunquick Plant",
   "2005-Scan Division - Horana Water Plant",
   "2006-Scan Division - Delish Plant",
   "2007-Sugar Division - HO/PG",
   "2008-Sugar Division - Bond",
   "2009-HHPC Division - HO/MK",
   "2010-IPD - HO/MK",
   "2011-IPD - Horana",
   "2012-R and AC - HO/MK",
   "2013-R and AC - Horana",
   "2014-Hempel Division - HO/MK",
   "2015-Hempel Division - Bond",
   "2016-Scan Division - Peanut Manufacturing",
   "2017-CDL NB Project Bonded WH",
   "2018-Sugar Division",
   "2019-Bearing and Power Transmission",
   "2101-Horana Plant",
   "2102-Narthupana Plant",
   "2201-Horana Plant",
   "2301-KVC - Hanwella",];
export const DIVISIONS = ["Corporate", "Export", "Scan", "Sugar", "HHPC", "IPD", "R and AC", "Hempel", "Bearing and Power Transmission", "Ceytra", "Ceymac", "KVC"];

let assets: Asset[] = [];
let loading = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...init });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function refreshAssets() {
  loading = true;
  emit();
  try {
    const data = await apiFetch("/api/assets?limit=1000");
    assets = (data?.assets ?? []).map(normalizeAsset);
  } catch (err) {
    console.error(err);
  } finally {
    loading = false;
    emit();
  }
}

function normalizeAsset(a: any): Asset {
  return {
    id: String(a.id),
    assetNo: a.assetNo,
    name: a.name,
    type: a.type,
    department: a.department,
    plant: a.plant || "",
    division: a.division || "",
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
    handovers: (a.handovers ?? []).map((h: any) => ({
      id: h.id,
      date: h.date,
      personName: h.personName,
      employeeId: h.employeeId,
      createdAt: h.createdAt,
    })),
    returns: (a.returns ?? []).map((r: any) => ({
      id: r.id,
      date: r.date,
      reason: r.reason,
      collectedByName: r.collectedByName,
      collectedById: r.collectedById,
      createdAt: r.createdAt,
    })),
  };
}

export function useAssets() {
  const [snapshot, setSnapshot] = useState<Asset[]>(assets);
  useEffect(() => {
    const unsub = subscribe(() => setSnapshot([...assets]));
    if (assets.length === 0 && !loading) {
      refreshAssets();
    }
    return unsub;
  }, []);
  return snapshot;
}

export function useAssetsLoading() {
  const [snap, setSnap] = useState(loading);
  useEffect(() => {
    const unsub = subscribe(() => setSnap(loading));
    return unsub;
  }, []);
  return snap;
}
export async function getAsset(id: string): Promise<Asset | null> {
  try {
    const data = await apiFetch(`/api/assets/${id}`);
    return normalizeAsset(data);
  } catch {
    return null;
  }
}

export function useAsset(id: string) {
  const [asset, setAsset] = useState<Asset | null>(null);
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
  return { asset, isLoading, refresh };
}

export function currentHolder(a: Asset): Handover | undefined {
  const lastH = [...a.handovers]
    .sort((x, y) => {
      if (x.date !== y.date) return x.date.localeCompare(y.date);
      return (x.createdAt || "").localeCompare(y.createdAt || "");
    })
    .at(-1);
  if (!lastH) return undefined;
  const lastR = [...a.returns]
    .sort((x, y) => {
      if (x.date !== y.date) return x.date.localeCompare(y.date);
      return (x.createdAt || "").localeCompare(y.createdAt || "");
    })
    .at(-1);
  const assigned =
    !lastR ||
    lastH.date > lastR.date ||
    (lastH.date === lastR.date && (lastH.createdAt || "") > (lastR.createdAt || ""));
  return assigned ? lastH : undefined;
}

export async function addAsset(data: any) {
  const payload = {
    assetNo: data.assetNo,
    name: data.name,
    type: data.type,
    department: data.department,
    plant: data.plant,
    division: data.division,
    serialNumber: data.serialNumber,
    imei1: data.imei1,
    imei2: data.imei2,
    price: Number(data.price) || 0,
    purchaseDate: data.purchaseDate,
  };
  const asset = await apiFetch("/api/assets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  await refreshAssets();
  return String(asset.id);
}

export async function updateAsset(id: string, data: any) {
  const asset = await apiFetch(`/api/assets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await refreshAssets();
  return asset;
}

export function nextAssetNo() {
  return `AST-${String(assets.length + 1).padStart(4, "0")}`;
}

export async function addHandover(id: string, h: Handover) {
  await apiFetch(`/api/assets/${id}/handovers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(h),
  });
  await refreshAssets();
}

export async function addReturn(id: string, r: ReturnInfo) {
  await apiFetch(`/api/assets/${id}/returns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(r),
  });
  await refreshAssets();
}

export async function deleteAsset(id: string) {
  await apiFetch(`/api/assets/${id}`, { method: "DELETE" });
  await refreshAssets();
}

