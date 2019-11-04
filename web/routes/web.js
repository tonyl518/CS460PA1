const express = require('express');
const router = express.Router();


router.get('/', function (req, res, next) {
    res.render('index', {String: 'Hey now'});
});


router.post('/', function(req, res, next) {

    const que = req.body.ingredients;
    res.render('index', {'result':que});

});

module.exports = router;
