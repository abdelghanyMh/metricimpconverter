const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
    test('Whole number input', (done) => {
        assert.equal(convertHandler.getNum('1gal'), 1, 'convertHandler should read a whole number input')
        done();
    })
    test('Decimal number input', (done) => {
        assert.equal(convertHandler.getNum('1.2km'), 1.2, 'convertHandler should correctly read a decimal number input');
        done();
    });
    test('Fractional input', (done) => {
        assert.equal(convertHandler.getNum('1/2l'), 0.5, 'convertHandler should correctly read a fractional input.');
        done();
    });
    test('Fractional input with a decimal', (done) => {
        assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8, 'convertHandler should correctly read a fractional input with a decimal.');
        done();
    });
    test('Error on a double-fraction (i.e. 3/2/3)', (done) => {
        assert.equal(convertHandler.getNum('3/2/3gal'), undefined, 'convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)');
        done();
    });
    test('Default to a numerical input of 1', (done) => {
        assert.equal(convertHandler.getNum('gal'), 1, 'convertHandler should correctly default to a numerical input of 1 when no numerical input is provided');
        done();
    });
    test('Read each valid input unit', (done) => {
        let input = [
            "gal",
            "l",
            "mi",
            "km",
            "lbs",
            "kg",
            "GAL",
            "L",
            "MI",
            "KM",
            "LBS",
            "KG",
        ];
        let output = [
            "gal",
            "L",
            "mi",
            "km",
            "lbs",
            "kg",
            "gal",
            "L",
            "mi",
            "km",
            "lbs",
            "kg",
        ];
        input.forEach(function(ele, index) {
            assert.equal(convertHandler.getUnit(ele), output[index], `${ele} should correctly read as ${output[index]}`);
        });
        done();
    });
    test('return an error for an invalid input unit.', (done) => {
        assert.equal(convertHandler.getUnit('1random'), undefined, 'convertHandler should correctly return an error for an invalid input unit.');
        done();
    });
    test('Correct return unit for each input unit', (done) => {
        let input = ["gal", "L", "mi", "km", "lbs", "kg"];
        let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
        input.forEach(function(ele, i) {
            assert.equal(convertHandler.getReturnUnit(ele), expect[i], `convertHandler should return the ${expect[i]} for ${ele} .`);
        });
        done();
    });
    test('Valid spelled-out string unit', (done) => {
        let input = ["gal", "l", "mi", "km", "lbs", "kg"];

        const units = {
            'L': 'liters',
            'gal': 'gallons ',
            'km': 'kilometers',
            'mi': 'miles',
            'kg': 'kilograms',
            'lbs': 'pounds',
        }
        Object.keys(units).forEach(
            ele => assert.equal(convertHandler.spellOutUnit(ele),
                units[ele],
                `the spelled-out string unit for ${ele} is ${units[ele]}`)
        );
        done();
    });
    test('Convert gal to L', (done) => {
        assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1, 'convertHandler should correctly convert gal to L');
        done();
    });
    test('Convert L to gal.', (done) => {
        assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1, 'convertHandler should correctly convert L to gal.');
        done();
    });
    test('Convert mi to km.', (done) => {
        assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1, 'convertHandler should correctly convert mi to km.');
        done();
    });
    test('Convert km to mi.', (done) => {
        assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1, 'convertHandler should correctly convert km to mi.');
        done();
    });
    test('Convert lbs to kg.', (done) => {
        assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1, 'convertHandler should correctly convert lbs to kg.');
        done();
    });
    test('Convert kg to lbs.', (done) => {
        assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1, 'convertHandler should correctly convert kg to lbs.');
        done();
    });
});