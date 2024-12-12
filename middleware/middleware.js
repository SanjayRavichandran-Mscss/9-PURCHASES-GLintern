const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const validateRequestBody = (req, res, next) => {
    const { user, product, purchase } = req.body;
    if (!user || !product || !purchase) {
        return res.status(400).json({ message: 'Invalid request body' });
    }
    next();
};

const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
};

module.exports = {
    logger,
    validateRequestBody,
    notFoundHandler,
};
