const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const history = new Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true,
    },
    searchResults: [{
        search: String,
        timestamps: { type: Date, default: Date.now }
    }],
});

module.exports = mongoose.model("History", history);
