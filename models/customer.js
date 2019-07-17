const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    deliveryStatus: {
        type: String,
        required: true
    }
});

const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: '' 
    },
    paymentDetails: {
        type: String,
        default: ''
    },
    orders: [orderSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Customer', customerSchema);