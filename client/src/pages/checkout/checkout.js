import "./checkout.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import BitcoinIcon from "../../svgs/Bitcoin.jsx";
import LitecoinIcon from "../../svgs/litecoin.jsx";
import TestcoinIcon from "../../svgs/Testcoin.jsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transaction } from "../../redux/userSlice";

const Checkout = () => {
	const dispatch = useDispatch();
	const { token, user,checkoutURL } = useSelector((state) => ({ ...state.user }));

	const [crypto, setCrypto] = useState({
		currency: "",
		price: "",
	});
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		try {
			e.preventDefault();
			if (token && crypto.price && crypto.currency) {
				dispatch(transaction({ token, payload: crypto, email: user.email }));
			} else if (!crypto.price) {
				setError("Enter the amount to deposit");
			} else if (!crypto.currency) {
				setError("Choose crypto");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if(checkoutURL){
			console.log('hi')
			window.location.href = checkoutURL
		}
	},[checkoutURL])

	const handleChooseCrypto = (cur) => {
		setCrypto({ ...crypto, currency: cur });
		setError("");
	};

	const handleChange = (e) => {
		setCrypto({
			...crypto,
			price: Number(e.target.value),
		});
		setError("");
	};

	return (
		<>
			<Navbar />
			<main id="checkout">
				<aside id="leftCheckout">
					<form action="" autoComplete="off" onSubmit={handleSubmit}>
						<h2>Deposit money</h2>
						<div id="inputWrapperTwo">
							<input
								type="text"
								placeholder="Enter amount to deposit, [USD]"
								value={crypto.price}
								onChange={handleChange}
							/>
						</div>
						<div id="cryptoWrapper">
							<div onClick={() => handleChooseCrypto("BTC")}>
								<BitcoinIcon
									color={
										crypto.currency === "BTC"
											? "#F7931A"
											: "var(--grey)"
									}
								/>
							</div>
							<div onClick={() => handleChooseCrypto("LTC")}>
								<LitecoinIcon
									color={
										crypto.currency === "LTC"
											? "#345D9D"
											: "var(--grey)"
									}
								/>
							</div>
							<div onClick={() => handleChooseCrypto("LTCT")}>
								<TestcoinIcon
									color={
										crypto.currency === "LTCT"
											? "#14C8FF"
											: "var(--grey)"
									}
								/>
							</div>
						</div>
						{error && <span id="checkout-error">{error}</span>}
						<div id="btnWrapperTwo">
							<button type="submit">Pay</button>
							<Link to="/cart">Back</Link>
						</div>
					</form>
				</aside>
				<aside id="rightsCheckout">
					<div id="checkoutIllustration"></div>
				</aside>
			</main>
			<Footer />
		</>
	);
};

export default Checkout;
