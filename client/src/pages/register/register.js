import "./register.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import UserIcon from "../../svgs/User";
import LockIcon from "../../svgs/Lock";
import EyeIcon from "../../svgs/Eye";
import EmailIcon from "../../svgs/Email";
import ConfirmPasswordIcon from "../../svgs/ConfirmPassword";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearStatus } from "../../redux/userSlice";
import CheckMark from "../../svgs/checkMark";
import XMark from "../../svgs/xMark";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate("/");
	const { error, success,isLogged } = useSelector((state) => ({ ...state.user }));
	const [showPass, setShowPass] = useState(true);
	const [showPassTwo, setShowPassTwo] = useState(true);
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { username, email, password, confirmPassword } = user;
	const [focusUser, setFocusUser] = useState({});
	const handleChange = (e) => {
		let { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = (e) => {
		try {
			e.preventDefault(e);
			dispatch(register(user));
			setTimeout(() => {
				dispatch(clearStatus());
			}, [2000]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isLogged) {
			navigate("/");
		}
	}, [isLogged]);

	const handleValidate = (check) => {
		switch (check) {
			case "username":
				if (username.length > 3 && username.length < 24) {
					return true;
				}
				break;
			case "email":
				return String(email)
					.toLowerCase()
					.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
			case "password":
				return String(password).match(
					/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/
				);
			case "confirmPassword":
				if (password === confirmPassword) return true;
				break;
			default:
				return false;
		}
	};

	useEffect(() => {
		dispatch(clearStatus());
	}, [dispatch]);

	success &&
		toast.success(success, {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: "success1",
		});

	error &&
		toast.error(error, {
			position: "top-right",
			autoClose: 2000,
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
			<main id="register" onSubmit={handleSubmit}>
				<form action="" autoComplete="off">
					<h1>Register</h1>
					<span>
						Already have an account?
						<Link to="/login">Log in!</Link>
					</span>
					<fieldset>
						<label htmlFor="">USERNAME</label>
						<div className="inputWrapperThree">
							<UserIcon width="20px" color="#1b2e4b" />
							<input
								type="text"
								placeholder="e.g Joh_Doe"
								id="fixInput"
								name="username"
								value={username}
								onChange={handleChange}
								onFocus={() => setFocusUser({ username: true })}
								onBlur={() => setFocusUser({ username: false })}
							/>
						</div>
						<div
							id="preError"
							style={
								username !== "" && focusUser.username
									? { opacity: "1", height: "20px" }
									: { opacity: "0", height: "0px" }
							}
						>
							{handleValidate("username") ? (
								<CheckMark
									width="23px"
									height="14px"
									color="var(--green)"
								/>
							) : (
								<XMark
									width="15px"
									height="14px"
									color="var(--red)"
								/>
							)}
							<span
								style={
									handleValidate("username")
										? { color: "var(--green)" }
										: { color: "var(--red)" }
								}
							>
								Name should be min 2 characters long and maximum
								15
							</span>
						</div>
					</fieldset>
					<fieldset>
						<label htmlFor="">EMAIL</label>
						<div className="inputWrapperThree">
							<EmailIcon width="20px" color="#1b2e4b" />
							<input
								type="text"
								placeholder="Email"
								id="fixInput"
								name="email"
								value={email}
								onChange={handleChange}
								onFocus={() => setFocusUser({ email: true })}
								onBlur={() => setFocusUser({ email: false })}
							/>
						</div>
						<div
							id="preError"
							style={
								email !== "" && focusUser.email
									? { opacity: "1", height: "20px" }
									: { opacity: "0", height: "0px" }
							}
						>
							{handleValidate("email") ? (
								<CheckMark
									width="23px"
									height="14px"
									color="var(--green)"
								/>
							) : (
								<XMark
									width="15px"
									height="14px"
									color="var(--red)"
								/>
							)}
							<span
								style={
									handleValidate("email")
										? { color: "var(--green)" }
										: { color: "var(--red)" }
								}
							>
								Email should be valid
							</span>
						</div>
					</fieldset>
					<fieldset>
						<label htmlFor="">PASSWORD</label>
						<div className="inputWrapperThree">
							<LockIcon width="20px" color="#1b2e4b" />
							<input
								type={showPass ? "password" : "text"}
								placeholder="Password"
								name="password"
								value={password}
								onChange={handleChange}
								onFocus={() => setFocusUser({ password: true })}
								onBlur={() => setFocusUser({ password: false })}
							/>

							<div
								id="showPassword"
								onClick={() => setShowPass(!showPass)}
							>
								<EyeIcon width="20px" color="#1b2e4b" />
							</div>
						</div>
						<div
							id="preError"
							style={
								password !== "" && focusUser.password
									? { opacity: "1", height: "20px" }
									: { opacity: "0", height: "0px" }
							}
						>
							{handleValidate("password") ? (
								<CheckMark
									width="23px"
									height="14px"
									color="var(--green)"
								/>
							) : (
								<XMark
									width="15px"
									height="14px"
									color="var(--red)"
								/>
							)}
							<span
								style={
									handleValidate("password")
										? { color: "var(--green)" }
										: { color: "var(--red)" }
								}
							>
								Password should include numbers + start with
								Capital letter
							</span>
						</div>
					</fieldset>
					<fieldset>
						<label htmlFor="">CONFIRM PASSWORD</label>
						<div className="inputWrapperThree">
							<ConfirmPasswordIcon width="20px" color="#1b2e4b" />
							<input
								type={showPassTwo ? "password" : "text"}
								placeholder="Confirm password"
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleChange}
								onFocus={() =>
									setFocusUser({ confirmPassword: true })
								}
								onBlur={() =>
									setFocusUser({ confirmPassword: false })
								}
							/>

							<div
								id="showPassword"
								onClick={() => setShowPassTwo(!showPassTwo)}
							>
								<EyeIcon width="20px" color="#1b2e4b" />
							</div>
						</div>
						<div
							id="preError"
							style={
								confirmPassword !== "" &&
								focusUser.confirmPassword
									? { opacity: "1", height: "20px" }
									: { opacity: "0", height: "0px" }
							}
						>
							{handleValidate("confirmPassword") ? (
								<CheckMark
									width="23px"
									height="14px"
									color="var(--green)"
								/>
							) : (
								<XMark
									width="15px"
									height="14px"
									color="var(--red)"
								/>
							)}
							<span
								style={
									handleValidate("confirmPassword")
										? { color: "var(--green)" }
										: { color: "var(--red)" }
								}
							>
								Passwords match
							</span>
						</div>
					</fieldset>
					{handleValidate("username") &&
					handleValidate("password") &&
					handleValidate("email") &&
					handleValidate("confirmPassword") ? (
						<button type="submit">Get Started!</button>
					) : (
						<button
							disabled
							style={{
								backgroundColor: "transparent",
								border: "2px solid var(--purple)",
								color: "black",
								cursor: "not-allowed",
							}}
						>
							Get Started!
						</button>
					)}
				</form>
			</main>
			<Footer />
		</>
	);
};

export default Register;
