/* tag-routes.js: Functions for the "/api/tags" endpoint. */

const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// get all tags, including their associated Products
router.get("/", (req, res) => {
    Tag.findAll({
        include: [{
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"]
        }]
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one tag by its id, including its associated Products
router.get("/:id", (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"]
        }]
    })
    .then(dbTagData => {
        if (!dbTagData)
            return res.status(404).json({ message: "No tag found with this id" });
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new tag
router.post("/", (req, res) => {
    // expects {tag_name} in req.body
    Tag.create({
        tag_name: req.body.tag_name
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
    // update a tag"s name by its `id` value
});

// delete a tag by its id
router.delete("/:id", (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTagData => {
        if (!dbTagData)
            return res.status(404).json({ message: "No tag found with this id" });
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
