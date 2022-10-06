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

module.exports = router;
