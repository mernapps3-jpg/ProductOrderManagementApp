const express = require("express");
const {
    create,
    update,
    remove,
    getAllProducts,
    getProduct,
    getCategoriesList
} = require('../controllers/productController');
const { authenticate, authorizeRole } = require("../middlewares/authMiddleware");
const { productValidator } = require('../validators/productValidators');
const validateRequest = require("../middlewares/validateRequest");


const router = express.Router();

router.post("/", authenticate, authorizeRole("admin"), productValidator, validateRequest, create);
router.put('/:id', authenticate, authorizeRole('admin'), productValidator, validateRequest, update);
router.delete('/:id', authenticate, authorizeRole('admin'), remove);

router.get('/', authenticate, getAllProducts);
router.get('/categories', authenticate, getCategoriesList);
router.get('/:id', authenticate, getProduct);

module.exports = router;