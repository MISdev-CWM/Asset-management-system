import { NextRequest } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, ctx: Ctx) {
  try {
    const { requireUser } = await import("@/lib/server/auth");
    await requireUser(request);
    const { id } = await ctx.params;
    const { listHandovers } = await import("@/lib/server/assets");
    const items = await listHandovers(id);
    return Response.json({ handovers: items });
  } catch (err: any) {
    if (err instanceof Response) return err;
    console.error(err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, ctx: Ctx) {
  try {
    const { requireUser } = await import("@/lib/server/auth");
    await requireUser(request);
    const { id } = await ctx.params;
    const body = await request.json().catch(() => ({}));
    const { addHandoverToAsset } = await import("@/lib/server/assets");
    const handover = await addHandoverToAsset(id, body);
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
}
