const express = require("express");
const router = express.Router();
const Item = require("../models/message");

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

//create new item
router.post("/new", checkPassword, async (req, res) => {
	try {
		const item = new Item({
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
		});
		const newItem = await item.save();
		console.log("Message send successfully: ", newItem);

		res.status(201).send(newItem);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

//Deleting all DB - will be access only from external application for security!!
// router.delete("/superDeletion", async (req, res) => {
// 	console.log("deleting all DB...");
// 	try {
// 		await Item.deleteMany({});
// 		res.json({ message: "All the DB deleted!" });
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 	}
// });

module.exports = router;
