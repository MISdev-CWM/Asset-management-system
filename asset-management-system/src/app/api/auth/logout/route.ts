import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { destroySession, buildClearCookie } = await import("@/lib/server/auth");
    await destroySession(request);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": buildClearCookie(),
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
