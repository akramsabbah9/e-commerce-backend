/* product-routes.js: Functions for the "/api/products" endpoint. */

const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// get all products, including their associated Category and Tag data
router.get("/", (req, res) => {
    Product.findAll({
        include: [
            { model: Category, attributes: ["id", "category_name"] },
            { model: Tag, attributes: ["id", "tag_name"] }
        ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one product by its id, including its associated Category and Tag data
router.get("/:id", (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: Category, attributes: ["id", "category_name"] },
            { model: Tag, attributes: ["id", "tag_name"] }
        ]
    })
    .then(dbProductData => {
        if (!dbProductData)
            return res.status(404).json({ message: "No product found with this id" });
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new product
router.post("/", (req, res) => {
    // expects {product_name, price, stock, category_id, tagIds[]} from req.body
    Product.create(req.body)
    .then(product => {
        // if there are product tags, bulk create with the ProductTag model
        if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id
                };
            });
            // return product tag ids
            return ProductTag.bulkCreate(productTagIdArr);
        }
        // if no product tags, just return product
        return product;
    })
    .then(productTagIds => res.status(200).json(productTagIds))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a product by its id
router.put("/:id", (req, res) => {
    // expects {product_name, price, stock, category_id, tagIds[]} from req.body
    // MUST include tagIds in req.body
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    // find all tags for this product
    .then(() => ProductTag.findAll({ 
        where: {
            product_id: req.params.id
        } 
    }))
    // update this product's tags
    .then(productTags => {
        // get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);

        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
            .filter(tag_id => !productTagIds.includes(tag_id))
            .map(tag_id => {
                return {
                    product_id: req.params.id,
                    tag_id
                };
            });
        
        // figure out which ones to remove
        const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

        // destroy old product-tag relationships and create new ones
        return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
        ]);
    })
    .then(updatedProductTags => res.json(updatedProductTags))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a product by its id
router.delete("/:id", (req, res) => {
    // delete one product by its `id` value
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData => {
        if (!dbProductData)
            return res.status(404).json({ message: "No product found with this id" });
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
