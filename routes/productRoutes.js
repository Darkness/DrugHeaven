import express from "express";
import productController from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import uploadImage from "../middlewares/uploadImage.js";
import checkAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

const {
	create,
	attachImage,
	addToCart,
	removeFromCart,
	getProducts,
	attachReversedImage,
	getProduct,
	checkout,
	createCoupon,
	getCoupons,
	charge,
	webhook,
	status,
	transaction
} = productController;

router.route("/").post(auth, checkAdmin, create).get(getProducts);
router.route("/getProduct/:product_id").get(getProduct);
router.route("/upload_image").post(auth, checkAdmin, uploadImage, attachImage);
router
	.route("/upload_reversed_image")
	.post(auth, checkAdmin, uploadImage, attachReversedImage);
router.route("/add_to_cart/:product_id").patch(auth, addToCart);
router.route("/remove_from_cart/:product_id").delete(auth, removeFromCart);
router.route("/checkout").patch(auth, checkout);
router
	.route("/coupon")
	.post(auth, checkAdmin, createCoupon)
	.get(auth, getCoupons);

router.route("/webhook/coin_payment").post(status)
router.route("/transaction").post(auth,transaction)

//this is routes


export default router;


