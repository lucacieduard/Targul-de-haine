const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		person_category: { type: String, required: true },
		product_category: { type: String, required: true },
		size: { type: String, required: true },
		product_description: { type: String, required: true },
		images: { type: Array },
		post_details: {
			date: { type: String, required: true },
			time: { type: String, required: true },
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
