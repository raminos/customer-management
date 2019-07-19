const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    deliveryStatus: {
        type: String,
        required: true,
        default: "order taken"
    }
},{
        timestamps: true
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