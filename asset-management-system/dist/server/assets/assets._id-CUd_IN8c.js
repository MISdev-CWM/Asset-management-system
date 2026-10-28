import { n as getCurrentUser } from "./auth-client-YRRJDTWj.js";
import { createFileRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
//#region src/routes/assets.$id.tsx
var $$splitComponentImporter = () => import("./assets._id-B_BS4Eu8.js");
var Route = createFileRoute("/assets/$id")({
	beforeLoad: async () => {
		if (!await getCurrentUser()) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [
		{ title: "Asset details — AssetTrack" },
		{
			name: "description",
			content: "Asset details, handover and return history."
		},
		{
			property: "og:title",
			content: "Asset details — AssetTrack"
		},
		{
			property: "og:description",
			content: "Asset details, handover and return history."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
