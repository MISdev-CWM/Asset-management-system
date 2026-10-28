import { i as Button, r as Field, t as Input } from "./input-CSBGcvOm.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CzBzbAYr.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Boxes } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function Login() {
	const navigate = useNavigate();
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const { login } = await import("./auth-client-YRRJDTWj.js").then((n) => n.t);
			await login(identifier, password);
			navigate({ to: "/assets" });
		} catch (err) {
			setError(err?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 font-semibold",
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground",
						children: /* @__PURE__ */ jsx(Boxes, { className: "h-4 w-4" })
					}), "AssetTrack"]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-4xl font-semibold leading-tight tracking-tight",
					children: "Every device, every hand it passes through."
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-4 max-w-md text-sidebar-foreground/70",
					children: "Register assets, record handovers and returns, and always know who is responsible."
				})] }),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-sidebar-foreground/50",
					children: "© 2026 AssetTrack"
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center p-6",
			children: /* @__PURE__ */ jsxs(Card, {
				className: "w-full max-w-sm",
				children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-2xl",
					children: "Sign in"
				}), /* @__PURE__ */ jsx(CardDescription, { children: "Enter your credentials to continue." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
					className: "space-y-4",
					onSubmit,
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Email or username",
							children: /* @__PURE__ */ jsx(Input, {
								required: true,
								placeholder: "you@company.com",
								value: identifier,
								onChange: (e) => setIdentifier(e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Password",
							children: /* @__PURE__ */ jsx(Input, {
								required: true,
								type: "password",
								placeholder: "••••••••",
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})
						}),
						error && /* @__PURE__ */ jsx("p", {
							className: "text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							className: "w-full",
							disabled: loading,
							children: loading ? "Signing in..." : "Sign in"
						})
					]
				}) })]
			})
		})]
	});
}
//#endregion
export { Login as component };
