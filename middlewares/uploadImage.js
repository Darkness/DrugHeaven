import fs from "fs";
import ErrorResponse from "../utils/ErrorResponse.js";

const uploadImage = async (req, res, next) => {
	try {
		if (!req.files && Object.keys(req.files).length === 0)
			return next(new ErrorResponse("No files were uploaded", 400));
		let file = req.files.file;
		if (file.size > 1024 * 1024 * 4) {
			removeImage(file.tempFilePath);
			return next(new ErrorResponse("Size is too big", 400));
		}
		if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/webp" && file.mimetype !== "image/avif") {
			removeImage(file.tempFilePath);
			return next(new ErrorResponse("Invalid image type", 400));
		}
		next();
	} catch (error) {
		return next(error);
	}
};

const removeImage = (path) => {
	fs.unlink(path, (error) => {
		if (error) throw error;
	});
};

export default uploadImage;
