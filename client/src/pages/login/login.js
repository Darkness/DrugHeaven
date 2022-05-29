import "./login.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import UserIcon from "../../svgs/User";
import LockIcon from "../../svgs/Lock";
import EyeIcon from "../../svgs/Eye";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearStatus } from "../../redux/userSlice.js";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { error, success,isLogged } = useSelector((state) => ({ ...state.user }));
	const [showPass,setShowPass] = useState(false)
	const [user, setUser] = useState({
		loginType: "",
		password: "",
	});

	const { loginType, password } = user;

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch(clearStatus())
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = (e) => {
		try {
			e.preventDefault();
			dispatch(login(user));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		dispatch(clearStatus());
	}, [dispatch]);

	useEffect(() => {
		if(isLogged){
			navigate('/')
		}
	},[isLogged])

	return (
		<>
			<Navbar />
			<main id="login">
				<form action="" autoComplete="off" onSubmit={handleSubmit}>
					<h1>Sign in</h1>
					<h6>Log in to your account to continue.</h6>
					<fieldset>
						<label htmlFor="">USERNAME</label>
						<div className="inputWrapperThree">
							<UserIcon width="20px" color="#1b2e4b" />
							<input
								type="text"
								placeholder="e.g Joh_Doe"
								id="fixInput"
								name="loginType"
								value={loginType}
								onChange={handleChange}
							/>
						</div>
						<span
							className="showError"
							style={
								error === "User is not registered" ||
								error === "Enter username or email"
									? { opacity: "1",maxHeight: '100px' }
									: { opacity: "0", maxHeight: '0px'}
							}
						>
							{error === "User is not registered" ||
							error === "Enter username or email"
								? error
								: ""}
						</span>
					</fieldset>
					<fieldset>
						<label htmlFor="">PASSWORD</label>
						<div className="inputWrapperThree">
							<LockIcon width="20px" color="#1b2e4b" />
							<input
								type={showPass ? 'text' : 'password'}
								placeholder="Password"
								name="password"
								value={password}
								onChange={handleChange}
							/>
							<div id="showPassword" onClick={() => setShowPass(!showPass)}>
								<EyeIcon width="20px" color="#1b2e4b" />
							</div>
						</div>
						<span
							className="showError"
							style={
								error === "Fill the form" ||
								error === "Wrong password" ||
								error === "Enter the password"
									? { opacity: "1",maxHeight: '100px' }
									: { opacity: "0",maxHeight: '0px' }
							}
						>
							{error === "Fill the form" ||
							error === "Wrong password" ||
							error === "Enter the password"
								? error
								: ""}
						</span>
					</fieldset>
					<button type="submit">Log in</button>
					<span>
						Not registered?{" "}
						<Link to="/register">Create an account</Link>
					</span>
				</form>
			</main>
			<Footer />
		</>
	);
};

export default Login;
