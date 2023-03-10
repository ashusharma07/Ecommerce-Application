import Order from "../Models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc     create new orders
// @desc     POST /api/orders
// @desc      private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc     get order by id
// @desc     GET /api/orders/:id
// @desc      private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(401);
    throw new Error("order not found");
  }
});

// @desc     update order to paid
// @desc     PUT /api/orders/:id/pay
// @desc      private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    (order.isPaid = true), (order.paidAt = Date.now());
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      eamil_address: req.body.payer.eamil_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(401);
    throw new Error("order not found");
  }
});

// @desc     update order to delivered
// @desc     PUT /api/orders/:id/deliver
// @desc      private
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    (order.isDelivered = true), (order.deliveredAt = Date.now());

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(401);
    throw new Error("order not found");
  }
});

// @desc     get the user order
// @desc     GET /api/orders/myorder
// @desc      private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @desc     get all orders
// @desc     GET /api/orders
// @desc      private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getMyOrders,
  getOrders,
};
