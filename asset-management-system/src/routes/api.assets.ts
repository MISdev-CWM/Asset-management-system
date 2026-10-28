import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/assets")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const { requireUser } = await import("@/lib/server/auth");
          await requireUser(request);
          const url = new URL(request.url);
          const q = url.searchParams.get("q") || "";
          const page = Number(url.searchParams.get("page") || "1");
          const limit = Number(url.searchParams.get("limit") || "50");
          const { listAssets } = await import("@/lib/server/assets");
          const result = await listAssets({ q, page, limit });
          return Response.json(result);
        } catch (err: any) {
          if (err instanceof Response) return err;
          console.error(err);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        try {
          const { requireUser } = await import("@/lib/server/auth");
          await requireUser(request);
          const body = await request.json().catch(() => ({}));
          const { createAsset } = await import("@/lib/server/assets");
          const asset = await createAsset(body);
          return Response.json(asset, { status: 201 });
        } catch (err: any) {
          if (err instanceof Response) return err;
          if (err?.name === "ZodError") {
            return Response.json({ error: "Validation failed", details: err.flatten?.() ?? err.issues }, { status: 400 });
          }
          const msg = err?.message || "Internal server error";
          const status = msg.includes("already exists") ? 409 : 500;
          console.error(err);
          return Response.json({ error: msg }, { status });
        }
      },
    },
  },
});
