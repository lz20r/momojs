const momo = require("./core/client"); 
const momotoken = require("./config.json");

module.exports = momo;

require("colors")
require("./Handlers");
require("./slashcommands");
require("./Handlers/antiCrash")(momo);

momo.login(momotoken); 
