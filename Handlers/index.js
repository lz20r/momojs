const client = require("../index");

require("./commands.js")(client);
require("./Events.js")(client);
require("./antiCrash.js")(client);