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
        res.json(dbTagData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    // create a new tag
});

router.put("/:id", (req, res) => {
    // update a tag"s name by its `id` value
});

router.delete("/:id", (req, res) => {
    // delete on tag by its `id` value
});

module.exports = router;
