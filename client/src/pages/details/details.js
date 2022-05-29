import "./details.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/productSlice";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/spinner";

const Details = () => {
	const dispatch = useDispatch();
	const { product } = useSelector((state) => ({ ...state.products }));
	const { id } = useParams();
	const [rotateImage,setRotateImage] = useState(false)

	useEffect(() => {
		dispatch(getProduct(id));
		if(window.innerWidth > 1180)
			setRotateImage(true)
	}, [dispatch,id]);
	return (
		<>
			<Navbar />
			{Object.keys(product).length === 0 ? <Spinner/> : (
				<main id="details">
					<aside id="leftDetails">
						<div
							id="productImage"
							style={rotateImage ? {
								backgroundImage: `url(${product.imageReversed})`,
							} : {
								backgroundImage: `url(${product.image})`,
							}}
						></div>
					</aside>
					<aside id="rightDetails">
						<h1>Details</h1>
						<article id="functionality">
							{Object.keys(product.details.Functions).length !==
								0 && (
								<div className="funcWrapper">
									<h6>Functions</h6>
									<ol>
										{Object.keys(product).length !== 0 &&
											product.details.Functions.map(
												(element,index) => <li key={index}>{element}</li>
											)}
									</ol>
								</div>
							)}
							{Object.keys(product.details.Visuals).length !==
								0 && (
								<div className="funcWrapper">
									<h6>Visuals</h6>
									<ol>
										{Object.keys(product).length !== 0 &&
											product.details.Visuals.map(
												(element,index) => <li key={index}>{element}</li>
											)}
									</ol>
								</div>
							)}
							{Object.keys(product.details.Misc).length !== 0 && (
								<div className="funcWrapper">
									<h6>Misc</h6>
									<ol>
										{Object.keys(product).length !== 0 &&
											product.details.Misc.map(
												(element,index) => <li key={index}>{element}</li>
											)}
									</ol>
								</div>
							)}
						</article>
						<article id="prices">
							<aside>
								<div className="pricesWrapper">
									<h5>
										{Object.keys(product).length !== 0 &&
											product.product.day.name}
									</h5>
									<h6>
										Price:{" "}
										<span>
											{Object.keys(product).length !==
												0 &&
												`$${product.product.day.price}`}
										</span>
									</h6>
								</div>
								<div className="pricesWrapper">
									<h5>
										{Object.keys(product).length !== 0 &&
											product.product.week.name}
									</h5>
									<h6>
										Price:{" "}
										<span>
											{Object.keys(product).length !==
												0 &&
												`$${product.product.week.price}`}
										</span>
									</h6>
								</div>
								<div className="pricesWrapper">
									<h5>
										{Object.keys(product).length !== 0 &&
											product.product.month.name}
									</h5>
									<h6>
										Price:{" "}
										<span>
											{Object.keys(product).length !==
												0 &&
												`$${product.product.month.price}`}
										</span>
									</h6>
								</div>
							</aside>
							<aside>
								<div id="btnArea">
									<Link to="/">Back</Link>
								</div>
							</aside>
						</article>
					</aside>
				</main>
			)}
			<Footer />
		</>
	);
};

export default Details;
