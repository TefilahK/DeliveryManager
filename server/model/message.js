const mongoose = require('mongoose');

module.exports = (db) => {
let messageSchema = new mongoose.Schema({
    date: {
        type: Date,
      },
      sender: {
        type: String,
      },
      text: {
        type: String,
      },
      receiver:{
        type:String,
      },
      read:{
        type:Boolean
      }
});

messageSchema.statics.CREATE = async function(message) {
  return this.create({
    date:message[0],
    sender:message[1],
    receiver:message[2],
    text:message[3],
    read:message[4],
  });
};

// on every save, add the date
messageSchema.pre('save', async function(next) {
  // get the current date
  let currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at){
      this.created_at = currentDate;
  }
  next();
});

messageSchema.statics.REQUEST = async function() {
  // no arguments - bring all at once
  const args = Array.from(arguments);
  if (args.length === 0) {
      // debug("request: no arguments - bring all at once");
      return this.find({}).exec();
  }

  // perhaps last argument is a callback for every single document
  let callback = arguments[arguments.length - 1];
  if (callback instanceof Function) {
      let asynch = callback.constructor.name === 'AsyncFunction';
      // debug(`request: with ${asynch?'async':'sync'} callback`);
      args.pop();
      let cursor, user;
      try {
          cursor = await this.find(...args).cursor();
      } catch (err) { throw err; }
      try {
          while (null !== (user = await cursor.next())) {
              if (asynch) {
                  try {
                      await callback(user);
                  } catch (err) { throw err; }
              }
              else {
                  callback(user);
              }
          }
      } catch (err) { throw err; }
      return;
  }

  // request by id as a hexadecimal string
  if (args.length === 1 && typeof args[0] === "string") {
      // debug("request: by ID");
      return this.findById(args[0]).exec();
  }

  return this.find(...args).exec();
}

  db.model("Message", messageSchema); // if model name === collection name
}
