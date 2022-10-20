const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const port = 9001;
const app = express();

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// static folders
app.use(express.static("./assets"));

// use express router
app.use("/", require("./routes"));

// view engine
app.set("view engine", "ejs");

app.listen(port, (err) => {
	if (err) {
		console.log(`error while setting up server on port ${port}`);
		return;
	}

	console.log(`server is up on port ${port}`);
});
