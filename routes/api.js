const express = require('express');
const db = require('../config/db');
const { validateRequestBody } = require('../middleware/middleware');
const router = express.Router();

router.post('/register', validateRequestBody, async (req, res, next) => {
    const { user, product, purchase } = req.body;

    try {
        // Register user
        const [userResult] = await db.query(
            'INSERT INTO user_details (username, mob_num, city, state, country) VALUES (?, ?, ?, ?, ?)',
            [user.username, user.mob_num, user.city, user.state, user.country]
        );
        const userId = userResult.insertId;

        // Register product
        const [productResult] = await db.query(
            'INSERT INTO product_details (product_name, product_quantity, product_price) VALUES (?, ?, ?)',
            [product.product_name, product.product_quantity, product.product_price]
        );
        const productId = productResult.insertId;

        // Validate purchase quantity
        if (product.product_quantity < purchase.purchase_quantity) {
            return res.status(400).json({ message: 'Insufficient product quantity' });
        }

        // Register purchase
        await db.query(
            'INSERT INTO purchase_details (user_id, product_id, user_name, product_name, purchase_quantity) VALUES (?, ?, ?, ?, ?)',
            [userId, productId, user.username, product.product_name, purchase.purchase_quantity]
        );

        // Update product quantity
        await db.query(
            'UPDATE product_details SET product_quantity = product_quantity - ? WHERE id = ?',
            [purchase.purchase_quantity, productId]
        );

        res.status(201).json({ message: 'Registration and purchase successful' });
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the global error handler
    }
});

module.exports = router;
