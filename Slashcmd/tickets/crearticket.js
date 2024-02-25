const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField, ChannelType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('crearticket')
    .setDescription('Crea un ticket'),
    
    async run(momo, interaction) {
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`support`)
            .setLabel("⚒️ Support")
            .setStyle(ButtonStyle.Primary),
            
            new ButtonBuilder()
            .setCustomId(`ventas`)
            .setLabel("💸 Sales")
            .setStyle(ButtonStyle.Success)
            ); 
            
            const embed = new EmbedBuilder()
            .setColor("Purple")
            .setTitle(`Tickets ${interaction.guild.name}`)
            .setDescription(
                ` Welcome to the ticket system of Zero Store, choose a category to create a ticket.`
                )
                .setFooter({
                    text: `${interaction.guild.name} ・ CopyRight ©2024`,
                    iconURL: interaction.guild.iconURL()
                })
                
                .setThumbnail(momo.user.displayAvatarURL());
                
                await interaction.channel.send({ embeds: [embed], components: [button] });
                await interaction.reply({
                    content: `El mensaje se envio correctamente`,
                    ephemeral: true,
                }); 

        momo.on('interactionCreate', async (buttonInteraction) => {
            if (!buttonInteraction.isButton()) return;

            if (buttonInteraction.customId === 'support') {
               try { 
                    await buttonInteraction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor("Purple")
                            .setTitle(`Tickets ${interaction.guild.name}`)
                            .setDescription(
                                `Hola <@${interaction.user.id}>! tu ticket de **SOPORTE** se creo correctamente en <#{channel.id}> \n\n >  馃嚭馃嚫 Hello <@${interaction.user.id}>! your **SUPPORT** ticket was successfully created in <#{channel.id}>.`)
                                .setColor("#313338")   
                                .setFooter({
                                    text: `${interaction.guild.name} ・ CopyRight ©2024`,
                                    iconURL: interaction.guild.iconURL()
                                })
                                .setThumbnail(momo.user.displayAvatarURL())
                        ],  
                        ephemeral: true 
                    });  
                    await buttonInteraction.deferReply({ embeds: [embed]}); 
               } catch (error) {
                interaction.reply({ content: `${error}`, ephemeral: true });
               }

            } else if (buttonInteraction.customId === 'ventas') {
                await buttonInteraction.reply({
                    content: `💸 Sales`,
                    ephemeral: true,
                }); 
            }  
        }); 
    } 
}
