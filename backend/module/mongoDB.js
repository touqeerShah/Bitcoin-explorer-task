const mongoose = require("mongoose");

/**
 * it will run before every thing and it should be connected
 * @param {*} url mongoDB url
 * @returns
 */
module.exports.connectMongoDB = async (url) => {
  console.log("url", url);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Bitcoin Database Connected"))
    .catch((err) => console.log(err));
};
