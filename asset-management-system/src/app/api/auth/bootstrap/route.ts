import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { BootstrapSchema } = await import("@/lib/schemas");
    const body = await request.json().catch(() => ({}));
    const parsed = BootstrapSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }
    const secret = process.env.BOOTSTRAP_SECRET;
    if (!secret || parsed.data.secret !== secret) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    const { connectDb } = await import("@/lib/server/db");
    await connectDb();
    const { User } = await import("@/lib/server/models");
    const count = await User.countDocuments({});
    if (count > 0) {
      return Response.json({ error: "Bootstrap disabled: users already exist" }, { status: 403 });
    }
    const { hashPassword } = await import("@/lib/server/auth");
    const passwordHash = await hashPassword(parsed.data.password);
    const user = await User.create({
      username: parsed.data.username.toLowerCase(),
      email: parsed.data.email.toLowerCase(),
      passwordHash,
      role: "admin",
    });
    return Response.json({ ok: true, userId: String(user._id) }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
