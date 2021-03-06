/* category-routes.js: Functions for the "/api/categories" endpoint. */

const router = require("express").Router();
const { Category, Product } = require("../../models");

// get all categories, including their associated products
router.get("/", (req, res) => {
    Category.findAll({
        include: [{
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"]
        }]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one category by its id
router.get("/:id", (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"]
        }]
    })
    .then(dbCategoryData => {
        if (!dbCategoryData)
            return res.status(404).json({ message: "No Category found with this id" });
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    // create a new category
});

router.put("/:id", (req, res) => {
    // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
    // delete a category by its `id` value
});

module.exports = router;
