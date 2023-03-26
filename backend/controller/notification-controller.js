const Notifications = require("../models/notification");
const { Response } = require("../classes");

/**
 *  add item into notification collection
 *  this function is call into websocket client
 */
module.exports.addNotification = async ({ email, notify }) => {
  try {
    const notifications = new Notifications({
      email,
      notify,
    });

    await notifications.save();

    return new Response({
      status: 200,
      message: "Successfully add",
      data: notifications,
    });
    // console.log("historyRecord", historyRecord);
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
 *  once notification is view by user change status
 * @param {*} req
 * @param {*} res
 */
module.exports.updateNotification = async (req, res) => {
  try {
    const { email, notify, isView } = req.body;

    const notifications = await Notifications.findOneAndUpdate(
      {
        email,
        notify,
      },
      {
        isView,
      }
    );
    res.send(
      new Response({
        status: 200,
        message: "Successfully updated",
        data: notifications,
      })
    );
  } catch (error) {
    // console.log("error========>", error.message);
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
 *  get all notification which are view or unview based on request
 * @param {*} req
 * @param {*} res
 */
module.exports.getNotification = async (req, res) => {
  try {
    const { email, page, isView } = req.query;

    const notifications = await Notifications.find({
      email,
      isView,
    })
      .sort({ createdAt: -1 })
      .limit(4)
      .skip(page);
    // console.log("notifications", notifications);
    res.send(
      new Response({
        status: 200,
        message: "query response",
        data: notifications,
      })
    );
  } catch (error) {
    res.send(
      new Response({
        status: error.statusCode,
        message: error.message,
        data: {},
      })
    );
  }
};
