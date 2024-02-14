const client = require("../../index");

client.on("interactionCreate", async(interaction) => {
	
	if(interaction.channel.type === 'dm') return;
try{

  if(!interaction.isCommand()) return;
    const slashcmd = client.slashcommands.get(interaction.commandName);
    
	if(!slashcmd) return;
    await slashcmd.run(client, interaction);
  } catch(e) {
    console.error(e);
  }

});