const Subscription = require("../models/subscription");
const { Response } = require("../classes");

/**
 * add item into Subscription which user want to notify
 * @param {*} req
 * @param {*} res
 */
module.exports.addAndUpdateSubscription = async (req, res) => {
  const { email, hash } = req.body;
  try {
    let subscriptionRecord = await Subscription.aggregate([
      {
        $match: {
          email: email,
        },
      },
      {
        $unwind: "$subscription",
      },
      {
        $sort: {
          "subscription.timestamps": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          email: {
            $first: "$email",
          },
          subscription: {
            $push: "$subscription",
          },
        },
      },
    ]);
    if (subscriptionRecord.length == 0) {
      subscriptionRecord = new Subscription({
        email,
      });
      subscriptionRecord.subscription.push({ hash });
      await subscriptionRecord.save();
    } else {
      // check Subscription is not already exist in collection
      let index = -1;
      const isHashExist = (subscription) => subscription.hash == hash;
      index = subscriptionRecord[0].subscription.findIndex(isHashExist);
      if (index < 0) {
        // it not exist then add into it else return error
        subscriptionRecord[0].subscription.push({ hash });

        await Subscription.updateOne(
          {
            email: email,
          },
          {
            subscription: subscriptionRecord[0].subscription,
          }
        );
      } else {
        // if already exist then error
        res.send(
          new Response({
            status: 403,
            message: "Hash Already Exist",
            data: subscriptionRecord[0],
          })
        );
        return;
      }
    }
    res.send(
      new Response({
        status: 200,
        message: "Successfully add",
        data: subscriptionRecord[0],
      })
    );
    // console.log("subscriptionRecord", subscriptionRecord);
  } catch (error) {
    console.log("error", error.message);
    res.send(
      new Response({
        status: error.statusCode,
        message: error.message,
        data: {},
      })
    );
  }
};

/**
 * update Subscription if it notify in websocket
 * @param {*} req
 * @param {*} res
 */
module.exports.updateStatusSubscription = async ({ email, hash }) => {
  try {
    await Subscription.updateMany(
      {
        "subscription.hash": hash,
        email: email,
      },
      {
        $set: {
          "subscription.$.isActive": false,
        },
      }
    );

    return new Response({ status: 200, message: "update add", data: {} });
    // console.log("subscriptionRecord", subscriptionRecord);
  } catch (error) {
    console.log("error", error.message);
    return new Response({
      status: error.statusCode,
      message: error.message,
      data: {},
    });
  }
};
/**
 * return all Subscription which are active
 * @param {*} req
 * @param {*} res
 */
module.exports.getSubscription = async ({ isActive }) => {
  try {
    let subscriptionRecord = await Subscription.find(
      {},
      {
        email: 1,
        subscription: {
          $elemMatch: {
            isActive: isActive,
          },
        },
      }
    )
      .populate("subscription")
      .sort({ "subscription.timestamps": -1 });

    // console.log("subscriptionRecord====>", subscriptionRecord);
    return new Response({
      status: 200,
      message: "query response",
      data: subscriptionRecord,
    });
  } catch (error) {
    console.log("error", error);
    return new Response({ status: 400, message: error.message, data: {} });
  }
};

/**
 * check Subscription isExist the did not show notify
 * @param {*} req
 * @param {*} res
 */
module.exports.getSubscriptionExist = async (req, res) => {
  try {
    const { email, hash } = req.query;

    let subscriptionRecord = await Subscription.find(
      { email },
      {
        email: 1,
        subscription: {
          $elemMatch: {
            hash: hash,
          },
        },
      }
    )
      .populate("subscription")
      .sort({ "subscription.timestamps": -1 });

    // console.log("subscriptionRecord====>", subscriptionRecord);
    res.send(
      new Response({
        status: 200,
        message: "query response",
        data: subscriptionRecord,
      })
    );
  } catch (error) {
    console.log("error", error);
    res.send(new Response({ status: 400, message: error.message, data: {} }));
  }
};

/**
 *  this used for testing add Subscription work or not
 * @param {*} req
 * @param {*} res
 */
module.exports.getSubscriptionBy = async ({ _id }) => {
  try {
    let subscriptionRecord = await Subscription.find(
      { _id },
      {
        email: 1,
      }
    ).sort({ "subscription.timestamps": -1 });

    // console.log("subscriptionRecord====>", subscriptionRecord);
    return new Response({
      status: 200,
      message: "query response",
      data: subscriptionRecord,
    });
  } catch (error) {
    console.log("error", error);
    return new Response({ status: 400, message: error.message, data: {} });
  }
};
