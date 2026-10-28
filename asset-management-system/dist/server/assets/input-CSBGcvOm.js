import { r as logout } from "./auth-client-YRRJDTWj.js";
import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Boxes, LogOut, Plus } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/AppShell.tsx
function AppShell({ title, actions, children }) {
	const navigate = useNavigate();
	const onSignOut = async () => {
		try {
			await logout();
		} catch {}
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ jsx("header", {
			className: "border-b bg-sidebar text-sidebar-foreground",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-6",
				children: [/* @__PURE__ */ jsxs(Link, {
					to: "/assets",
					className: "flex items-center gap-2 font-semibold tracking-tight",
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground",
						children: /* @__PURE__ */ jsx(Boxes, { className: "h-4 w-4" })
					}), "AssetTrack"]
				}), /* @__PURE__ */ jsxs("nav", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/assets",
								children: "Current assets"
							})
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/assets/new",
								children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), "New asset"]
							})
						}),
						/* @__PURE__ */ jsxs(Button, {
							variant: "ghost",
							size: "sm",
							className: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							onClick: onSignOut,
							children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }), "Sign out"]
						})
					]
				})]
			})
		}), /* @__PURE__ */ jsxs("main", {
			className: "mx-auto max-w-6xl px-6 py-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: title
				}), actions]
			}), children]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ jsx("label", {
			className: "text-sm font-medium",
			children: label
		}), children]
	});
}
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
export { buttonVariants as a, Button as i, AppShell as n, cn as o, Field as r, Input as t };
