const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'order username is missing'],
    },
    number: {
        type: String,
        required: [true, 'order number is missing'],
    },
    status: {
        type: String,
        default: 'open',
    },
    totalPrice: {
        type: Number,
        required: [true, 'total price is missing'],
    },
});
const Order = mongoose.model('orders', orderSchema);
module.exports = { Order };
