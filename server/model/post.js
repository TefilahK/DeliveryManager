const mongoose = require('mongoose');
// const debug = require("debug")('lab7:model-package');
// const uniqueValidator = require('mongoose-unique-validator');

// const Schema = mongoose.Schema;
module.exports = (db) => {
let postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  post: { type: String, required: true },
  authorName: { type: String, required: true },
  authorImg: { type: String, required: true },
  img: { type: String, },
  date: Date,
  created_at: Date,
 
});

postSchema.statics.CREATE = async function(blog) {
  return this.create({
    title: blog[0],
    post: blog[1],
    authorName: blog[2],
    authorImg: blog[3],
    img: blog[4],
    date:blog[5],
  });
};

// on every save, add the date
postSchema.pre('save', async function(next) {
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

postSchema.statics.REQUEST = async function() {
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

  // There is no callback - bring requested at once
  // debug(`request: without callback: ${JSON.stringify(args)}`);
  return this.find(...args).exec();
}
//delete
//update

  db.model("Post", postSchema); // if model name === collection name
}
