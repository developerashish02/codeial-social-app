const express = require("express");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

// use for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const port = 9001;
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
// initialized express app
const app = express();

app.use(
	sassMiddleware({
		src: "./assets/scss",
		dest: "./assets/css",
		debug: true,
		outputStyle: "expanded",
		prefix: "/css",
	})
);

// layouts
app.use(expressLayouts);
// setup middleware for watch data
app.use(express.urlencoded());
// set up cookie parser
app.use(cookieParser());
// set layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// mongo store is used to store the session cookie in the db
app.use(
	session({
		name: "codeial",
		// todo chnage secret before deployment
		secret: "blahsomething",
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},

		store: MongoStore.create({
			mongoUrl: "mongodb://localhost:27017/codial_ashish_development",
			autoRemove: false,
		}),
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);

app.use(flash());

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
