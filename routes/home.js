const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", (req, res, next) => {
	Product.find()
		.sort({ createdAt: -1 })
		.limit(4)
		.then((result) => {
			res.status(200).render("home.ejs", { posts: result });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
