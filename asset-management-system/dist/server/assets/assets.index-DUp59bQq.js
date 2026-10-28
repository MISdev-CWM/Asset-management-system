import { i as Button, n as AppShell, o as cn, t as Input } from "./input-CSBGcvOm.js";
import { t as Badge } from "./badge-5iqegIda.js";
import { o as currentHolder, u as useAssets } from "./assets-store-CfMFssIB.js";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Plus, Search } from "lucide-react";
//#region src/components/ui/table.tsx
var Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ jsx("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
//#endregion
//#region src/routes/assets.index.tsx?tsr-split=component
function AssetsPage() {
	const assets = useAssets();
	const navigate = useNavigate();
	const [q, setQ] = useState("");
	const rows = assets.filter((a) => [
		a.assetNo,
		a.name,
		a.type,
		a.department,
		currentHolder(a)?.personName ?? ""
	].join(" ").toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ jsxs(AppShell, {
		title: "Current assets",
		actions: /* @__PURE__ */ jsx(Button, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/assets/new",
				children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), "New asset"]
			})
		}),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative mb-4 max-w-sm",
			children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
				className: "pl-9",
				placeholder: "Search assets…",
				value: q,
				onChange: (e) => setQ(e.target.value)
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "rounded-lg border bg-card",
			children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableHead, { children: "Asset No" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Name" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Type" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Department" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Responsible person" })
			] }) }), /* @__PURE__ */ jsxs(TableBody, { children: [rows.map((a) => {
				const h = currentHolder(a);
				return /* @__PURE__ */ jsxs(TableRow, {
					className: "cursor-pointer",
					onClick: () => navigate({
						to: "/assets/$id",
						params: { id: a.id }
					}),
					children: [
						/* @__PURE__ */ jsx(TableCell, {
							className: "font-mono text-sm",
							children: a.assetNo
						}),
						/* @__PURE__ */ jsx(TableCell, {
							className: "font-medium",
							children: a.name
						}),
						/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, {
							variant: "secondary",
							children: a.type
						}) }),
						/* @__PURE__ */ jsx(TableCell, { children: a.department }),
						/* @__PURE__ */ jsx(TableCell, { children: h ? h.personName : /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Unassigned"
						}) })
					]
				}, a.id);
			}), rows.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
				colSpan: 5,
				className: "py-10 text-center text-muted-foreground",
				children: "No assets found."
			}) })] })] })
		})]
	});
}
//#endregion
export { AssetsPage as component };
