import "./card.css";
import { Link,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addItemToCart,clearStatus } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowIcon from "../../svgs/Arrow";
import * as api from "../../redux/api";

const Card = ({ product, search }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const [toggleBuy, setToggleBuy] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});
	const {token, error, success,isLogged } = useSelector((state) => ({
		...state.user,
	}));

	const handleAddToCart = (type) => {
		try {
			if(!isLogged) {
				navigate('/login')
			}
			switch (type) {
				case "day":
					setSelectedProduct(product.product.day);
					break;
				case "week":
					setSelectedProduct(product.product.week);
					break;
				case "month":
					setSelectedProduct(product.product.month);
					break;
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const handleRequest = async () => {
			if (Object.keys(selectedProduct).length !== 0 && token) {
				dispatch(addItemToCart({product,selectedProduct}));
				setTimeout(() => {
					dispatch(clearStatus());
				}, [1500]);
				await api.addToCartAPI(token, product._id, selectedProduct);
			}
		};
		handleRequest();
	}, [selectedProduct,dispatch,product,token]);

	useEffect(() => {
		dispatch(clearStatus());
	}, [dispatch]);

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
		product.name.includes(search) && (
			<article id="card">
				<aside
					id="topCard"
					style={{ backgroundImage: `url(${product.image})` }}
					className={toggleBuy ? "toggleTopCard" : undefined}
				></aside>
				<aside
					id="bottomCard"
					className={toggleBuy ? "toggleBottomCard" : undefined}
				>
					<div
						id="inDetails"
						className={toggleBuy ? "toggleBuy" : undefined}
					>
						<div
							id="wrapper"
							onClick={() => handleAddToCart("day")}
						>
							<h2>{product.product.day.name}</h2>
							<h3>
								Cost: <span>${product.product.day.price}</span>
							</h3>
						</div>
						<div
							id="wrapper"
							onClick={() => handleAddToCart("week")}
						>
							<h2>{product.product.week.name}</h2>
							<h3>
								Cost: <span>${product.product.week.price}</span>
							</h3>
						</div>
						<div
							id="wrapper"
							onClick={() => handleAddToCart("month")}
						>
							<h2>{product.product.month.name}</h2>
							<h3>
								Cost:{" "}
								<span>${product.product.month.price}</span>
							</h3>
						</div>
						<div
							id="closeDetails"
							onClick={() => setToggleBuy(!toggleBuy)}
						>
							<ArrowIcon />
						</div>
					</div>
					<h6>
						Name: <span>{product.name}</span>
					</h6>
					<h6>
						Starting at: <span>${product.product.day.price}</span>
					</h6>
					<div id="buttonPlace">
						<Link
							to="/"
							id="buyBTN"
							onClick={() => setToggleBuy(!toggleBuy)}
						>
							Buy
						</Link>
						<Link to={`/details/${product._id}`} id="detailsBTN">
							<span>Details</span>
						</Link>
					</div>
				</aside>
			</article>
		)
	);
};

export default Card;
