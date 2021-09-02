const debug = require("debug")('lab7:model-user');
const mongo = require("mongoose");
const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");
const bcryptSalt=10;

// const Schema=mongoose.Schema;

module.exports = (db) => {
    // create a schema
    let schema = new mongo.Schema({
        id: { type: String, required: true, unique:true},
        name: {type: String},
        password: { type: String, required: false },
        email: { type: String, unique: true,required:true  },
        googleId:{ type: String, unique: true,required:false },
        admin: Boolean,
        address:String,
        created_at: Date,
        resetcode: {type: Number, required:false},
        phoneNumber:{type:String},
        lon:{type:String},
        lat:{type:String},
        workingToday:{type:Boolean},
        img:{type:String},
        updated_at: Date

    }, { autoIndex: false }
    );

    // custom method to add string to end of name
    // you can create more important methods like name validations or formatting
    // you can also do queries and find similar users

    schema.statics.CREATE = async function(user) {
        return this.create({
            id: user[0],
            name: user[1],
            password: user[2],
            email: user[3],
            googleId:user[4],
            admin: user[5],
            address:user[6],
            resetcode: user[7],
            phoneNumber:user[8],
            lon:user[9],
            lat:user[10],
            workingToday:user[11],
            img:user[12]
        });
    };

    // on every save, add the date
    schema.pre('save', async function(next) {
        // get the current date
        let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at){
            this.created_at = currentDate;
        }
        if (!this.isModified("password")) {
            return next();
        }
        // const encrypted = key.encrypt(this.password, 'base64');
        const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
        this.password = hash;
        next();
    });

    schema.statics.REQUEST = async function() {
        // no arguments - bring all at once
        const args = Array.from(arguments);
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch?'async':'sync'} callback`);
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
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    }

    
    //update,
    //delete


    schema.plugin(passportLocalMongoose,{ usernameField: "email" });
    db.model("User", schema); // if model name === collection name
    debug("User model created");
    
}
