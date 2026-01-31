const express = require('express');
const { register, login, me } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const { registerValidator, loginValidator } = require('../validators/authValidators');
const validateRequest = require('../middlewares/validateRequest');


const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post('/login', loginValidator, validateRequest, login);
router.get('/me', authenticate, me);



module.exports = router;