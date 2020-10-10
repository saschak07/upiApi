const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    withdraw: {
        type: Number
    },
    deposit: {
        type: Number
    },
    balance: {
        type: Number
    }

}, { timestamps: true})

const AccountDetails = mongoose.model('accountDetails',accountSchema)

module.exports = AccountDetails