const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js"); 
const {momoToken, momoID} = require("./config.json");

const commands = [];
const slashcommandsFiles = fs.readdirSync(`./Slashcmd`).forEach((subcarpetas) => {
  const slashcommandsFiles = fs.readdirSync(`./Slashcmd/${subcarpetas}`).filter((file) => file.endsWith("js"));

  for (const file of slashcommandsFiles) {
    const slash = require(`./Slashcmd/${subcarpetas}/${file}`);
    commands.push(slash.data.toJSON());
  }
});

const rest = new REST({ version: "10" }).setToken(momoToken);

async function createSlash() {
  try {
    await rest.put(Routes.applicationCommands(momoID), {
      body: commands
    });
    console.log(`💭  [INFO]: momo slashCommands Loaded`);
  } catch (e) {
    console.error(e); 
  } 
}

createSlash();
