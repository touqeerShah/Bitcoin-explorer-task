
const Notifications = require("../models/notification")
const { Response } = require("../classes")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.addNotification = async ({ deviceId, notify }) => {

    try {
        const notifications = new Notifications({
            deviceId,
            notify
        });

        await notifications.save();

        return (new Response({ status: 200, message: "Successfully add", data: notifications }))
        // console.log("historyRecord", historyRecord);
    } catch (error) {
        console.log("error", error.message);
        return (new Response({ status: error.statusCode, message: error.message, data: {} }))
    }

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.updateNotification = async (req, res) => {
    try {
        const {
            deviceId,
            isNewNotification,
            isView
        } = req.body;

        const notifications = await Notifications.findOneAndUpdate({
            deviceId
        }, {
            isNewNotification,
            isView
        });
        res.send(new Response({ status: 200, message: "Successfully updated", data: notifications }))

    } catch (error) {
        // console.log("error========>", error.message);
        res.send(new Response({ status: error.statusCode, message: error.message, data: {} }))

    }


};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getNotification = async (req, res) => {

    try {
        const {
            deviceId,
            page,
            isView
        } = req.query;

        const notifications = await Notifications.find({
            deviceId, isView
        }).sort({ createdAt: -1 }).limit(25).skip(page);
        // console.log("notifications", notifications);
        res.send(new Response({ status: 200, message: "query response", data: notifications }))

    } catch (error) {
        res.send(new Response({ status: error.statusCode, message: error.message, data: {} }))

    }

};
