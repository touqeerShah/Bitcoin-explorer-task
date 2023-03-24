const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const notifications = new Schema({
    deviceId: {
        type: String,
        required: true,
    },
    notify: {
        type: String,
    },
    isNewNotification: {
        type: Boolean,
        default: true
    },
    isView: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

module.exports = mongoose.model("Notifications", notifications);
