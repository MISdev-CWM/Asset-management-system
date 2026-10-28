import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/assets/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const { requireUser } = await import("@/lib/server/auth");
          await requireUser(request);
          const { getAsset } = await import("@/lib/server/assets");
          const asset = await getAsset(params.id);
          if (!asset) return Response.json({ error: "Not found" }, { status: 404 });
          return Response.json(asset);
        } catch (err: any) {
          if (err instanceof Response) return err;
          console.error(err);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
      PATCH: async ({ request, params }) => {
        try {
          const { requireUser } = await import("@/lib/server/auth");
          await requireUser(request);
          const body = await request.json().catch(() => ({}));
          const { updateAsset } = await import("@/lib/server/assets");
          const asset = await updateAsset(params.id, body);
          if (!asset) return Response.json({ error: "Not found" }, { status: 404 });
          return Response.json(asset);
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
      DELETE: async ({ request, params }) => {
        try {
          const { requireUser } = await import("@/lib/server/auth");
          await requireUser(request);
          const { softDeleteAsset } = await import("@/lib/server/assets");
          const result = await softDeleteAsset(params.id);
          if (!result.ok) {
            if (result.reason === "not_found") return Response.json({ error: "Not found" }, { status: 404 });
            if (result.reason === "has_history") {
              return Response.json({ error: "Cannot delete asset with handover or return history" }, { status: 409 });
            }
          }
          return Response.json({ ok: true });
        } catch (err: any) {
          if (err instanceof Response) return err;
          console.error(err);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
