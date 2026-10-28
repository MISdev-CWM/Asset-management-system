"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { currentHolder, useAssets } from "@/lib/assets-store";
import { getCurrentUser } from "@/lib/auth-client";

export default function AssetsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const assets = useAssets();
  const [q, setQ] = useState("");

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.replace("/");
      else setReady(true);
    });
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const rows = assets.filter((a) =>
    [a.assetNo, a.name, a.type, a.department, a.plant, a.division, currentHolder(a)?.personName ?? ""].join(" ").toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell
      title="Current assets"
      actions={<Button asChild><Link href="/assets/new"><Plus className="h-4 w-4" />New asset</Link></Button>}
    >
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search assets..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Asset No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Plant</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Responsible person</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((a) => {
              const h = currentHolder(a);
              return (
                <TableRow key={a.id} className="cursor-pointer transition-colors hover:bg-muted/50" onClick={() => router.push(`/assets/${a.id}`)}>
                  <TableCell className="font-mono text-sm">{a.assetNo}</TableCell>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell><Badge variant="secondary">{a.type}</Badge></TableCell>
                  <TableCell>{a.department}</TableCell>
                  <TableCell>{a.plant || "-"}</TableCell>
                  <TableCell>{a.division || "-"}</TableCell>
                  <TableCell>{h ? h.personName : <span className="text-muted-foreground">Unassigned</span>}</TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">No assets found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}
