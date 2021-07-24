'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

    let convertHandler = new ConvertHandler();
    app.get('/api/convert', ((req, res) => {
        let input = req.query.input;
        let initNum = convertHandler.getNum(input)
        let initUnit = convertHandler.getUnit(input);

        // handel invalid input
        if (initUnit === undefined && initNum === undefined)
            res.send('invalid Number And Unit values ! ');
        else if (initUnit === undefined)
            res.send('invalid unit value!')
        else if (initNum === undefined)
            res.send('invalid Number value!');
        let returnNum = convertHandler.convert(initNum, initUnit.toLowerCase());
        let returnUnit = convertHandler.getReturnUnit(initUnit);

        res.json({
                initNum,
                initUnit,
                returnNum,
                returnUnit,
                string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
            }


        );

    }));


};