import { Link, useNavigate } from "@tanstack/react-router";
import { Boxes, LogOut, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth-client";

export function AppShell({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  const navigate = useNavigate();
  const onSignOut = async () => {
    try { await logout(); } catch {}
    navigate({ to: "/" });
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/assets" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <Boxes className="h-4 w-4" />
            </span>
            AssetTrack
          </Link>
          <nav className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Link to="/assets">Current assets</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Link to="/assets/new"><Plus className="h-4 w-4" />New asset</Link>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={onSignOut}>
              <LogOut className="h-4 w-4" />Sign out
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
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
