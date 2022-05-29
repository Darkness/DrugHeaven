import "./cartItem.css";
import { Link } from "react-router-dom";
import PlusIcon from "../../svgs/Plus";
import MinusIcon from "../../svgs/Minus";
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart, clearStatus } from "../../redux/productSlice";
import { getUser,removeItemFromCart } from "../../redux/userSlice";
import {useEffect} from 'react'
import * as api from '../../redux/api'

const CartItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const { token,cartTotal } = useSelector((state) => ({ ...state.user }));
	const { success } = useSelector((state) => ({ ...state.products }));


	const removeFromCart = async () => {
		try {
			if(token) {
				dispatch(removeItemFromCart(cartItem))
				await api.removeFromCartAPI(token,cartItem._id)
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if(success !== '' && success !== null) {
			dispatch(getUser(token));
			dispatch(clearStatus())
		}
	},[dispatch,success])

	useEffect(() => {
		dispatch(clearStatus())
	},[dispatch])

	return (
		<article id="cartItem">
			<aside id="leftCartItem" style={{backgroundImage: `url(${cartItem.image})`}}></aside>
			<aside id="rightCartItem">
				<div>
					<div id="infoWrapper">
						<h4>Name:</h4>
						<span>{cartItem.name}</span>
					</div>
					<div id="infoWrapper">
						<h4>Each:</h4>
						<span>{cartItem.chosenProduct.price}</span>
					</div>
				</div>
				<div>
					<div id="infoWrapper">
						<h4>Product:</h4>
						<span>{cartItem.chosenProduct.name}</span>
					</div>
				</div>
				<div id="cartItemBTNArea">
					<Link to={`/details/${cartItem._id}`}>
						<span>Details</span>
					</Link>
					<button onClick={removeFromCart}>
						<span>Remove</span>
					</button>
				</div>
			</aside>
		</article>
	);
};

export default CartItem;
