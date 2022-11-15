const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/product.js");
const category_list = ["baieti", "fete", "femei", "barbati"];
const category_clothes = ["tricou", "geaca", "pantaloni", "hanorac", "bluza"];

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads/"); //  unde sa se salveze
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`); // punem numele imaginii
	},
});

const fileFilter = (req, file, cb) => {
	// reject a file
	if (
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg"
	) {
		// selectam tipul
		cb(null, true); // se salveaza
	} else cb(null, false); // nu se salveaza
};
const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 10 }, // maxim 10mb
	fileFilter: fileFilter,
});

router.get("/", (req, res, next) => {
	Product.find()
		.then((data) => {
			res.status(200).render("all_clothes.ejs", { posts: data });
		})
		.catch((err) => {
			res.status(404).render("404.ejs");
		});
});

router.get("/adauga", (req, res) => {
	res.render("add_product.ejs");
});

router.post(
	"/adauga",
	upload.fields([{ name: "images", maxCount: 5 }]),
	(req, res, next) => {
		const images = [];
		req.files.images.forEach((element) => {
			images.push(`${element.filename}`);
		});

		console.log(images);
		const product = new Product({
			title: req.body.title,
			price: req.body.price,
			person_category: req.body.person_category,
			product_category: req.body.category,
			size: req.body.size,
			product_description: req.body.description,
			images: images,
			post_details: {
				date: `${new Date().getDate()}/${
					new Date().getMonth() + 1
				}/${new Date().getFullYear()}`,
				time: `${new Date().getHours()}:${
					new Date().getMinutes() < 10
						? "0" + new Date().getMinutes()
						: new Date().getMinutes()
				}:${new Date().getSeconds()}`,
			},
		});

		product
			.save()
			.then((result) => {
				console.log(result);
				res.status(201).redirect("/");
			})
			.catch((err) => {
				console.log(err);
			});
	}
);

router.get("/:category", (req, res, next) => {
	const category = req.params.category;

	if (category_list.includes(category)) {
		Product.find({ person_category: category })
			.then((data) => {
				res
					.status(200)
					.render("clothes_category.ejs", { posts: data, category });
			})
			.catch((err) => res.status(404).render("db error"));
	} else {
		res.status(404).render("404");
	}
});

router.get("/:category/sort-price/:price", (req, res, next) => {
	const price = req.params.price;
	const category = req.params.category;

	console.log(req.params.price);
	if (
		category_list.includes(req.params.category) &&
		(price === "crescator" || price === "descrescator")
	) {
		Product.find({ person_category: category })
			.sort({ price: price === "crescator" ? 1 : -1 })
			.then((data) => {
				res
					.status(200)
					.render("clothes_category.ejs", { posts: data, category });
			})
			.catch((e) => res.status(404).render("404"));
	} else next();
});

router.get("/:category/sort-category/:type", (req, res, next) => {
	const category = req.params.category;
	const type = req.params.type;
	console.log("salut");

	if (category_list.includes(category) && category_clothes.includes(type)) {
		Product.find({ person_category: category, product_category: type })
			.then((data) => {
				res
					.status(200)
					.render("clothes_category.ejs", { posts: data, category });
			})
			.catch((e) => {
				console.log(e);
			});
	} else next();
});

router.get("/:category/:id", (req, res, next) => {
	const id = req.params.id;
	Product.findById(id)
		.then((data) => {
			if (!data) {
				res.status(404).render("404.ejs");
			}
			Product.find()
				.sort({ createdAt: -1 })
				.limit(4)
				.then((result) => {
					res
						.status(200)
						.render("product_page.ejs", { posts: result, product_data: data });
				});
		})
		.catch((err) => {
			res.status(404).render("404.ejs");
		});
});

module.exports = router;
