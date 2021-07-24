function ConvertHandler() {
    const units = {
            'l': 'liters',
            'gal': 'gallons ',
            'km': 'kilometers',
            'mi': 'miles',
            'kg': 'kilograms',
            'lbs': 'pounds',
        }
        //  remove spaces from input
    this.removeSpace = (input) => input.replace(/\s/g, '');

    this.getNum = function(input) {
        //  remove spaces from input
        let newinput = this.removeSpace(input)
            // remove All  lettters
        let result = newinput.replace(/[a-zA-Z]/g, ''); // 4gal return 4
        return result === '' ? 1 : result; // input = km return 1 
    };

    this.getUnit = function(input) {
        //  remove spaces from input
        let newinput = this.removeSpace(input)

        // remove All  Numbers
        let result = newinput.replace(/\d/g, '');

        return result;
    };

    this.getReturnUnit = function(initUnit) {
        let result;
        if (initUnit == 'gal')
            result = 'l'; // gallons to liters
        else if (initUnit == 'l')
            result = 'gal'; // liters to gallons
        else if (initUnit == 'lbs')
            result = 'kg'; // pounds to kilograms
        else if (initUnit == 'kg')
            result = 'lbs'; // kilograms to pounds
        else if (initUnit == 'mi')
            result = 'km'; // miles to kilometers
        else if (initUnit == 'km')
            result = 'mi'; // kilometers to miles



        return result;
    };

    this.spellOutUnit = function(unit) {
        let result = units[unit];

        return result;
    };

    this.convert = function(initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;

        if (initUnit == 'gal')
            result = initNum * galToL; // gallons to liters
        else if (initUnit == 'l')
            result = initNum / galToL; // liters to gallons
        else if (initUnit == 'lbs')
            result = initNum / lbsToKg; // pounds to kilograms
        else if (initUnit == 'kg')
            result = initNum * lbsToKg; // kilograms to pounds
        else if (initUnit == 'mi')
            result = initNum * miToKm; // miles to kilometers
        else if (initUnit == 'km')
            result = initNum / miToKm; // kilometers to miles

        return result.toFixed(6);
    };

    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

        return result;
    };

}

module.exports = ConvertHandler;