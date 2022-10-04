require("dotenv").config();
const express = require("express");
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 5000;

const mongoose = require("mongoose");

const { ServerApiVersion } = require("mongodb");

const connection_params = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
};

mongoose.connect(process.env.DATABASE_URL, connection_params);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DataBase"));

const linksRouter = require("./routes/links");
app.use("/my-links/all", linksRouter);

const categoriesRouter = require("./routes/categories");
app.use("/my-links/categories", categoriesRouter);

app.listen(port, () => {
	console.log(`Server Started at port ${port}`);
});
