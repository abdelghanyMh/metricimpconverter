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
        if (!initUnit && !initNum) {
            res.send('invalid number and unit');
            return;
        } else if (!initUnit) {
            res.send('invalid unit')
            return;
        } else if (!initNum) {
            res.send('invalid number');
            return;
        }

        let returnNum = convertHandler.convert(initNum, initUnit);
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