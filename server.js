import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ExpressFileUpload from "express-fileupload";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import ErrorHandler from "./middlewares/ErrorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ExpressFileUpload({ useTempFiles: true }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use(ErrorHandler);

const server = app.listen(process.env.PORT, (error) => {
	error && console.log(`Server error: ${error}`);
	console.log("Server connected");
});


app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
});

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname,'/client/build')))
	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
} else {
	app.get("/", (req, res) => {
		res.send("API is running");
	});
}

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Database connected"))
	.catch((error) => console.log(`Database error: ${error}`));

process.on("unhandledRejection", (error) => {
	console.log(`Error occured: ${error}`);
	server.close(() => process.exit(1));
});

//    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix ../client && npm run build --prefix ../client"