import ErrorResponse from "../utils/ErrorResponse.js";

const ErrorHandler = (err, req, res,next) => {
	let error = { ...err };
	error.message = err.message;

	if (err.code === 11000) {
		let message;
		if (Object.keys(err["keyValue"])[0] === "username") {
			message = "Username already taken";
		} else if (Object.keys(err["keyValue"])[0] === "email") {
			message = "Email already taken";
		} else if (Object.keys(err["keyValue"])[0] === "name") {
			message = "Product name already taken";
		}
		error = new ErrorResponse(message, 400);
	}

	if (err.name === "ValidationError") {
		let message = {
			main: Object.values(err.errors).map((val) => val.properties),
			detailed: Object.values(err.errors).map((val) => val.message),
		};
		error = { message };
	}

	res.status(error.statusCode || 500).json({
		message: error.message || "Server error",
	});
};

export default ErrorHandler;
