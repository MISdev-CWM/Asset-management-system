"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/AppShell";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { login } = await import("@/lib/auth-client");
      await login(identifier, password);
      router.push("/counts");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"><Boxes className="h-4 w-4" /></span>
          AssetTrack
        </div>
        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">Every device, every hand it passes through.</h2>
          <p className="mt-4 max-w-md text-sidebar-foreground/70">Register assets, record handovers and returns, and always know who is responsible.</p>
        </div>
        <p className="text-sm text-sidebar-foreground/50">© 2026 AssetTrack</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>Enter your credentials to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <Field label="Email or username"><Input required placeholder="you@company.com" value={identifier} onChange={(e) => setIdentifier(e.target.value)} /></Field>
              <Field label="Password"><Input required type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
