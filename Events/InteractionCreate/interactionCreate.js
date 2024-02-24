const momo = require("../../core/client");
const createTicket = require("../../Slashcmd/tickets/createTicket");
const { ModalBuilder, ModalSubmitInteraction, ChatInputCommandInteraction, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
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
git config --global user.email "zhiyaonaiara@gmail.com"
  git config --global user.name "lz20r"
