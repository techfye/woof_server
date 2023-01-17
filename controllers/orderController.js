const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const slugify = require('slugify');

const AddOrder = asyncHandler(async (req, res) => {
    const { billingInfo, shippingInfo, orderItems, itemsPrice, shippingPrice, paymentMethod, totalPrice } = req.body;
    // return;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderItems: orderItems.map((item) => {
                return {
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item.product,
                };
            }
            ),
            orderNote: billingInfo.note,

            shippingInfo: {
                address: shippingInfo.address,
                city: shippingInfo.city,
                postalCode: shippingInfo.postalCode,
                country: shippingInfo.country,
            },
            billingInfo: {
                name: billingInfo.firstName + ' ' + billingInfo.lastName,
                address: billingInfo.streetAddress + ' ' + billingInfo.streetAddress2,
                city: billingInfo.city + ' ' + billingInfo.state,
                postalCode: billingInfo.zip,
                country: billingInfo.country,
                email: billingInfo.email,
                phone: billingInfo.phone,
            },
            paymentMethod: billingInfo.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,


        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
}
);

module.exports = { AddOrder };