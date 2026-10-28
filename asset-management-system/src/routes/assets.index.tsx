import { getCurrentUser } from "@/lib/auth-client";
import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { currentHolder, useAssets } from "@/lib/assets-store";

export const Route = createFileRoute("/assets/")({
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (!user) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Current assets — AssetTrack" },
      { name: "description", content: "All current company assets with type, department and responsible person." },
      { property: "og:title", content: "Current assets — AssetTrack" },
      { property: "og:description", content: "All current company assets at a glance." },
    ],
  }),
  component: AssetsPage,
});

function AssetsPage() {
  const assets = useAssets();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const rows = assets.filter((a) =>
    [a.assetNo, a.name, a.type, a.department, currentHolder(a)?.personName ?? ""].join(" ").toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <AppShell
      title="Current assets"
      actions={<Button asChild><Link to="/assets/new"><Plus className="h-4 w-4" />New asset</Link></Button>}
    >
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search assets…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Responsible person</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((a) => {
              const h = currentHolder(a);
              return (
                <TableRow key={a.id} className="cursor-pointer" onClick={() => navigate({ to: "/assets/$id", params: { id: a.id } })}>
                  <TableCell className="font-mono text-sm">{a.assetNo}</TableCell>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell><Badge variant="secondary">{a.type}</Badge></TableCell>
                  <TableCell>{a.department}</TableCell>
                  <TableCell>{h ? h.personName : <span className="text-muted-foreground">Unassigned</span>}</TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={5} className="py-10 text-center text-muted-foreground">No assets found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}
