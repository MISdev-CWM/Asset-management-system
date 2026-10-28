"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppShell, Field } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSET_TYPES, DEPARTMENTS, PLANTS, DIVISIONS, addAsset, nextAssetNo } from "@/lib/assets-store";
import { getCurrentUser } from "@/lib/auth-client";

export default function NewAssetPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [f, setF] = useState({ assetNo: nextAssetNo(), type: "", name: "", department: "", plant: "", division: "", serialNumber: "", imei1: "", imei2: "", price: "", purchaseDate: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.replace("/");
      else setReady(true);
    });
  }, [router]);

  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.type || !f.department || !f.plant || !f.division) {
      toast.error("Please choose a type, department, plant and division");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      const id = await addAsset({ ...f, price: Number(f.price) || 0 });
      toast.success("Asset created");
      router.push(`/assets/${id}`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to create asset");
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-sm text-muted-foreground">Loading...</p></div>;
  }

  return (
    <AppShell title="New asset">
      <Card className="max-w-3xl overflow-hidden rounded-2xl border-0 shadow-lg">
        <CardContent className="pt-6">
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
            <Field label="Asset No"><Input required value={f.assetNo} onChange={(e) => set("assetNo")(e.target.value)} /></Field>
            <Field label="Type">
              <SearchableSelect value={f.type} onChange={set("type")} options={ASSET_TYPES} placeholder="Select type" />
            </Field>
            <Field label="Name"><Input required value={f.name} onChange={(e) => set("name")(e.target.value)} placeholder="e.g. Dell Latitude 5440" /></Field>
            <Field label="Department">
              <SearchableSelect value={f.department} onChange={set("department")} options={DEPARTMENTS} placeholder="Select department" />
            </Field>
            <Field label="Plant">
              <SearchableSelect value={f.plant} onChange={set("plant")} options={PLANTS} placeholder="Select plant" />
            </Field>
            <Field label="Division">
              <SearchableSelect value={f.division} onChange={set("division")} options={DIVISIONS} placeholder="Select division" />
            </Field>
            <Field label="Serial number"><Input required value={f.serialNumber} onChange={(e) => set("serialNumber")(e.target.value)} /></Field>
            <Field label="Price"><Input type="number" min="0" step="0.01" value={f.price} onChange={(e) => set("price")(e.target.value)} /></Field>
            <Field label="IMEI number 1"><Input inputMode="numeric" value={f.imei1} onChange={(e) => set("imei1")(e.target.value)} /></Field>
            <Field label="IMEI number 2"><Input inputMode="numeric" value={f.imei2} onChange={(e) => set("imei2")(e.target.value)} /></Field>
            <Field label="Purchase date"><Input type="date" required value={f.purchaseDate} onChange={(e) => set("purchaseDate")(e.target.value)} /></Field>
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => router.push("/assets")}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create asset"}</Button>

            </div>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between font-normal">
          {value || placeholder || "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search..." value={query} onValueChange={setQuery} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onSelect={() => {
                    onChange(opt);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === opt ? "opacity-100" : "opacity-0")} />
                  {opt}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
