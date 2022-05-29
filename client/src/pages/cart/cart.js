import "./cart.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import CartItem from "../../components/cartItem/cartItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getUser,
	calcCartTotal,
	checkout,
	clearStatus,
	getCoupons,
	checkCoupon,
} from "../../redux/userSlice";
import Spinner from "../../components/spinner/spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as api from "../../redux/api";

const Cart = () => {
	const dispatch = useDispatch();
	const [coupon, toggleCoupon] = useState("");
	const [discord, setDiscord] = useState("");
	const [couponResponse, toggleCouponResponse] = useState("");
	const [validCoupon, setValidCoupon] = useState(false);
	const [couponId, setCouponId] = useState("");
	const {
		isLogged,
		user,
		token,
		coupons,
		success,
		error,
		cartTotal,
		cartTotalProducts,
	} = useSelector((state) => ({
		...state.user,
	}));

	const handleCheckout = async () => {
		try {
			if (discord !== "") {
				dispatch(checkout());
				await api.checkoutAPI(token, cartTotal, couponId);
				let message = {
					user: user.name,
					email: user.email,
					productsBought: user.cart.map(
						(element) => element.chosenProduct.name
					),
					discord
				};
				await api.sendTelegram(JSON.stringify(message));
				setTimeout(() => {
					dispatch(clearStatus());
				}, [2300]);
			}else {
				toggleCouponResponse('Enter Address')
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		toggleCoupon(e.target.value);
	};

	useEffect(() => {
		let match = false;
		if (coupon) {
			coupons.map((element) => {
				if (element.name === coupon) {
					dispatch(checkCoupon(element));
					toggleCouponResponse(
						`Valid coupon, saved ${element.power}%`
					);
					setValidCoupon(true);
					match = true;
					toggleCoupon("");
					setCouponId(element._id);
				}
			});
			!match && setValidCoupon(false);
			!match && toggleCouponResponse("Invalid coupon");
		}
	}, [coupon, dispatch]);

	useEffect(() => {
		if (token) {
			dispatch(calcCartTotal());
			dispatch(getCoupons(token));
		}
	}, [dispatch, user.cart]);

	// useEffect(() => {
	// 	const chargeTest = async () => {
	// 		if (token) {
	// 			let { data } = await api.chargeAPI(token);
	// 			console.log(data.hosted_url);
	// 			console.log("hello");
	// 		}
	// 	};
	// 	chargeTest();
	// }, [token]);

	success &&
		toast.success(success, {
			position: "bottom-right",
			autoClose: 500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: "success1",
		});

	error &&
		toast.error(error, {
			position: "bottom-right",
			autoClose: 500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: "success1",
		});

	return (
		<>
			<Navbar />
			{Object.keys(user).length === 0 ? (
				<Spinner />
			) : (
				<main id="cart">
					{Object.keys(user.cart).length !== 0 && (
						<aside id="leftCart">
							<section id="cartSection">
								{user.cart &&
									user.cart.map((cartItem, index) => (
										<CartItem
											key={index}
											cartItem={cartItem}
										/>
									))}
							</section>
						</aside>
					)}
					{Object.keys(user.cart).length !== 0 ? (
						<aside id="rightCart">
							<div id="checkOut">
								<h3>
									Items: <span>{cartTotalProducts}</span>
								</h3>
								<h3>
									Total payment:{" "}
									<span
										style={
											validCoupon
												? { color: "var(--green)" }
												: { color: "var(--purple)" }
										}
									>
										{Math.round(cartTotal * 100) / 100}
									</span>
								</h3>
								<div id="couponWrapper">
									<input
										type="text"
										placeholder="Enter your Address"
										value={discord}
										onChange={(e) =>
											setDiscord(e.target.value)
										}
									/>
									<input
										type="text"
										placeholder="Enter coupon"
										value={coupon}
										onChange={handleChange}
									/>
									<span
										style={
											couponResponse
												? { opacity: 1 }
												: { opacity: 0 }
										}
										className={
											validCoupon
												? "validCoupon"
												: undefined
										}
									>
										{couponResponse}
									</span>
								</div>
								<div id="cartBTNPlace">
									<Link to="/cart" onClick={handleCheckout}>
										Checkout
									</Link>
									<Link to="/">Back</Link>
								</div>
							</div>
							<div id="cartIllustration"></div>
						</aside>
					) : (
						<span id="emptyCart">
							{success ? success : "Cart is empty"}
						</span>
					)}
				</main>
			)}

			<Footer />
		</>
	);
};

export default Cart;
