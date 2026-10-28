import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/assets/$id/handovers")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const { requireUser } = await import("@/lib/server/auth");
          await requireUser(request);
          const { listHandovers } = await import("@/lib/server/assets");
          const items = await listHandovers(params.id);
          return Response.json({ handovers: items });
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
          const { addHandoverToAsset } = await import("@/lib/server/assets");
          const handover = await addHandoverToAsset(params.id, body);
          return Response.json(handover, { status: 201 });
        } catch (err: any) {
          if (err instanceof Response) return err;
          if (err?.name === "ZodError") {
            return Response.json({ error: "Validation failed", details: err.flatten?.() ?? err.issues }, { status: 400 });
          }
          const msg = err?.message || "Internal server error";
          const status = msg.includes("not found") ? 404 : msg.includes("assigned") ? 409 : 400;
          console.error(err);
          return Response.json({ error: msg }, { status });
        }
      },
    },
  },
});
