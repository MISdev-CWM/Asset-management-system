import { getCurrentUser } from "@/lib/auth-client";
import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, Field } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ASSET_TYPES, DEPARTMENTS, addAsset, nextAssetNo } from "@/lib/assets-store";

export const Route = createFileRoute("/assets/new")({
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (!user) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "New asset — AssetTrack" },
      { name: "description", content: "Register a new company asset." },
      { property: "og:title", content: "New asset — AssetTrack" },
      { property: "og:description", content: "Register a new company asset." },
    ],
  }),
  component: NewAsset,
});

function NewAsset() {
  const navigate = useNavigate();
  const [f, setF] = useState({ assetNo: nextAssetNo(), type: "", name: "", department: "", serialNumber: "", imei1: "", imei2: "", price: "", purchaseDate: "" });
  const [submitting, setSubmitting] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.type || !f.department) {
      toast.error("Please choose a type and department");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      const id = await addAsset({ ...f, price: Number(f.price) || 0 });
      toast.success("Asset created");
      navigate({ to: "/assets/$id", params: { id } });
    } catch (err: any) {
      toast.error(err?.message || "Failed to create asset");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <AppShell title="New asset">
      <Card className="max-w-3xl">
        <CardContent className="pt-6">
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={onSubmit}
          >
            <Field label="Asset No"><Input required value={f.assetNo} onChange={(e) => set("assetNo")(e.target.value)} /></Field>
            <Field label="Type">
              <Select value={f.type} onValueChange={set("type")}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>{ASSET_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Name"><Input required value={f.name} onChange={(e) => set("name")(e.target.value)} placeholder="e.g. Dell Latitude 5440" /></Field>
            <Field label="Department">
              <Select value={f.department} onValueChange={set("department")}>
                <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Serial number"><Input required value={f.serialNumber} onChange={(e) => set("serialNumber")(e.target.value)} /></Field>
            <Field label="Price"><Input type="number" min="0" step="0.01" value={f.price} onChange={(e) => set("price")(e.target.value)} /></Field>
            <Field label="IMEI number 1"><Input inputMode="numeric" value={f.imei1} onChange={(e) => set("imei1")(e.target.value)} /></Field>
            <Field label="IMEI number 2"><Input inputMode="numeric" value={f.imei2} onChange={(e) => set("imei2")(e.target.value)} /></Field>
            <Field label="Purchase date"><Input type="date" required value={f.purchaseDate} onChange={(e) => set("purchaseDate")(e.target.value)} /></Field>
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => navigate({ to: "/assets" })}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create asset"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}
