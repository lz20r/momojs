const momo = require("./core/client"); 
const {momoToken} = require("./config.json"); 
require("dotenv").config({path: '.env'});

module.exports = momo;

require("colors") 
require("./Handlers");
require("./slashcommands");
require("./Handlers/antiCrash")(momo);

momo.login(momoToken); 
   