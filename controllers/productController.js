import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Coupon from "../models/couponModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import cloudinary from "cloudinary";
import fs from "fs";
import Client from "coinbase-commerce-node";
import Webhook from "coinbase-commerce-node";
import resources from "coinbase-commerce-node";
import Coinpayments from "coinpayments";

const { Charge } = resources;

cloudinary.config({
	cloud_name: "dnnbsfbzb",
	api_key: "292996515616593",
	api_secret: "enx6zYPOo7X5zTpWqxac_Qg7orQ",
	secure: true,
});

const credentials = {
	key: "8d871cf1107120243785f3865363813115dce2eb27865fe0d03bcbdf1711b95b",
	secret: "dd7e3910A5978DdE412679bfAB4CC23E51D355Be79697906a657fBa344686cb6",
};
const client = new Coinpayments(credentials);

const productController = {
	getProducts: async (req, res, next) => {
		try {
			const products = await Product.find();
			res.status(200).json({
				message: "Succesfully got all products to display",
				payload: products,
			});
		} catch (error) {
			return next(error);
		}
	},
	getProduct: async (req, res, next) => {
		try {
			const { product_id } = req.params;
			const product = await Product.findById(product_id);
			if (!product)
				return next(
					new ErrorResponse(
						"Could not find product with given id",
						400
					)
				);
			res.status(200).json({
				message: "Succesfully got product with given id",
				payload: product,
			});
		} catch (error) {
			return next(error);
		}
	},
	create: async (req, res, next) => {
		try {
			const { data } = req.body;
			const product = await Product.create(data);
			res.status(200).json({
				message: "Succesfully created product",
				payload: product,
			});
		} catch (error) {
			return next(error);
		}
	},
	attachImage: async (req, res, next) => {
		try {
			const { file } = req.files;
			cloudinary.v2.uploader.upload(
				file.tempFilePath,
				{ folder: "store" },
				async (error, result) => {
					if (error) console.log(error);
					removeImage(file.tempFilePath);
					res.status(200).json({
						message: "Image uploaded Succesfully",
						payload: result.secure_url,
					});
				}
			);
		} catch (error) {
			return next(error);
		}
	},
	attachReversedImage: async (req, res, next) => {
		try {
			const { file } = req.files;
			cloudinary.v2.uploader.upload(
				file.tempFilePath,
				{ folder: "store", angle: "270" },
				async (error, result) => {
					if (error) console.log(error);
					removeImage(file.tempFilePath);
					res.status(200).json({
						message: "Image uploaded Succesfully",
						payload: result.secure_url,
					});
				}
			);
		} catch (error) {
			return next(error);
		}
	},
	addToCart: async (req, res, next) => {
		try {
			const { product_id } = req.params;
			const product = await Product.findById(product_id);
			const user = await User.findById(req.user._id);
			if (!product)
				return next(
					new ErrorResponse(
						"Product with given id was not found",
						400
					)
				);

			let match;
			user.cart.forEach((id) => {
				if (id.equals(product._id)) match = true;
			});

			if (match)
				return next(
					new ErrorResponse("Product already exists in the cart", 400)
				);
			product.chosenProduct = req.body;
			await product.save();
			console.log(product.chosenProduct);
			user.cart.push(product);
			await user.save();
			res.status(200).json({
				message: "Succesfully added product to cart",
				payload: user,
			});
		} catch (error) {
			return next(error);
		}
	},
	removeFromCart: async (req, res, next) => {
		try {
			const { product_id } = req.params;
			const product = await Product.findById(product_id);
			const user = await User.findById(req.user._id);
			if (!product)
				return next(
					new ErrorResponse(
						"Product with given id was not found",
						400
					)
				);

			let match;
			user.cart.forEach((id, index) => {
				if (id.equals(product._id)) user.cart.splice(index, 1);
				match = true;
			});

			if (!match) return next(new ErrorResponse("Error occured", 400));

			await user.save();
			res.status(200).json({
				message: "Succesfully removed product from the cart",
				payload: user,
				id: product_id,
			});
		} catch (error) {
			return next(error);
		}
	},
	checkout: async (req, res, next) => {
		try {
			const { cartTotal, coupon_id } = req.body;
			console.log(coupon_id);
			if (coupon_id) {
				await Coupon.findByIdAndDelete(coupon_id);
			}
			const user = await User.findById(req.user._id);
			if (user.wallet >= cartTotal) {
				user.wallet -= cartTotal;
				user.cart.map((element) => {
					user.cart.pop();
				});
				await user.save();
			} else {
				res.status(400).json({ message: "Not enough money" });
			}
			res.status(200).json({ message: "Succesfully purchased products" });
		} catch (error) {
			return next(error);
		}
	},
	createCoupon: async (req, res, next) => {
		try {
			const { name, power } = req.body.data;
			const coupon = await Coupon.create({ name, power });
			res.status(200).json({
				message: "Succesfully generated coupon",
				payload: coupon,
			});
		} catch (error) {
			return next(error);
		}
	},
	getCoupons: async (req, res, next) => {
		try {
			const coupons = await Coupon.find();
			res.status(200).json({
				message: "Succesfully granted coupons",
				payload: coupons,
			});
		} catch (error) {
			return next(error);
		}
	},
	webhook: async (req, res, next) => {
		try {
			const rawBody = req.rawBody;
			const signature = req.headers["x-cc-webhook-signature"];
			const webhookSecret = "49f8a15a-6b38-43eb-b50c-8bdf4172a787";
			const event = Webhook.verifyEventBody(
				rawBody,
				signature,
				webhookSecret
			);

			if (event.type === "charge:pending") {
				// TODO
				// user paid, but transaction not confirm on blockchain yet
				console.log(event);
			}

			if (event.type === "charge:confirmed") {
				// TODO
				// all good, charge confirmed
			}

			if (event.type === "charge:failed") {
				// TODO
				// charge failed or expired
			}

			res.json({ success: event.id });
		} catch (error) {
			return next(error);
		}
	},
	status: async (req, res, next) => {
		try {
			let newObj = JSON.parse(JSON.stringify(req.body));
			if (newObj.status == "100") {
				console.log(newObj);
				console.log(newObj);
				console.log(newObj.amount1);
				Number(newObj.amount1);
				console.log("passed");
				console.log(newObj.amount1);
				const user = await User.findOne({email: newObj.email});
				console.log("testttt");
				user.wallet = user.wallet + Number(newObj.amount1);
				await user.save();
				console.log(user.wallet);
			}
			res.status(200).json({ message: req.body });
		} catch (error) {
			console.log(error);
			return next(error);
		}
	},
	transaction: async (req, res, next) => {
		try {
			const { data } = req.body;
			const options = {
				currency1: "USD",
				currency2: data.payload.currency,
				amount: data.payload.price,
				buyer_email: data.email,
			};
			let response = await client.createTransaction(options);
			res.status(200).json({ response });
		} catch (error) {
			return next(error);
		}
	},
};

const removeImage = (path) => {
	fs.unlink(path, (error) => {
		if (error) console.log(error);
	});
};

export default productController;
