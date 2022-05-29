import "./main.css";
import { Link } from "react-router-dom";
import SearchIcon from "../../svgs/Search.jsx";
import ArrowIcon from "../../svgs/Arrow.jsx";
import Card from "../../components/card/card";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts, clearDetails } from "../../redux/productSlice";
import Spinner from "../../components/spinner/spinner";

const Main = () => {
	const dispatch = useDispatch();
	const [search, triggerSearch] = useState("");
	const [sort, triggerSort] = useState(false);

	const [dropdown, setDropdown] = useState(false);
	const { isLogged, success, error,user } = useSelector((state) => ({
		...state.user,
	}));
	const { products } = useSelector((state) => ({ ...state.products }));

	let arr;
	if (sort) {
		arr = [...products].sort((a, b) =>
			a.product.day.price > b.product.day.price ? 1 : -1
		);
	} else {
		arr = [...products].sort((a, b) =>
			a.product.day.price > b.product.day.price ? -1 : 1
		);
	}

	useEffect(() => {
		dispatch(getProducts());
		dispatch(clearDetails());
	}, [dispatch]);

	return (
		<div>
			<Navbar />
			{products.length === 0 ? (
				<Spinner />
			) : (
				<main id="main">
					<section id="sortSection">
						<h5>Total products sold: 100</h5>
						{Object.keys(user).length !== 0 && <h5>Wallet: ${Math.round(user.wallet * 100) / 100}</h5>}
						<article id="sortArticle">
							<div id="searchWrapper">
								<SearchIcon width={"20px"} color="white" />
								<input
									type="text"
									placeholder="Search..."
									value={search}
									onChange={(e) =>
										triggerSearch(e.target.value)
									}
								/>
							</div>
							<div
								id="sortWrapper"
								onMouseOver={() => setDropdown(true)}
								onMouseOut={() => setDropdown(false)}
							>
								<span>Sort by: Price</span>
								<ArrowIcon width={"20px"} color="white" />
								<div
									id="dropdown"
									className={
										dropdown
											? "triggeredDropdown"
											: undefined
									}
								>
									<ul>
										<li onClick={() => triggerSort(true)}>
											Ascending
										</li>
										<li onClick={() => triggerSort(false)}>
											Descending
										</li>
									</ul>
								</div>
							</div>
						</article>
					</section>
					<section id="cardSection">
						{products &&
							arr.map((product, index) => (
								<Card
									product={product}
									key={index}
									search={search}
								/>
							))}
					</section>
				</main>
			)}

			<Footer />
		</div>
	);
};

export default Main;
