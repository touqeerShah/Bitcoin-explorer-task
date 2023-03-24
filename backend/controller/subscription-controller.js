const Subscription = require("../models/subscription")
const { Response } = require("../classes")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.addAndUpdateSubscription = async (req, res) => {
    const {
        deviceId,
        hash,
    } = req.body;
    try {
        let subscriptionRecord = await Subscription.aggregate([
            {
                $match: {
                    deviceId: deviceId
                }
            },
            {
                $unwind: "$subscription"
            },
            {
                $sort: {
                    "subscription.timestamps": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    deviceId: {
                        $first: "$deviceId"
                    },
                    subscription: {
                        $push: "$subscription"
                    }
                }
            }
        ])
        if (subscriptionRecord.length == 0) {
            subscriptionRecord = new Subscription({
                deviceId,
            });
            subscriptionRecord.subscription.push({ hash })
            await subscriptionRecord.save();
        } else {
            let index = -1
            const isHashExist = (subscription) => subscription.hash == hash;
            index = subscriptionRecord[0].subscription.findIndex(isHashExist)
            // console.log("index", index);
            if (index < 0) {
                subscriptionRecord[0].subscription.push({ hash })

                await Subscription.updateOne({
                    deviceId: deviceId
                }, {
                    subscription: subscriptionRecord[0].subscription
                })
            } else {
                res.send(new Response({ status: 403, message: "Hash Already Exist", data: subscriptionRecord[0] }))
                return;
            }
        }
        res.send(new Response({ status: 200, message: "Successfully add", data: subscriptionRecord[0] }))
        // console.log("subscriptionRecord", subscriptionRecord);
    } catch (error) {
        console.log("error", error.message);
        res.send(new Response({ status: error.statusCode, message: error.message, data: {} }))
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.updateStatusSubscription = async ({ deviceId, hash }) => {
    try {

        await Subscription.updateMany({
            "subscription.hash": hash,
            deviceId: deviceId
        },
            {
                '$set': {
                    'subscription.$.isActive': false
                }
            }
        )

        return (new Response({ status: 200, message: "update add", data: {} }))
        // console.log("subscriptionRecord", subscriptionRecord);
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
module.exports.getSubscription = async ({ isActive }) => {
    try {

        let subscriptionRecord = await Subscription
            .find({}, {
                deviceId: 1,
                subscription: {
                    $elemMatch: {
                        isActive: isActive
                    }
                }
            }).populate('subscription')
            .sort({ 'subscription.timestamps': -1 });


        // console.log("subscriptionRecord====>", subscriptionRecord);
        return (new Response({ status: 200, message: "query response", data: subscriptionRecord }))

    } catch (error) {
        console.log("error", error);
        return (new Response({ status: 400, message: error.message, data: {} }))

    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getSubscriptionBy = async ({ _id }) => {
    try {

        let subscriptionRecord = await Subscription
            .find({ _id }, {
                deviceId: 1
            }).sort({ 'subscription.timestamps': -1 });


        // console.log("subscriptionRecord====>", subscriptionRecord);
        return (new Response({ status: 200, message: "query response", data: subscriptionRecord }))

    } catch (error) {
        console.log("error", error);
        return (new Response({ status: 400, message: error.message, data: {} }))

    }
};
