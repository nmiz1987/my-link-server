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

//create new user
// router.post("/", async (req, res) => {
// 	try {
// 		const item = new Item({
// 			category: req.body.category,
// 			name: req.body.name,
// 			description: req.body.description,
// 			link: req.body.link,
// 			recommended: req.body.recommended,
// 			imgSrc: req.body.imgSrc,
// 		});
// 		const newItem = await item.save();
// 		console.log("New Item Created", newItem);

// 		updateCategories();
// 		console.log("Categories list updated");

// 		res.status(201).send(newItem);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

// router.put("/updateItem/:id", getItem, async (req, res) => {
// 	res.item.category = req.body.category;
// 	res.item.name = req.body.name;
// 	res.item.description = req.body.description;
// 	res.item.link = req.body.link;
// 	res.item.recommended = req.body.recommended;
// 	res.item.imgSrc = req.body.imgSrc;
// 	try {
// 		const updateItem = await res.item.save();
// 		res.json(updateItem);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

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

// async function updateCategories() {
// 	try {
// 		let tmp = [];
// 		const arr = await Item.find();
// 		arr.forEach((item) => tmp.push(item.category));
// 		tmp = Array.from(new Set(tmp)); // remove duplicate
// 		const item = new Categories({ categories: tmp });
// 		console.log(item);
// 		await Categories.deleteMany({}); //drop old data
// 		await item.save();
// 	} catch (err) {
// 		console.log("updateCategories failed", err);
// 	}
// }

module.exports = router;
