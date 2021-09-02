let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
var flash = require('connect-flash');
let debug = require('debug')('lab7:app'); // add using the debugger tool
let mongoose = require('mongoose');       // add mongoose for MongoDB access
let session = require('express-session'); // add session management module
let connectMongo = require('connect-mongo'); // add session store implementation for MongoDB



let index = require('./routes/index');
let route = require('./routes/route');    // it will be our controller for logging in/out
let aouth = require('./routes/aouth');
let users = require('./routes/users');
let reports = require('./routes/reports');
let posts = require('./routes/posts');
let packages = require('./routes/packages');
let messages = require('./routes/messages');
let map = require('./routes/map');
let login = require('./routes/login');
const cors = require('cors');
const keys=require('./keys')









let app = express();
(async () => {
// let User=require('./model/user');
const cookieSession = require("cookie-session");  
const passport = require('passport');
require('./config/passport-config');
require('./config/passport-Local-config');

app.use(cors());

app.use(cookieSession({
    // milliseconds of a day
    maxAge: 24*60*60*1000,
    keys:[keys.COOKIE_KEY]
}));
  
app.use(flash());
    let MongoStore = connectMongo(session);
    let sessConnStr = "mongodb+srv://Tefilah:66QxWU!wzyEiunC@cluster0.dvxs0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let sessionConnect = mongoose.createConnection();
    try {
        await sessionConnect.openUri(sessConnStr, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (err) {
        debug(`Error connecting to session backend DB: ${err}`);
        process.exit(0);
    }
//     mongoose
//   .connect(
//     `mongodb+srv://Tefilah:66QxWU!wzyEiunC@cluster0.dvxs0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     app.listen(8080);
//   })
//   .catch(err => {
//     console.log(err);
//   });
    process.on('SIGINT', async () => {
        await sessionConnect.close();
        process.exit(0);
    });

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    let secret = 'lab7 users secret'; // must be the same one for cookie parser and for session
    app.use(cookieParser(secret));

    app.use(session({
        name: 'users.sid',         // the name of session ID cookie
        secret: secret,            // the secret for signing the session ID cookie - mandatory option
        resave: false,             // do we need to resave unchanged session? (only if touch does not work)  - mandatory option
        saveUninitialized: false,  // do we need to save an 'empty' session object? - mandatory option
        rolling: true,             // do we send the session ID cookie with each response?
        store: new MongoStore({ mongooseConnection: sessionConnect }), // session storage backend
        cookie: { maxAge: 900000, httpOnly: true, sameSite: false }  // cookie parameters
        // NB: maxAge is used for session object expiry setting in the storage backend as well
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', index);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/map', map);
    app.use('/messages', messages);
    app.use('/packages', packages);
    app.use('/posts', posts);
    app.use('/reports', reports);
    app.use('/aouth',aouth);
    

    // register login controller

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
})()
    .catch(err => { debug(`Failure: ${err}`); process.exit(0); });


    
module.exports = app;
