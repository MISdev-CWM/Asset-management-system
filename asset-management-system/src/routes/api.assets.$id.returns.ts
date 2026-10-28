import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/assets/$id/returns")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const { requireUser } = await import("@/lib/server/auth");
          await requireUser(request);
          const { listReturns } = await import("@/lib/server/assets");
          const items = await listReturns(params.id);
          return Response.json({ returns: items });
        } catch (err: any) {
          if (err instanceof Response) return err;
          console.error(err);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
      POST: async ({ request, params }) => {
        try {
          const { requireUser } = await import("@/lib/server/auth");
          await requireUser(request);
          const body = await request.json().catch(() => ({}));
          const { addReturnToAsset } = await import("@/lib/server/assets");
          const ret = await addReturnToAsset(params.id, body);
          return Response.json(ret, { status: 201 });
        } catch (err: any) {
          if (err instanceof Response) return err;
          if (err?.name === "ZodError") {
            return Response.json({ error: "Validation failed", details: err.flatten?.() ?? err.issues }, { status: 400 });
          }
          const msg = err?.message || "Internal server error";
          const status = msg.includes("not found") ? 404 : msg.includes("not currently assigned") ? 409 : 400;
          console.error(err);
          return Response.json({ error: msg }, { status });
        }
      },
    },
  },
});
