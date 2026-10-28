"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAssets } from "@/lib/assets-store";
import { getCurrentUser } from "@/lib/auth-client";

export default function CountsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const assets = useAssets();

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.replace("/");
      else setReady(true);
    });
  }, [router]);

  const countBy = (key: "department" | "plant" | "division") => {
    const map: Record<string, number> = {};
    for (const a of assets) {
      const v = (a[key] || "").trim() || "Unspecified";
      map[v] = (map[v] || 0) + 1;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  };

  const departmentCounts = useMemo(() => countBy("department"), [assets]);
  const plantCounts = useMemo(() => countBy("plant"), [assets]);
  const divisionCounts = useMemo(() => countBy("division"), [assets]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <AppShell title="Asset counts">
      <div className="mb-4 text-sm text-muted-foreground">
        Total assets: <span className="font-medium text-foreground">{assets.length}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <CountCard title="By department" entries={departmentCounts} />
        <CountCard title="By plant" entries={plantCounts} />
        <CountCard title="By division" entries={divisionCounts} />
      </div>
    </AppShell>
  );
}

function CountCard({ title, entries }: { title: string; entries: [string, number][] }) {
  return (
    <Card className="overflow-hidden rounded-2xl border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No assets.</p>
        ) : (
          <ul className="space-y-2">
            {entries.map(([label, count]) => (
              <li key={label} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm">
                <span className="font-medium">{label}</span>
                <Badge variant="secondary" className="rounded-full">{count}</Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}