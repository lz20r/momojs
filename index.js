const { Client, ClientPresence } = require("discord.js");
const client = new Client({ intents: [3276799] });
const { token } = require("./config.json");

module.exports = client;

require("colors")
require("./Handlers");
require("./slashcommands");
require("./Handlers/antiCrash")(client)

client.login(token);