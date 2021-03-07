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

// get one category by its id, including its associated products
router.get("/:id", (req, res) => {
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
            return res.status(404).json({ message: "No category found with this id" });
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new category
router.post("/", (req, res) => {
    // expects {category_name} from req.body
    Category.create({
        category_name: req.body.category_name
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a category by its id
router.put("/:id", (req, res) => {
    // expects {category_name} from req.body
    Category.update(
        {
            category_name: req.body.category_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCategoryData => {
        if (!dbCategoryData[0])
            return res.status(404).json({
                message: "No category found with this id, or the category could not be updated"
            });
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a category by its id
router.delete("/:id", (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData)
            return res.status(404).json({ message: "No category found with this id" });
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
