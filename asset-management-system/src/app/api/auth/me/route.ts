import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { getUserFromRequest } = await import("@/lib/server/auth");
    const user = await getUserFromRequest(request);
    if (!user) {
      return Response.json({ user: null }, { status: 401 });
    }
    return Response.json({ user });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
