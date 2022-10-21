const mongoose = require("mongoose");

main().catch((err) => console.log(err, "error while connecting db"));

async function main() {
	console.log("connected to db");
	await mongoose.connect("mongodb://localhost:27017/codial_ashish_development");
}

module.exports = mongoose;
