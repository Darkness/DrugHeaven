import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Enter name of the product"],
		unique: [true, "Product name already taken"],
		minlength: [3, "Product name should be atleast 3 characters long"],
		maxlength: [30, "Prouct name can not be more than 30 characters long"],
	},
	image: {
		type: String,
		required: [true, "Provide picture of the product"],
	},
	imageReversed: {
		type: String,
	},
	details: {
		Functions: {
			type: [String],
		},
		Visuals: {
			type: [String],
		},
		Misc: {
			type: [String],
		},
	},
	chosenProduct: {
		name: {
			type: String,
		},
		price: {
			type: Number,
		},
	},
	product: {
		day: {
			name: {
				type: String,
				maxlength: [
					30,
					"Name of sub product can not be more than 30 characters long",
				],
			},
			price: {
				type: Number,
				max: [1000, "Lol what are you selling, lower the price"],
			},
		},
		week: {
			name: {
				type: String,
				maxlength: [
					30,
					"Name of sub product can not be more than 30 characters long",
				],
			},
			price: {
				type: Number,
				max: [1000, "Lol what are you selling, lower the price"],
			},
		},
		month: {
			name: {
				type: String,
				maxlength: [
					30,
					"Name of sub product can not be more than 30 characters long",
				],
			},
			price: {
				type: Number,
				max: [1000, "Lol what are you selling, lower the price"],
			},
		},
	},
});

const Product = mongoose.model("Products", ProductSchema);

export default Product;
