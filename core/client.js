const momoClient = require('./Momo');
const {momoToken} = require('../config.json');
const Momo = new momoClient(); 
Momo.login(momoToken);
module.exports = Momo;
 