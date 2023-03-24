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
    // try {
    //     console.log(url);
    //     const client = new MongoClient(url);
    //     // Use connect method to connect to the server
    //     await client
    //         .connect()
    //         .then(() => {
    //             console.log("Connected successfully to MongoDB");
    //         })
    //         .catch((error) => {
    //             console.log(
    //                 "Error To connect MongoDB try again after 5 second", error
    //             );
    //             process.exit(0);
    //         });

    //     return client;
    // } catch (error) {
    //     console.log("Error To connect MongoDB try again after 5 second");
    // }
};
