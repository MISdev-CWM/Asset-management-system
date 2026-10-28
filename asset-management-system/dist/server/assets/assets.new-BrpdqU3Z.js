import { i as Button, n as AppShell, o as cn, r as Field, t as Input } from "./input-CSBGcvOm.js";
import { n as CardContent, t as Card } from "./card-CzBzbAYr.js";
import { c as nextAssetNo, n as DEPARTMENTS, r as addAsset, t as ASSET_TYPES } from "./assets-store-CfMFssIB.js";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/routes/assets.new.tsx?tsr-split=component
function NewAsset() {
	const navigate = useNavigate();
	const [f, setF] = useState({
		assetNo: nextAssetNo(),
		type: "",
		name: "",
		department: "",
		serialNumber: "",
		imei1: "",
		imei2: "",
		price: "",
		purchaseDate: ""
	});
	const [submitting, setSubmitting] = useState(false);
	const set = (k) => (v) => setF((p) => ({
		...p,
		[k]: v
	}));
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!f.type || !f.department) {
			toast.error("Please choose a type and department");
			return;
		}
		if (submitting) return;
		setSubmitting(true);
		try {
			const id = await addAsset({
				...f,
				price: Number(f.price) || 0
			});
			toast.success("Asset created");
			navigate({
				to: "/assets/$id",
				params: { id }
			});
		} catch (err) {
			toast.error(err?.message || "Failed to create asset");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ jsx(AppShell, {
		title: "New asset",
		children: /* @__PURE__ */ jsx(Card, {
			className: "max-w-3xl",
			children: /* @__PURE__ */ jsx(CardContent, {
				className: "pt-6",
				children: /* @__PURE__ */ jsxs("form", {
					className: "grid gap-4 sm:grid-cols-2",
					onSubmit,
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Asset No",
							children: /* @__PURE__ */ jsx(Input, {
								required: true,
								value: f.assetNo,
								onChange: (e) => set("assetNo")(e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Type",
							children: /* @__PURE__ */ jsxs(Select, {
								value: f.type,
								onValueChange: set("type"),
								children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select type" }) }), /* @__PURE__ */ jsx(SelectContent, { children: ASSET_TYPES.map((t) => /* @__PURE__ */ jsx(SelectItem, {
									value: t,
									children: t
								}, t)) })]
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Name",
							children: /* @__PURE__ */ jsx(Input, {
								required: true,
								value: f.name,
								onChange: (e) => set("name")(e.target.value),
								placeholder: "e.g. Dell Latitude 5440"
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Department",
							children: /* @__PURE__ */ jsxs(Select, {
								value: f.department,
								onValueChange: set("department"),
								children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select department" }) }), /* @__PURE__ */ jsx(SelectContent, { children: DEPARTMENTS.map((t) => /* @__PURE__ */ jsx(SelectItem, {
									value: t,
									children: t
								}, t)) })]
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Serial number",
							children: /* @__PURE__ */ jsx(Input, {
								required: true,
								value: f.serialNumber,
								onChange: (e) => set("serialNumber")(e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Price",
							children: /* @__PURE__ */ jsx(Input, {
								type: "number",
								min: "0",
								step: "0.01",
								value: f.price,
								onChange: (e) => set("price")(e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "IMEI number 1",
							children: /* @__PURE__ */ jsx(Input, {
								inputMode: "numeric",
								value: f.imei1,
								onChange: (e) => set("imei1")(e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "IMEI number 2",
							children: /* @__PURE__ */ jsx(Input, {
								inputMode: "numeric",
								value: f.imei2,
								onChange: (e) => set("imei2")(e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Purchase date",
							children: /* @__PURE__ */ jsx(Input, {
								type: "date",
								required: true,
								value: f.purchaseDate,
								onChange: (e) => set("purchaseDate")(e.target.value)
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: () => navigate({ to: "/assets" }),
								children: "Cancel"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: submitting,
								children: submitting ? "Creating..." : "Create asset"
							})]
						})
					]
				})
			})
		})
	});
}
//#endregion
export { NewAsset as component };
