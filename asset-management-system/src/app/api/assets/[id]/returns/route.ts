import { NextRequest } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, ctx: Ctx) {
  try {
    const { requireUser } = await import("@/lib/server/auth");
    await requireUser(request);
    const { id } = await ctx.params;
    const { listReturns } = await import("@/lib/server/assets");
    const items = await listReturns(id);
    return Response.json({ returns: items });
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
    const { addReturnToAsset } = await import("@/lib/server/assets");
    const ret = await addReturnToAsset(id, body);
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
}
