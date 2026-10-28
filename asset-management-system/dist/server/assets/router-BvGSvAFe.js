import { n as getCurrentUser } from "./auth-client-YRRJDTWj.js";
import { t as Route$12 } from "./assets._id-CUd_IN8c.js";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-BvG3NCIB.css";
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AssetTrack" },
			{
				name: "description",
				content: "Asset management: register assets, handovers and returns."
			},
			{
				property: "og:title",
				content: "AssetTrack"
			},
			{
				property: "og:description",
				content: "Asset management: register assets, handovers and returns."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, {})]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$2 = () => import("./routes-B4RijviO.js");
var Route$10 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Sign in — AssetTrack" },
		{
			name: "description",
			content: "Sign in to AssetTrack to manage company assets, handovers and returns."
		},
		{
			property: "og:title",
			content: "Sign in — AssetTrack"
		},
		{
			property: "og:description",
			content: "Manage company assets, handovers and returns."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/api.assets.ts
var Route$9 = createFileRoute("/api/assets")({ server: { handlers: {
	GET: async ({ request }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const url = new URL(request.url);
			const q = url.searchParams.get("q") || "";
			const page = Number(url.searchParams.get("page") || "1");
			const limit = Number(url.searchParams.get("limit") || "50");
			const { listAssets } = await import("./assets-C6b2DqSE.js");
			const result = await listAssets({
				q,
				page,
				limit
			});
			return Response.json(result);
		} catch (err) {
			if (err instanceof Response) return err;
			console.error(err);
			return Response.json({ error: "Internal server error" }, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const body = await request.json().catch(() => ({}));
			const { createAsset } = await import("./assets-C6b2DqSE.js");
			const asset = await createAsset(body);
			return Response.json(asset, { status: 201 });
		} catch (err) {
			if (err instanceof Response) return err;
			if (err?.name === "ZodError") return Response.json({
				error: "Validation failed",
				details: err.flatten?.() ?? err.issues
			}, { status: 400 });
			const msg = err?.message || "Internal server error";
			const status = msg.includes("already exists") ? 409 : 500;
			console.error(err);
			return Response.json({ error: msg }, { status });
		}
	}
} } });
//#endregion
//#region src/routes/assets.index.tsx
var $$splitComponentImporter$1 = () => import("./assets.index-DUp59bQq.js");
var Route$8 = createFileRoute("/assets/")({
	beforeLoad: async () => {
		if (!await getCurrentUser()) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [
		{ title: "Current assets — AssetTrack" },
		{
			name: "description",
			content: "All current company assets with type, department and responsible person."
		},
		{
			property: "og:title",
			content: "Current assets — AssetTrack"
		},
		{
			property: "og:description",
			content: "All current company assets at a glance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/assets.new.tsx
var $$splitComponentImporter = () => import("./assets.new-BrpdqU3Z.js");
var Route$7 = createFileRoute("/assets/new")({
	beforeLoad: async () => {
		if (!await getCurrentUser()) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [
		{ title: "New asset — AssetTrack" },
		{
			name: "description",
			content: "Register a new company asset."
		},
		{
			property: "og:title",
			content: "New asset — AssetTrack"
		},
		{
			property: "og:description",
			content: "Register a new company asset."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routes/api.assets.$id.ts
var Route$6 = createFileRoute("/api/assets/$id")({ server: { handlers: {
	GET: async ({ request, params }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const { getAsset } = await import("./assets-C6b2DqSE.js");
			const asset = await getAsset(params.id);
			if (!asset) return Response.json({ error: "Not found" }, { status: 404 });
			return Response.json(asset);
		} catch (err) {
			if (err instanceof Response) return err;
			console.error(err);
			return Response.json({ error: "Internal server error" }, { status: 500 });
		}
	},
	PATCH: async ({ request, params }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const body = await request.json().catch(() => ({}));
			const { updateAsset } = await import("./assets-C6b2DqSE.js");
			const asset = await updateAsset(params.id, body);
			if (!asset) return Response.json({ error: "Not found" }, { status: 404 });
			return Response.json(asset);
		} catch (err) {
			if (err instanceof Response) return err;
			if (err?.name === "ZodError") return Response.json({
				error: "Validation failed",
				details: err.flatten?.() ?? err.issues
			}, { status: 400 });
			const msg = err?.message || "Internal server error";
			const status = msg.includes("already exists") ? 409 : 500;
			console.error(err);
			return Response.json({ error: msg }, { status });
		}
	},
	DELETE: async ({ request, params }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const { softDeleteAsset } = await import("./assets-C6b2DqSE.js");
			const result = await softDeleteAsset(params.id);
			if (!result.ok) {
				if (result.reason === "not_found") return Response.json({ error: "Not found" }, { status: 404 });
				if (result.reason === "has_history") return Response.json({ error: "Cannot delete asset with handover or return history" }, { status: 409 });
			}
			return Response.json({ ok: true });
		} catch (err) {
			if (err instanceof Response) return err;
			console.error(err);
			return Response.json({ error: "Internal server error" }, { status: 500 });
		}
	}
} } });
//#endregion
//#region src/routes/api.auth.bootstrap.ts
var Route$5 = createFileRoute("/api/auth/bootstrap")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { BootstrapSchema } = await import("./schemas-B94vF4vi.js");
		const body = await request.json().catch(() => ({}));
		const parsed = BootstrapSchema.safeParse(body);
		if (!parsed.success) return Response.json({
			error: "Invalid input",
			details: parsed.error.flatten()
		}, { status: 400 });
		const secret = process.env.BOOTSTRAP_SECRET;
		if (!secret || parsed.data.secret !== secret) return Response.json({ error: "Forbidden" }, { status: 403 });
		const { connectDb } = await import("./db-DXe_0mj0.js");
		await connectDb();
		const { User } = await import("./models-BWSleU6g.js");
		if (await User.countDocuments({}) > 0) return Response.json({ error: "Bootstrap disabled: users already exist" }, { status: 403 });
		const { hashPassword } = await import("./auth-DGidtmJB.js");
		const passwordHash = await hashPassword(parsed.data.password);
		const user = await User.create({
			username: parsed.data.username.toLowerCase(),
			email: parsed.data.email.toLowerCase(),
			passwordHash,
			role: "admin"
		});
		return Response.json({
			ok: true,
			userId: String(user._id)
		}, { status: 201 });
	} catch (err) {
		console.error(err);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routes/api.auth.login.ts
var Route$4 = createFileRoute("/api/auth/login")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { LoginSchema } = await import("./schemas-B94vF4vi.js");
		const body = await request.json().catch(() => ({}));
		const parsed = LoginSchema.safeParse(body);
		if (!parsed.success) return Response.json({
			error: "Invalid input",
			details: parsed.error.flatten()
		}, { status: 400 });
		const { connectDb } = await import("./db-DXe_0mj0.js");
		await connectDb();
		const { User } = await import("./models-BWSleU6g.js");
		const { verifyPassword, createSession, buildSessionCookie } = await import("./auth-DGidtmJB.js");
		const { identifier, password } = parsed.data;
		const user = await User.findOne({ $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }] });
		if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 });
		if (!await verifyPassword(password, user.passwordHash)) return Response.json({ error: "Invalid credentials" }, { status: 401 });
		const token = await createSession(String(user._id));
		return new Response(JSON.stringify({ user: {
			id: String(user._id),
			username: user.username,
			email: user.email,
			role: user.role
		} }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Set-Cookie": buildSessionCookie(token)
			}
		});
	} catch (err) {
		console.error(err);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routes/api.auth.logout.ts
var Route$3 = createFileRoute("/api/auth/logout")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { destroySession, buildClearCookie } = await import("./auth-DGidtmJB.js");
		await destroySession(request);
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Set-Cookie": buildClearCookie()
			}
		});
	} catch (err) {
		console.error(err);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routes/api.auth.me.ts
var Route$2 = createFileRoute("/api/auth/me")({ server: { handlers: { GET: async ({ request }) => {
	try {
		const { getUserFromRequest } = await import("./auth-DGidtmJB.js");
		const user = await getUserFromRequest(request);
		if (!user) return Response.json({ user: null }, { status: 401 });
		return Response.json({ user });
	} catch (err) {
		console.error(err);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routes/api.assets.$id.handovers.ts
var Route$1 = createFileRoute("/api/assets/$id/handovers")({ server: { handlers: {
	GET: async ({ request, params }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const { listHandovers } = await import("./assets-C6b2DqSE.js");
			const items = await listHandovers(params.id);
			return Response.json({ handovers: items });
		} catch (err) {
			if (err instanceof Response) return err;
			console.error(err);
			return Response.json({ error: "Internal server error" }, { status: 500 });
		}
	},
	POST: async ({ request, params }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const body = await request.json().catch(() => ({}));
			const { addHandoverToAsset } = await import("./assets-C6b2DqSE.js");
			const handover = await addHandoverToAsset(params.id, body);
			return Response.json(handover, { status: 201 });
		} catch (err) {
			if (err instanceof Response) return err;
			if (err?.name === "ZodError") return Response.json({
				error: "Validation failed",
				details: err.flatten?.() ?? err.issues
			}, { status: 400 });
			const msg = err?.message || "Internal server error";
			const status = msg.includes("not found") ? 404 : msg.includes("assigned") ? 409 : 400;
			console.error(err);
			return Response.json({ error: msg }, { status });
		}
	}
} } });
//#endregion
//#region src/routes/api.assets.$id.returns.ts
var Route = createFileRoute("/api/assets/$id/returns")({ server: { handlers: {
	GET: async ({ request, params }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const { listReturns } = await import("./assets-C6b2DqSE.js");
			const items = await listReturns(params.id);
			return Response.json({ returns: items });
		} catch (err) {
			if (err instanceof Response) return err;
			console.error(err);
			return Response.json({ error: "Internal server error" }, { status: 500 });
		}
	},
	POST: async ({ request, params }) => {
		try {
			const { requireUser } = await import("./auth-DGidtmJB.js");
			await requireUser(request);
			const body = await request.json().catch(() => ({}));
			const { addReturnToAsset } = await import("./assets-C6b2DqSE.js");
			const ret = await addReturnToAsset(params.id, body);
			return Response.json(ret, { status: 201 });
		} catch (err) {
			if (err instanceof Response) return err;
			if (err?.name === "ZodError") return Response.json({
				error: "Validation failed",
				details: err.flatten?.() ?? err.issues
			}, { status: 400 });
			const msg = err?.message || "Internal server error";
			const status = msg.includes("not found") ? 404 : msg.includes("not currently assigned") ? 409 : 400;
			console.error(err);
			return Response.json({ error: msg }, { status });
		}
	}
} } });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var ApiAssetsRoute = Route$9.update({
	id: "/api/assets",
	path: "/api/assets",
	getParentRoute: () => Route$11
});
var AssetsIndexRoute = Route$8.update({
	id: "/assets/",
	path: "/assets/",
	getParentRoute: () => Route$11
});
var AssetsIdRoute = Route$12.update({
	id: "/assets/$id",
	path: "/assets/$id",
	getParentRoute: () => Route$11
});
var AssetsNewRoute = Route$7.update({
	id: "/assets/new",
	path: "/assets/new",
	getParentRoute: () => Route$11
});
var ApiAssetsIdRoute = Route$6.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ApiAssetsRoute
});
var ApiAuthBootstrapRoute = Route$5.update({
	id: "/api/auth/bootstrap",
	path: "/api/auth/bootstrap",
	getParentRoute: () => Route$11
});
var ApiAuthLoginRoute = Route$4.update({
	id: "/api/auth/login",
	path: "/api/auth/login",
	getParentRoute: () => Route$11
});
var ApiAuthLogoutRoute = Route$3.update({
	id: "/api/auth/logout",
	path: "/api/auth/logout",
	getParentRoute: () => Route$11
});
var ApiAuthMeRoute = Route$2.update({
	id: "/api/auth/me",
	path: "/api/auth/me",
	getParentRoute: () => Route$11
});
var ApiAssetsIdRouteChildren = {
	ApiAssetsIdHandoversRoute: Route$1.update({
		id: "/handovers",
		path: "/handovers",
		getParentRoute: () => ApiAssetsIdRoute
	}),
	ApiAssetsIdReturnsRoute: Route.update({
		id: "/returns",
		path: "/returns",
		getParentRoute: () => ApiAssetsIdRoute
	})
};
var ApiAssetsRouteChildren = { ApiAssetsIdRoute: ApiAssetsIdRoute._addFileChildren(ApiAssetsIdRouteChildren) };
var rootRouteChildren = {
	IndexRoute,
	ApiAssetsRoute: ApiAssetsRoute._addFileChildren(ApiAssetsRouteChildren),
	AssetsIdRoute,
	AssetsNewRoute,
	AssetsIndexRoute,
	ApiAuthBootstrapRoute,
	ApiAuthLoginRoute,
	ApiAuthLogoutRoute,
	ApiAuthMeRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
