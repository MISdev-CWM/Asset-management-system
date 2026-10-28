"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Trash2, UserPlus, Undo2 } from "lucide-react";
import { AppShell, Field } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { addHandover, addReturn, currentHolder, deleteAsset, useAsset } from "@/lib/assets-store";
import { getCurrentUser } from "@/lib/auth-client";

const today = () => new Date().toISOString().slice(0, 10);

export default function AssetDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const { asset, isLoading, refresh } = useAsset(id);
  const [ready, setReady] = useState(false);
  const [dialog, setDialog] = useState<null | "handover" | "return" | "delete">(null);

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.replace("/");
      else setReady(true);
    });
  }, [router]);

  if (!ready || isLoading) {
    return (
      <AppShell title="Loading…">
        <p className="text-sm text-muted-foreground">Loading asset…</p>
      </AppShell>
    );
  }
  if (!asset) {
    return (
      <AppShell title="Asset not found">
        <Button asChild variant="outline"><Link href="/assets"><ArrowLeft className="h-4 w-4" />Back to assets</Link></Button>
      </AppShell>
    );
  }
  const holder = currentHolder(asset);
  const history = [
    ...asset.handovers.map((h) => ({ kind: "Handover" as const, date: h.date, text: `Handed to ${h.personName} (${h.employeeId})` })),
    ...asset.returns.map((r) => ({ kind: "Return" as const, date: r.date, text: `Collected by ${r.collectedByName} (${r.collectedById}) — ${r.reason}` })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <AppShell
      title={asset.name}
      actions={
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild><Link href="/assets"><ArrowLeft className="h-4 w-4" />Back</Link></Button>
          <Button onClick={() => setDialog("handover")} disabled={!!holder}><UserPlus className="h-4 w-4" />Handover</Button>
          <Button variant="secondary" onClick={() => setDialog("return")} disabled={!holder}><Undo2 className="h-4 w-4" />Return</Button>
          <Button variant="destructive" onClick={() => setDialog("delete")}><Trash2 className="h-4 w-4" />Delete</Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <Info label="Asset No"><span className="font-mono">{asset.assetNo}</span></Info>
            <Info label="Type"><Badge variant="secondary">{asset.type}</Badge></Info>
            <Info label="Name">{asset.name}</Info>
            <Info label="Department">{asset.department}</Info>
            <Info label="Serial number">{asset.serialNumber || "—"}</Info>
            <Info label="Price">{asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Info>
            <Info label="IMEI 1">{asset.imei1 || "—"}</Info>
            <Info label="IMEI 2">{asset.imei2 || "—"}</Info>
            <Info label="Purchase date">{asset.purchaseDate}</Info>
            <Info label="Responsible person">
              {holder ? `${holder.personName} (${holder.employeeId})` : <span className="text-muted-foreground">Unassigned</span>}
            </Info>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>History</CardTitle></CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">No handovers or returns yet.</p>
            ) : (
              <ol className="space-y-4">
                {history.map((h, i) => (
                  <li key={i} className="border-l-2 pl-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant={h.kind === "Handover" ? "default" : "outline"}>{h.kind}</Badge>
                      <span className="text-muted-foreground">{h.date}</span>
                    </div>
                    <p className="mt-1 text-sm">{h.text}</p>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>
      </div>

      <HandoverDialog open={dialog === "handover"} onClose={() => setDialog(null)} onSave={async (h) => {
        try {
          await addHandover(asset.id, h);
          toast.success("Handover recorded");
          await refresh();
          setDialog(null);
        } catch (err: any) {
          toast.error(err?.message || "Failed to record handover");
        }
      }} />
      <ReturnDialog open={dialog === "return"} onClose={() => setDialog(null)} onSave={async (r) => {
        try {
          await addReturn(asset.id, r);
          toast.success("Return recorded");
          await refresh();
          setDialog(null);
        } catch (err: any) {
          toast.error(err?.message || "Failed to record return");
        }
      }} />

      <AlertDialog open={dialog === "delete"} onOpenChange={(o) => !o && setDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this asset?</AlertDialogTitle>
            <AlertDialogDescription>
              {asset.assetNo} — {asset.name} and its handover/return history will be permanently removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async () => {
                try {
                  await deleteAsset(asset.id);
                  toast.success("Asset deleted");
                  router.push("/assets");
                } catch (err: any) {
                  toast.error(err?.message || "Failed to delete asset");
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}

function Info({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{children}</div>
    </div>
  );
}

function HandoverDialog({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (h: { date: string; personName: string; employeeId: string }) => void }) {
  const [f, setF] = useState({ date: today(), personName: "", employeeId: "" });
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Handover details</DialogTitle>
          <DialogDescription>Assign this asset to a responsible person.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(f); setF({ date: today(), personName: "", employeeId: "" }); onClose(); }}>
          <Field label="Handover date"><Input type="date" required value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></Field>
          <Field label="Responsible person's name"><Input required value={f.personName} onChange={(e) => setF({ ...f, personName: e.target.value })} /></Field>
          <Field label="Employee ID"><Input required value={f.employeeId} onChange={(e) => setF({ ...f, employeeId: e.target.value })} placeholder="EMP-0000" /></Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save handover</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ReturnDialog({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (r: { date: string; reason: string; collectedByName: string; collectedById: string }) => void }) {
  const empty = { date: today(), reason: "", collectedByName: "", collectedById: "" };
  const [f, setF] = useState(empty);
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Return details</DialogTitle>
          <DialogDescription>Record the return of this asset.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(f); setF(empty); onClose(); }}>
          <Field label="Return date"><Input type="date" required value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></Field>
          <Field label="Return reason"><Textarea required value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Collected by (name)"><Input required value={f.collectedByName} onChange={(e) => setF({ ...f, collectedByName: e.target.value })} /></Field>
            <Field label="Collected by (ID)"><Input required value={f.collectedById} onChange={(e) => setF({ ...f, collectedById: e.target.value })} /></Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save return</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}