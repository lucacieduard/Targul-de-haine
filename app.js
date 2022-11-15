const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const clotherRouter = require("./routes/clothes");
const contactRouter = require("./routes/contact");
const homeRouter = require("./routes/home");
const dotenv = require("dotenv");

dotenv.config();

mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		console.log("Connected to DB");
		app.listen(process.env.PORT || 3000, () => {
			console.log("Server is open at port 3000!");
		});
	})
	.catch((err) => {
		console.log("Db error", err);
	});

const app = express();
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/haine", clotherRouter);
app.use("/contact", contactRouter);

app.use((req, res) => {
	res.status(404).render("404.ejs");
});
