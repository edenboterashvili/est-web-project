const mongoose = require('mongoose');
const furnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is missing'],
    },
    price: {
        type: Number,
        required: [true, 'Price is missing'],
    },
    category: {
        type: String,
        required: [true, 'Category is missing'],
    },
});
const Furniture = mongoose.model('furnitureType', furnitureSchema);
module.exports = { Furniture };
