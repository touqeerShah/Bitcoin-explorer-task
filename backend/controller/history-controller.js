const History = require("./../models/history");
const { Response } = require("../classes");

/**
 * add new search item by user
 * @param {*} req
 * @param {*} res
 */
module.exports.addAndUpdateHistory = async (req, res) => {
  const { email, searchValue } = req.body;
  // console.log("email, searchValue",email, searchValue);
  try {
    // get user record if exits and make transaction is descending order with search time
    let historyRecord = await History.aggregate([
      {
        $match: {
          email: email,
        },
      },
      {
        $unwind: "$searchResults",
      },
      {
        $sort: {
          "searchResults.timestamps": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          email: {
            $first: "$email",
          },
          searchResults: {
            $push: "$searchResults",
          },
        },
      },
    ]);
    //if  record exist then create one else update it
    if (historyRecord.length == 0) {
      historyRecord = new History({
        email,
      });
      historyRecord.searchResults.push({ search: searchValue });
      await historyRecord.save();
    } else {
      // check hash exist in search array of record
      const isHashExist = (_historyRecord) =>
        _historyRecord.search == searchValue;
      index = historyRecord[0].searchResults.findIndex(isHashExist);
      // record is new then add into collection array else just update time
      if (index == -1) {
        // if record array size is five then pop the old one and add new one
        if (historyRecord[0].searchResults.length == 5) {
          historyRecord[0].searchResults.pop();
          historyRecord[0].searchResults.push({ search: searchValue });
        } else {
          // if less then 5 just add
          historyRecord[0].searchResults.push({ search: searchValue });
        }
      } else {
        // here we check item already seacth by user and search again then just update time
        historyRecord[0].searchResults[index].timestamps = new Date();
      }
      await History.updateOne(
        {
          email: email,
        },
        {
          searchResults: historyRecord[0].searchResults,
        }
      );
    }
    res.send(
      new Response({
        status: 200,
        message: "Successfully add",
        data: historyRecord[0],
      })
    );
    // console.log("historyRecord", historyRecord);
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
 * it will return all the history of user
 * @param {*} req
 * @param {*} res
 */
module.exports.getSearchHistory = async (req, res) => {
  const { email } = req.query;

  // console.log("email", email);
  try {
    let historyRecord = await History.aggregate([
      {
        $match: {
          email: email,
        },
      },
      {
        $unwind: "$searchResults",
      },
      {
        $sort: {
          "searchResults.timestamps": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          email: {
            $first: "$email",
          },
          searchResults: {
            $push: "$searchResults",
          },
        },
      },
    ]);
    // console.log("historyRecord", historyRecord[0]);

    res.send(
      new Response({
        status: 200,
        message: "query response",
        data: historyRecord[0] ? historyRecord[0] : {},
      })
    );
  } catch (error) {
    console.log("error", error.message);
    res.send(
      new Response({
        status: error.statusCode,
        message: error.message,
        data: historyRecord[0],
      })
    );
  }
};
