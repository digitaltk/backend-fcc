

let math = require('mathjs');
let regex = /(\.).+\1|(\/).+\2|[^0-9\/.]/;

function convertNumberString(string) {
   var decimal    = string.match(/\./),
       fraction   = string.match(/\//),
       isNotValid = string.match(regex),
       results;
  
  if(isNotValid) {
    return string;
  }
  
  return (decimal && fraction) ? (
     results = string.split('.'),
     parseInt(results[0]) + math.eval(results[1]))
   : math.eval(string);
};

function convertUnitString(string) {
  let reg    = /lbs|kg|mi|km|gal|L/i,
      unit   = string.match(reg);
      
  unit ? unit = unit[0] : false;
  
  return !unit || string.length > unit.length ? 'invalid unit': unit;  
};

function ConvertHandler() {
  let index, convertNum, errors = []; 
  
  this.getNum = function(input) {
    index  = input.indexOf(input.match(/[^0-9\.\/]+$/));
    index == -1 ? index = input.length : false;
    let num = input.substring(0, index) || '1';       
    return convertNumberString(num).toString();
  };
  
  this.getUnit = function(input) {
    return input.substring(index, input.length);
  };
  
  this.getReturnUnit = function(initUnit) {
    let convertUnit = convertUnitString(initUnit),
        units       = ['lbs', 'mi', 'gal','kg', 'km', 'l'],
        location    = units.indexOf(convertUnit.toLowerCase()),
        idx;
    
    location > 2 ? idx = location - 3 : idx = location + 3;

    return location == -1? convertUnit : units[idx];
  };

  this.spellOutUnit = function(unit) {
    var newUnit = unit.toLowerCase();
    let spellOut = {
      mi  : 'miles',   km : 'kilometers',
      lbs : 'pounds',  kg : 'kilograms',
      gal : 'gallons', l  : 'liters'
    };
    
    return spellOut[newUnit];
  };
  
  this.convert = function(initNum, initUnit) {
       console.log(initNum, initUnit)
    let convertUnit = convertUnitString(initUnit),
        isNotValid = initNum.match(/(\.).+\1|(\/).+\2|[^0-9\/.]/);
        convertNum  = isNotValid ? 'invalid number' : initNum;
    errors = [];
    
    convertNum == 'invalid number' ?  errors.push(convertNum) : false;
    convertUnit == 'invalid unit' ? errors.push(convertUnit) : false;
    
    const conversion = {
      gal : 3.78541,  l   : 3.78541,
      lbs : 0.453592, kg  : 0.453592,
      mi  : 1.60934,  km  : 1.60934
    }
 
    console.log(convertUnit, convertNum)
    return convertUnit == 'invalid unit' || convertNum== 'invalid number' ? convertNum 
    : convertUnit.match(/gal|lbs|mi/i) ? convertNum * conversion[convertUnit.toLowerCase()]
    : convertNum / conversion[convertUnit.toLowerCase()];
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    initNum = convertNum;
    if(!errors.length) {   
      let unitFrom = this.spellOutUnit(initUnit),
          unitTo   = this.spellOutUnit(returnUnit);
      
      return initNum + ' ' + unitFrom + ' converts to ' + Number.parseFloat(returnNum).toFixed(5) + ' ' + unitTo;  
    } else {    
      return errors.length > 1 ? 'invalid number and unit' : errors[0];
    } 
    
  };
  
}

module.exports = ConvertHandler;
