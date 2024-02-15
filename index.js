const momo = require("./core/client"); 
const {momoToken} = require("./config.json");

module.exports = momo;

require("colors")
require("./Handlers");
require("./slashcommands");
require("./Handlers/antiCrash")(momo);

momo.login(momoToken); 
