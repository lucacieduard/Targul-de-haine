const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.status(200).render("contact.ejs");
});

router.post("/", (req, res, next) => {
	res.status(200).json({
		nume: req.body.nume,
		prenume: req.body.prenume,
		email: req.body.email,
		problema: req.body.problema,
	});
});

module.exports = router;
