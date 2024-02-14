const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Muestra la latencia del bot'),
	
    async run(client, interaction) {
		
        const icon = interaction.user.displayAvatarURL();
        const name = interaction.user.username;
        const server = interaction.guild.name
        const user = interaction.user
        const tag = interaction.user.tag;

        const embed = new EmbedBuilder()
        .setTitle('**`Momo®`** ✅')
        .setDescription(`**\`LATENCY: ${client.ws.ping} ms\`**`)
        .setColor("#2b2d31")
        .setFooter({ text: `${server} | ${name}`, iconURL: icon })
        
      return interaction.reply({ embeds: [embed] })

      
    }
}
