const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const { momoID, token } = require("../core/Client)");

const commands = [];
const slashcommandsFiles = fs.readdirSync(`./Slashcmd`).forEach((subcarpetas) => {
  const slashcommandsFiles = fs.readdirSync(`./Slashcmd/${subcarpetas}`).filter((file) => file.endsWith("js"));

  for (const file of slashcommandsFiles) {
    const slash = require(`./Slashcmd/${subcarpetas}/${file}`);
    commands.push(slash.data.toJSON());
  }
});

const rest = new REST({ version: "10" }).setToken(nomoToken);

async function createSlash() {
  try {
    await rest.put(Routes.applicationCommands(momoID), {
      body: commands
    });
    console.log("Slash - Commands agregados".green);
  } catch (e) {
    console.error(e);
  }
}

createSlash();
