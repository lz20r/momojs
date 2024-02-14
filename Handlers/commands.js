const { Collection } = require("discord.js");
const { getFiles } = require("./getFiles");

module.exports = async (client) => {
  client.commands = new Collection();
  client.slashcommands = new Collection();

  const commandFiles = getFiles("Comandos");
  const slashcommandsFiles = getFiles("Slashcmd");

  for (const files of commandFiles) {
    const command = require(files);
    client.commands.set(command.name, command);
  }

  for (const file of slashcommandsFiles) {
    const slash = require(file);
    client.slashcommands.set(slash.data.name, slash);
  }
    console.log("Comandos cargados".green);
};
