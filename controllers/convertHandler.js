function checkDiv(possibleFraction) {
    let nums = possibleFraction.split("/");
    if (nums.length > 2) { // 1//2 ['1','','2']
        return false;
    }
    return nums;
}

function ConvertHandler() {
    const units = {
            'L': 'liters',
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
        let result = newinput.replace(/[^.\d/]/g, '') || '1'; // 4gal return 4

        let nums = checkDiv(result);
        if (!nums) {
            return undefined;
        }
        let num1 = nums[0];
        let num2 = nums[1] || "1";
        result =
            parseFloat(num1) / parseFloat(num2);
        if (isNaN(num1) || isNaN(num2)) {
            return undefined;
        }
        return result;

    };

    this.getUnit = function(input) {
        //  remove spaces from input
        let newinput = this.removeSpace(input)

        // remove All  Numbers and symbols
        let result = newinput.replace(/[^a-zA-Z]/g, '');
        result = result.toLowerCase();

        if (result == 'l')
            result = result.toUpperCase();

        return units[result] === undefined ? undefined : result;
    };

    this.getReturnUnit = function(initUnit) {
        let result;
        if (initUnit == 'gal')
            result = 'L';
        else if (initUnit == 'L')
            result = 'gal';
        else if (initUnit == 'lbs')
            result = 'kg';
        else if (initUnit == 'kg')
            result = 'lbs';
        else if (initUnit == 'mi')
            result = 'km';
        else if (initUnit == 'km')
            result = 'mi';



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
        else if (initUnit == 'L')
            result = initNum / galToL; // liters to gallons
        else if (initUnit == 'lbs')
            result = initNum * lbsToKg; // pounds to kilograms
        else if (initUnit == 'kg')
            result = initNum / lbsToKg; // kilograms to pounds
        else if (initUnit == 'mi')
            result = initNum * miToKm; // miles to kilometers
        else if (initUnit == 'km')
            result = initNum / miToKm; // kilometers to miles

        return parseFloat(result.toFixed(5));
    };

    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

        return result;
    };

}

module.exports = ConvertHandler;