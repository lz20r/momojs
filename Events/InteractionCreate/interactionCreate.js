const momo = require("../../core/client");
momo.on("interactionCreate", async(interaction) => {
	
	if(interaction.channel.type === 'dm') return;
try{

  if(!interaction.isCommand()) return;
    const slashcmd = momo.slashcommands.get(interaction.commandName);
    
	if(!slashcmd) return;
    await slashcmd.run(momo, interaction);
  } catch(e) {
    console.error(e);
  }

}); 
