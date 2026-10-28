import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
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
      },
    },
  },
});
