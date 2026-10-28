import mongoose from "mongoose";
//#region src/lib/server/db.ts
var cached = global._mongooseCache ?? (global._mongooseCache = {
	conn: null,
	promise: null
});
async function connectDb() {
	if (cached.conn) return cached.conn;
	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error("MONGODB_URI is not set");
	if (!cached.promise) cached.promise = mongoose.connect(uri, { dbName: process.env.MONGODB_DB_NAME || void 0 });
	try {
		cached.conn = await cached.promise;
	} catch (err) {
		cached.promise = null;
		throw err;
	}
	return cached.conn;
}
//#endregion
export { connectDb };
