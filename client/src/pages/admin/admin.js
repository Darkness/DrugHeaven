import "./admin.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	addProduct,
	attachImage,
	attachReversedImage,
} from "../../redux/productSlice";
import * as api from "../../redux/api";

const Admin = () => {
	const dispatch = useDispatch();
	const { error, success, imageURL, reversedImageURL } = useSelector(
		(state) => ({ ...state.products })
	);
	const { token } = useSelector((state) => ({ ...state.user }));

	const [toggleSubmit, setToggleSubmit] = useState(false);
	const [rotatedImage, setRotatedImage] = useState("");

	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [imageReversed, setImageReversed] = useState("");
	const [Functions, setFunctions] = useState([]);
	const [Visuals, setVisuals] = useState([]);
	const [Misc, setMisc] = useState([]);
	const [dayPrice, setDayPrice] = useState("");
	const [weekPrice, setWeekPrice] = useState("");
	const [monthPrice, setMonthPrice] = useState("");

	const [product, createProduct] = useState({
		name: "",
		image: "",
		imageReversed: "",
		details: {
			Functions: [],
			Visuals: [],
			Misc: [],
		},
		product: {
			day: {
				name: "",
				price: "",
			},
			week: {
				name: "",
				price: "",
			},
			month: {
				name: "",
				price: "",
			},
		},
	});

	const [coupon, setCoupon] = useState({
		name: "",
		power: 10,
	});
	const [triggerCoupon, setTriggerCoupon] = useState(false);

	const generateCoupon = async (e) => {
		try {
			e.preventDefault()
			if (token) {
				setCoupon({
					...coupon,
					name: [...Array(40)]
						.map(() => Math.random().toString(36)[2])
						.join(""),
				});
				setTriggerCoupon(true);
				console.log(coupon)
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const genCoupon = async () => {
			if (triggerCoupon) {
				
				await api.generateCouponAPI(token, coupon);
				setTriggerCoupon(false);
			}
		};
		genCoupon();
	}, [triggerCoupon]);

	const handleSubmit = (e) => {
		try {
			console.log('test')
			e.preventDefault();
			createProduct({
				name,
				image,
				imageReversed,
				details: {
					Functions,
					Visuals,
					Misc,
				},
				product: {
					day: {
						name: name.concat(" [1 day]"),
						price: dayPrice,
					},
					week: {
						name: name.concat(" [1 week]"),
						price: weekPrice,
					},
					month: {
						name: name.concat(" [1 month]"),
						price: monthPrice,
					},
				},
			});
			setToggleSubmit(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUploadImage = async (e) => {
		try {
			e.preventDefault();
			if (token) {
				const file = e.target.files[0];
				let formData = new FormData();
				formData.append("file", file);
				await dispatch(attachImage({ token, formData }));
				await dispatch(attachReversedImage({ token, formData }));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const inputFile = useRef(null);

	const selectFile = (e) => {
		e.preventDefault();
		inputFile.current.click();
	};

	useEffect(() => {
		if (window.innerWidth > 800 && reversedImageURL) {
			setRotatedImage(reversedImageURL);
		} else if (window.innerWidth <= 800 && imageURL) {
			setRotatedImage(imageURL);
		} else {
			setRotatedImage("");
		}
	}, [dispatch, imageURL, reversedImageURL]);

	useEffect(() => {
		if (imageURL !== "" && reversedImageURL !== "") {
			setImage(imageURL);
			setImageReversed(reversedImageURL);
		}
	}, [imageURL, dispatch, reversedImageURL]);

	useEffect(() => {
		const handleFetch = async () => {
			if (token && Object.keys(product).length !== 0 && toggleSubmit) {
				dispatch(addProduct({ token, product }));
				console.log(product);
			}
			setToggleSubmit(false);
		};
		handleFetch();
	}, [dispatch, product]);

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

	return (
		<>
			<Navbar />
			<main id="admin">
				<aside>
					<form action="" autoComplete="off" onSubmit={handleSubmit}>
						<section>
							<div
								id="product-image-area"
								style={{
									backgroundImage: `url(${rotatedImage})`,
								}}
							></div>
						</section>
						<section id="product-form-area">
							<h1>Create product</h1>
							<fieldset>
								<label htmlFor="">Name: </label>
								<input
									type="text"
									placeholder="Enter name of the product"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</fieldset>
							<fieldset>
								<label htmlFor="">Functions: </label>
								<input
									type="text"
									placeholder="Seperate with coma"
									value={Functions}
									onChange={(e) =>
										setFunctions(e.target.value.split(","))
									}
								/>
							</fieldset>
							<fieldset>
								<label htmlFor="">Visuals: </label>
								<input
									type="text"
									placeholder="Seperate with coma"
									value={Visuals}
									onChange={(e) =>
										setVisuals(e.target.value.split(","))
									}
								/>
							</fieldset>
							<fieldset>
								<label htmlFor="">Misc: </label>
								<input
									type="text"
									placeholder="Seperate with coma"
									value={Misc}
									onChange={(e) =>
										setMisc(e.target.value.split(","))
									}
								/>
							</fieldset>
							<div id="product-options-wrapper">
								<fieldset>
									<h5>[1 day]</h5>
									<div id="product-input-wrapper">
										<label htmlFor="">Price: </label>
										<input
											type="text"
											value={dayPrice}
											onChange={(e) =>
												setDayPrice(e.target.value)
											}
										/>
									</div>
								</fieldset>
								<fieldset>
									<h5>[1 week]</h5>
									<div id="product-input-wrapper">
										<label htmlFor="">Price: </label>
										<input
											type="text"
											value={weekPrice}
											onChange={(e) =>
												setWeekPrice(e.target.value)
											}
										/>
									</div>
								</fieldset>
								<fieldset>
									<h5>[1 month]</h5>
									<div id="product-input-wrapper">
										<label htmlFor="">Price: </label>
										<input
											type="text"
											value={monthPrice}
											onChange={(e) =>
												setMonthPrice(e.target.value)
											}
										/>
									</div>
								</fieldset>
							</div>
							{error && Array.isArray(error) ? (
								error.map((err, index) => (
									<span id="admin-error" key={index}>
										{err}
									</span>
								))
							) : (
								<span id="admin-error">{error}</span>
							)}
							<button id="uploadImage" onClick={selectFile}>
								Upload image
							</button>
							<input
								type="file"
								style={{ display: "none" }}
								ref={inputFile}
								onChange={handleUploadImage}
							/>
							<div id="product-btn-area">
								<button type="submit" id="product-create">
									Create product
								</button>
								<Link to="/" id="back">
									Back
								</Link>
							</div>
						</section>
					</form>
				</aside>
				<aside>
					<form action="" autoComplete="off">
						<input
							type="text"
							placeholder="Coupon"
							value={coupon.name}
							readOnly
						/>
						<select
							name="coupon"
							id="cars"
							onChange={(e) =>
								setCoupon({ ...coupon, power: Number(e.target.value)})
							}
						>
							<option value="10">10%</option>
							<option value="20">20%</option>
							<option value="30">30%</option>
							<option value="40">40%</option>
							<option value="50">50%</option>
							<option value="60">60%</option>
							<option value="70">70%</option>
							<option value="80">80%</option>
							<option value="90">90%</option>
							<option value="100">100%</option>
						</select>
						<button
							id="product-generate-token"
							onClick={generateCoupon}
						>
							Generate coupon
						</button>
					</form>
				</aside>
			</main>
			<Footer />
		</>
	);
};

export default Admin;
