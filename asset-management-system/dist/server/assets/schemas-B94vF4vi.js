import { z } from "zod";
//#region src/lib/schemas.ts
var LoginSchema = z.object({
	identifier: z.string().trim().min(1, "Email or username is required"),
	password: z.string().min(1, "Password is required")
});
var AssetInputSchema = z.object({
	assetNo: z.string().trim().optional().or(z.literal("")),
	name: z.string().trim().min(1, "Name is required"),
	type: z.string().trim().min(1, "Type is required"),
	department: z.string().trim().min(1, "Department is required"),
	serialNumber: z.string().trim().min(1, "Serial number is required"),
	imei1: z.string().trim().optional().default(""),
	imei2: z.string().trim().optional().default(""),
	price: z.coerce.number().min(0, "Price must be >= 0"),
	purchaseDate: z.string().trim().min(1, "Purchase date is required")
});
var HandoverSchema = z.object({
	date: z.string().trim().min(1, "Handover date is required"),
	personName: z.string().trim().min(1, "Responsible person's name is required"),
	employeeId: z.string().trim().min(1, "Employee ID is required")
});
var ReturnSchema = z.object({
	date: z.string().trim().min(1, "Return date is required"),
	reason: z.string().trim().min(1, "Return reason is required"),
	collectedByName: z.string().trim().min(1, "Collected by name is required"),
	collectedById: z.string().trim().min(1, "Collected by employee ID is required")
});
var BootstrapSchema = z.object({
	secret: z.string().min(1),
	username: z.string().trim().min(3),
	email: z.string().trim().email(),
	password: z.string().min(8)
});
//#endregion
export { AssetInputSchema, BootstrapSchema, HandoverSchema, LoginSchema, ReturnSchema };
