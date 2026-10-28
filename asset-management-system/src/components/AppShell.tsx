"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Boxes, LogOut, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth-client";

export function AppShell({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  const router = useRouter();
  const onSignOut = async () => {
    try { await logout(); } catch {}
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/counts" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Boxes className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">AssetTrack</span>
          </Link>
          <nav className="flex items-center gap-1 rounded-full border bg-muted/40 p-1">
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/assets">Assets</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/assets/new"><Plus className="h-4 w-4" />New</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/counts">Counts</Link>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={onSignOut}>
              <LogOut className="h-4 w-4" />Sign out
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}