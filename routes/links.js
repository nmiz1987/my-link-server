const express = require("express");
const router = express.Router();
const Item = require("../models/link");
const Categories = require("../models/categories");

// Get all lists
router.get("/", async (req, res) => {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//get one item
router.get("/:id", getItem, (req, res) => {
	res.json(res.item);
});

async function getItem(req, res, next) {
	let item;
	try {
		item = await Item.findById(req.params.id);
		if (item == null) {
			return res.status(404).json({ message: "Cannot find item" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.item = item;
	next();
}

module.exports = router;
