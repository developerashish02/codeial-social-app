const express = require("express");
const port = 9001;
const app = express();

// use express router 
app.use('/', require('./routes'))

app.listen(port, (err) => {
	if (err) {
		console.log(`error while setting up server on port ${port}`);
		return;
	}

	console.log(`server is up on port ${port}`);
});
