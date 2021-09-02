const mongo = require("mongoose");


let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri('mongodb+srv://Tefilah:66QxWU!wzyEiunC@cluster0.dvxs0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,  });
    } catch (err) {
        // debug("Error connecting to DB: " + err);
    }
})();
// debug('Pending DB connection');
const passport = require("passport");
require("./user")(db);
require("./package")(db);
require("./post")(db);
require("./message")(db);

module.exports = model => db.model(model);


