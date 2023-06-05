import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'

 // @desc Create new order
 // @route POST /api/orders
 // @access Private
 const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error("No order items")
    } else {
        const order = new Order({
            orderItems: orderItems.map((order) => ({...x, product: x.product._id, _id: undefined})), 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
 })

  // @desc Get logged in user's orders
 // @route GET /api/orders/myorders
 // @access Private
 const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
 })

// @desc Get order by ID 
// @route GET /api/orders/:id
// @access Private, admin
 const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
 })

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('Order paid')
 })

 // @desc Update order to shipped
// @route GET /api/orders/:id/ship
// @access Private
const updateOrderToShipped = asyncHandler(async (req, res) => {
    res.send('Order shipped')
 })

 // @desc Update order to delivered
// @route GET /api/orders/:id/delivered
// @access Private/admin
const updateOrderToDelivered= asyncHandler(async (req, res) => {
    res.send('Order delivered')
 })

  // @desc Get all orders as admin
// @route GET /api/orders/
// @access Private/admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('Get orders as admin')
 })

export {addOrderItems, getMyOrders, getOrder, updateOrderToPaid, updateOrderToShipped, updateOrderToDelivered, getOrders}