import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { LoginSchema } = await import("@/lib/schemas");
          const body = await request.json().catch(() => ({}));
          const parsed = LoginSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
          }
          const { connectDb } = await import("@/lib/server/db");
          await connectDb();
          const { User } = await import("@/lib/server/models");
          const { verifyPassword, createSession, buildSessionCookie } = await import("@/lib/server/auth");

          const { identifier, password } = parsed.data;
          const user = await User.findOne({
            $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }],
          });
          if (!user) {
            return Response.json({ error: "Invalid credentials" }, { status: 401 });
          }
          const ok = await verifyPassword(password, user.passwordHash);
          if (!ok) {
            return Response.json({ error: "Invalid credentials" }, { status: 401 });
          }
          const token = await createSession(String(user._id));
          return new Response(JSON.stringify({ user: { id: String(user._id), username: user.username, email: user.email, role: user.role } }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": buildSessionCookie(token),
            },
          });
        } catch (err) {
          console.error(err);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
