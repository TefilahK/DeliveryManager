const express = require('express');
const router = express.Router();
const debug = require('debug')('lab7:index');

/* GET home page. */
router.get('/', async (req, res) => {
    debug('requested');
    console.log(req.session.count+" "+req.session.userName);
    req.session.count++;
    res.render('index', { title: 'Express',
                          count: req.session.count,
                          userName: req.session.userName });
});

router.get('/logout', async (req, res) => {
    debug('logging out');
    req.logOut();
    res.redirect('/login');
});

module.exports = router;
