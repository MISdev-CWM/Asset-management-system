"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { currentHolder, useAssets, ASSET_TYPES, DEPARTMENTS, PLANTS, DIVISIONS } from "@/lib/assets-store";
import { getCurrentUser } from "@/lib/auth-client";

type AssignmentFilter = "all" | "assigned" | "unassigned";

export default function AssetsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const assets = useAssets();
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [plantFilter, setPlantFilter] = useState("");
  const [assignmentFilter, setAssignmentFilter] = useState<AssignmentFilter>("all");

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.replace("/");
      else setReady(true);
    });
  }, [router]);

  const typeOptions = useMemo(
    () => Array.from(new Set([...ASSET_TYPES, ...assets.map((a) => a.type)])).filter(Boolean).sort(),
    [assets],
  );
  const divisionOptions = useMemo(
    () => Array.from(new Set([...DIVISIONS, ...assets.map((a) => a.division)])).filter(Boolean).sort(),
    [assets],
  );
  const departmentOptions = useMemo(
    () => Array.from(new Set([...DEPARTMENTS, ...assets.map((a) => a.department)])).filter(Boolean).sort(),
    [assets],
  );
  const plantOptions = useMemo(
    () => Array.from(new Set([...PLANTS, ...assets.map((a) => a.plant)])).filter(Boolean).sort(),
    [assets],
  );

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const rows = assets.filter((a) => {
    const textMatch = [a.assetNo, a.name, a.type, a.department, a.plant, a.division, currentHolder(a)?.personName ?? "", a.currentResponsiblePersonName ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase());
    const typeMatch = !typeFilter || a.type === typeFilter;
    const divisionMatch = !divisionFilter || a.division === divisionFilter;
    const departmentMatch = !departmentFilter || a.department === departmentFilter;
    const plantMatch = !plantFilter || a.plant === plantFilter;
    const assigned = a.status === "Assigned" || !!a.currentResponsiblePersonName;
    const assignmentMatch =
      assignmentFilter === "all" ||
      (assignmentFilter === "assigned" ? assigned : !assigned);
    return textMatch && typeMatch && divisionMatch && departmentMatch && plantMatch && assignmentMatch;
  });

  const resetFilters = () => {
    setQ("");
    setTypeFilter("");
    setDivisionFilter("");
    setDepartmentFilter("");
    setPlantFilter("");
    setAssignmentFilter("all");
  };

  return (
    <AppShell
      title="Current assets"
      actions={<Button asChild><Link href="/assets/new"><Plus className="h-4 w-4" />New asset</Link></Button>}
    >
      <div className="mb-4 flex flex-col gap-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search assets..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect label="Type" value={typeFilter} onChange={setTypeFilter} options={typeOptions} />
          <FilterSelect label="Division" value={divisionFilter} onChange={setDivisionFilter} options={divisionOptions} />
          <FilterSelect label="Department" value={departmentFilter} onChange={setDepartmentFilter} options={departmentOptions} />
          <FilterSelect label="Plant" value={plantFilter} onChange={setPlantFilter} options={plantOptions} />
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Assigned</label>
            <select
              value={assignmentFilter}
              onChange={(e) => setAssignmentFilter(e.target.value as AssignmentFilter)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
        </div>
        <div>
          <Button type="button" variant="outline" size="sm" onClick={resetFilters}>Reset filters</Button>
        </div>
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
                  <TableCell>{h ? h.personName : a.currentResponsiblePersonName ? a.currentResponsiblePersonName : <span className="text-muted-foreground">Unassigned</span>}</TableCell>
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

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

