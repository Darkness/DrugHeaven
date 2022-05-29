import JWT from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";

const auth = (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) return next(new ErrorResponse('Token was not found',400))
		const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
		req.user = decodedToken;
		next();
	} catch (error) {
		return next(error);
	}
};

export default auth