import { t as Route } from "./assets._id-CUd_IN8c.js";
import { a as buttonVariants, i as Button, n as AppShell, o as cn, r as Field, t as Input } from "./input-CSBGcvOm.js";
import { t as Badge } from "./badge-5iqegIda.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CzBzbAYr.js";
import { a as addReturn, i as addHandover, l as useAsset, o as currentHolder, s as deleteAsset } from "./assets-store-CfMFssIB.js";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ArrowLeft, Trash2, Undo2, UserPlus, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
//#endregion
//#region src/routes/assets.$id.tsx?tsr-split=component
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function AssetDetails() {
	const { id } = Route.useParams();
	const { asset, isLoading, refresh } = useAsset(id);
	const navigate = useNavigate();
	const [dialog, setDialog] = useState(null);
	if (isLoading) return /* @__PURE__ */ jsx(AppShell, {
		title: "Loading…",
		children: /* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading asset…"
		})
	});
	if (!asset) return /* @__PURE__ */ jsx(AppShell, {
		title: "Asset not found",
		children: /* @__PURE__ */ jsx(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/assets",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), "Back to assets"]
			})
		})
	});
	const holder = currentHolder(asset);
	const history = [...asset.handovers.map((h) => ({
		kind: "Handover",
		date: h.date,
		text: `Handed to ${h.personName} (${h.employeeId})`
	})), ...asset.returns.map((r) => ({
		kind: "Return",
		date: r.date,
		text: `Collected by ${r.collectedByName} (${r.collectedById}) — ${r.reason}`
	}))].sort((a, b) => b.date.localeCompare(a.date));
	return /* @__PURE__ */ jsxs(AppShell, {
		title: asset.name,
		actions: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/assets",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"]
					})
				}),
				/* @__PURE__ */ jsxs(Button, {
					onClick: () => setDialog("handover"),
					disabled: !!holder,
					children: [/* @__PURE__ */ jsx(UserPlus, { className: "h-4 w-4" }), "Handover"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					variant: "secondary",
					onClick: () => setDialog("return"),
					disabled: !holder,
					children: [/* @__PURE__ */ jsx(Undo2, { className: "h-4 w-4" }), "Return"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					variant: "destructive",
					onClick: () => setDialog("delete"),
					children: [/* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }), "Delete"]
				})
			]
		}),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Details" }) }), /* @__PURE__ */ jsxs(CardContent, {
						className: "grid gap-x-6 gap-y-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Info, {
								label: "Asset No",
								children: /* @__PURE__ */ jsx("span", {
									className: "font-mono",
									children: asset.assetNo
								})
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "Type",
								children: /* @__PURE__ */ jsx(Badge, {
									variant: "secondary",
									children: asset.type
								})
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "Name",
								children: asset.name
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "Department",
								children: asset.department
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "Serial number",
								children: asset.serialNumber || "—"
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "Price",
								children: asset.price.toLocaleString(void 0, { minimumFractionDigits: 2 })
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "IMEI 1",
								children: asset.imei1 || "—"
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "IMEI 2",
								children: asset.imei2 || "—"
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "Purchase date",
								children: asset.purchaseDate
							}),
							/* @__PURE__ */ jsx(Info, {
								label: "Responsible person",
								children: holder ? `${holder.personName} (${holder.employeeId})` : /* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "Unassigned"
								})
							})
						]
					})]
				}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "History" }) }), /* @__PURE__ */ jsx(CardContent, { children: history.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "No handovers or returns yet."
				}) : /* @__PURE__ */ jsx("ol", {
					className: "space-y-4",
					children: history.map((h, i) => /* @__PURE__ */ jsxs("li", {
						className: "border-l-2 pl-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ jsx(Badge, {
								variant: h.kind === "Handover" ? "default" : "outline",
								children: h.kind
							}), /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: h.date
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm",
							children: h.text
						})]
					}, i))
				}) })] })]
			}),
			/* @__PURE__ */ jsx(HandoverDialog, {
				open: dialog === "handover",
				onClose: () => setDialog(null),
				onSave: async (h) => {
					try {
						await addHandover(asset.id, h);
						toast.success("Handover recorded");
						await refresh();
						setDialog(null);
					} catch (err) {
						toast.error(err?.message || "Failed to record handover");
					}
				}
			}),
			/* @__PURE__ */ jsx(ReturnDialog, {
				open: dialog === "return",
				onClose: () => setDialog(null),
				onSave: async (r) => {
					try {
						await addReturn(asset.id, r);
						toast.success("Return recorded");
						await refresh();
						setDialog(null);
					} catch (err) {
						toast.error(err?.message || "Failed to record return");
					}
				}
			}),
			/* @__PURE__ */ jsx(AlertDialog, {
				open: dialog === "delete",
				onOpenChange: (o) => !o && setDialog(null),
				children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete this asset?" }), /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
					asset.assetNo,
					" — ",
					asset.name,
					" and its handover/return history will be permanently removed. This cannot be undone."
				] })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ jsx(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: async () => {
						try {
							await deleteAsset(asset.id);
							toast.success("Asset deleted");
							navigate({ to: "/assets" });
						} catch (err) {
							toast.error(err?.message || "Failed to delete asset");
						}
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
function Info({ label, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
		className: "text-xs uppercase tracking-wide text-muted-foreground",
		children: label
	}), /* @__PURE__ */ jsx("div", {
		className: "mt-1 text-sm font-medium",
		children
	})] });
}
function HandoverDialog({ open, onClose, onSave }) {
	const [f, setF] = useState({
		date: today(),
		personName: "",
		employeeId: ""
	});
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Handover details" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Assign this asset to a responsible person." })] }), /* @__PURE__ */ jsxs("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				onSave(f);
				setF({
					date: today(),
					personName: "",
					employeeId: ""
				});
				onClose();
			},
			children: [
				/* @__PURE__ */ jsx(Field, {
					label: "Handover date",
					children: /* @__PURE__ */ jsx(Input, {
						type: "date",
						required: true,
						value: f.date,
						onChange: (e) => setF({
							...f,
							date: e.target.value
						})
					})
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Responsible person's name",
					children: /* @__PURE__ */ jsx(Input, {
						required: true,
						value: f.personName,
						onChange: (e) => setF({
							...f,
							personName: e.target.value
						})
					})
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Employee ID",
					children: /* @__PURE__ */ jsx(Input, {
						required: true,
						value: f.employeeId,
						onChange: (e) => setF({
							...f,
							employeeId: e.target.value
						}),
						placeholder: "EMP-0000"
					})
				}),
				/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					children: "Save handover"
				})] })
			]
		})] })
	});
}
function ReturnDialog({ open, onClose, onSave }) {
	const empty = {
		date: today(),
		reason: "",
		collectedByName: "",
		collectedById: ""
	};
	const [f, setF] = useState(empty);
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Return details" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Record the return of this asset." })] }), /* @__PURE__ */ jsxs("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				onSave(f);
				setF(empty);
				onClose();
			},
			children: [
				/* @__PURE__ */ jsx(Field, {
					label: "Return date",
					children: /* @__PURE__ */ jsx(Input, {
						type: "date",
						required: true,
						value: f.date,
						onChange: (e) => setF({
							...f,
							date: e.target.value
						})
					})
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Return reason",
					children: /* @__PURE__ */ jsx(Textarea, {
						required: true,
						value: f.reason,
						onChange: (e) => setF({
							...f,
							reason: e.target.value
						})
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsx(Field, {
						label: "Collected by (name)",
						children: /* @__PURE__ */ jsx(Input, {
							required: true,
							value: f.collectedByName,
							onChange: (e) => setF({
								...f,
								collectedByName: e.target.value
							})
						})
					}), /* @__PURE__ */ jsx(Field, {
						label: "Collected by (ID)",
						children: /* @__PURE__ */ jsx(Input, {
							required: true,
							value: f.collectedById,
							onChange: (e) => setF({
								...f,
								collectedById: e.target.value
							})
						})
					})]
				}),
				/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					children: "Save return"
				})] })
			]
		})] })
	});
}
//#endregion
export { AssetDetails as component };
