import "./navbar.css";
import { Link } from "react-router-dom";
import MenuIcon from "../../svgs/Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import CartIcon from "../../svgs/Cart";

const Navbar = () => {
	const [resNav, setResNav] = useState(false);
	const { isLogged, user } = useSelector((state) => ({ ...state.user }));



	return (
		<nav>
			<aside id="navLeft">
				<h2>Logo placeholder</h2>
			</aside>
			<aside id="navRight">
				<div id="menuWrap" onClick={() => setResNav(!resNav)}>
					<MenuIcon width="50px" color="var(--purple)" id="navMenu" />
				</div>
				<ul className={resNav ? "resNav" : undefined}>
					<li>
						<Link to="/terms">Terms</Link>
					</li>
					<li>
						<Link to="/contact">Contact</Link>
					</li>
					<li>
						<Link to="/">Products</Link>
					</li>
					{user.isAdmin && isLogged ? (
						<li>
							<Link to="/admin" style={{ color: "var(--green" }}>
								Admin
							</Link>
						</li>
					) : (
						<li style={{ display: "none" }}></li>
					)}

					{!isLogged && (
						<li>
							<Link to="/register">Sign up</Link>
						</li>
					)}
					{isLogged && (
						<li>
							<Link to='/deposit'>Deposit</Link>
						</li>
					)}
					{isLogged ? (
						<li id="specialLink">
							<Link to="/cart">
								Cart <CartIcon width="25px" color="white" />
							</Link>
						</li>
					) : (
						<li id="specialLink">
							<Link to="/login">Login</Link>
						</li>
					)}
				</ul>
			</aside>
		</nav>
	);
};

export default Navbar;
