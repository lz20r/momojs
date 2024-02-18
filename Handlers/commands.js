const { Collection } = require("discord.js");
const { getFiles } = require("./getFiles");
const {momo} = require("../core/client");
const Momo = require("../core/client");

module.exports = async (momo) => {
  momo.commands = new Collection();
  momo.slashcommands = new Collection();

  const commandFiles = getFiles("Comandos");
  const slashcommandsFiles = getFiles("Slashcmd");

  for (const files of commandFiles) {
    const command = require(files);
    momo.commands.set(command.name, command);
  }

  for (const file of slashcommandsFiles) {
    const slash = require(file);
    momo.slashcommands.set(slash.data.name, slash);
  }
    console.log(`💭  [INFO]: momo commandPrefix Loaded`);
};
