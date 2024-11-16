const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/authCheck');
const { getOrderAdmin, changeOrderStatus } = require('../controllers/admin');

router.put('/admin/order-status',authCheck,changeOrderStatus);
router.get('/admin/orders',authCheck,getOrderAdmin);


module.exports = router;
