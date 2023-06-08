import express from 'express'
const router = express.Router()
import {addOrderItems, getMyOrders, getOrder, updateOrderToPaid, updateOrderToShipped, updateOrderToDelivered, getOrders} from '../controllers/ordersController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/mine').get(protect, getMyOrders)
router.route('/order-history').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/ship').put(protect, admin, updateOrderToShipped)
router.route('/:id/delivered').put(protect, admin, updateOrderToDelivered)


export default router
