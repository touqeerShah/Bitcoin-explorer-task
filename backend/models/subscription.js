const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const subscription = new Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true,
    },
    subscription: [{
        hash: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        timestamps: { type: Date, default: Date.now }
    }],
});

module.exports = mongoose.model("Subscription", subscription);
