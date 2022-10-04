const express = require("express");
const router = express.Router();
const categories = require("../models/categories");

// Get all lists
router.get("/", async (req, res) => {
	try {
		const items = await categories.find();
		console.log(items);
		res.json(items);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Deleting all DB
router.delete("/superDeletion", async (req, res) => {
	console.log("deleting all DB...");
	try {
		await Item.deleteMany({});
		res.json({ message: "All the DB deleted!" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
