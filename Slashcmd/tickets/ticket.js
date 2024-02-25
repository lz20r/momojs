const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField, ChannelType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Crea un ticket'),

    async run(momo, interaction) {
        // Botones para crear y cerrar tickets
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`create`)
                .setLabel("Create Ticket")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder() 
                .setCustomId(`close`)
                .setLabel("Close Ticket")
                .setStyle(ButtonStyle.Danger)
        );

        // Embed para el sistema de tickets
        const embed = new EmbedBuilder()
            .setColor("Purple")
            .setTitle(`Tickets System | ${interaction.user.username}`)
            .setDescription(`Welcome to the ticket system of ${interaction.guild.name}, please click on the button to create a ticket.`)
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name} ・ CopyRight ©2024`, iconURL: interaction.user.displayAvatarURL() })
            .setThumbnail(interaction.guild.iconURL());

        await interaction.reply({ embeds: [embed], components: [button] });

        // Listener para botones (Esto debe estar fuera de este método, en tu lógica principal de manejo de interacciones)
        momo.on('interactionCreate', async (buttonInteraction) => {
            if (!buttonInteraction.isButton()) return;

            if (buttonInteraction.customId === 'create') {
                // Modal para crear ticket
                const modal = new ModalBuilder()
                    .setCustomId('createTicketModal')
                    .setTitle('Create Ticket');

                // Campo de texto para el motivo del ticket
                const ticketReason = new TextInputBuilder()
                    .setCustomId('ticketReason')
                    .setLabel('Why do you want to create a ticket?')
                    .setStyle(TextInputStyle.Paragraph);

                modal.addComponents(new ActionRowBuilder().addComponents(ticketReason));

                await buttonInteraction.showModal(modal);
            }

            if (buttonInteraction.customId === 'close') {
                const modal = new ModalBuilder()
                    .setCustomId('closeTicketModal')
                    .setTitle('Close Ticket');

                // Campo de texto para el motivo del ticket
                const ticketReason = new TextInputBuilder()
                    .setCustomId('ticketReason')
                    .setLabel('Why do you want to close the ticket?')
                    .setStyle(TextInputStyle.Paragraph);

                // Agregar el campo de texto al modal
                modal.addComponents(new ActionRowBuilder().addComponents(ticketReason));  
 
                await buttonInteraction.showModal(modal);

                // Cerrar el ticket
                const reason = buttonInteraction.fields.getTextInputValue('ticketReason');
                await buttonInteraction.channel.send(`Ticket Closed: ${reason}`);
 
                await buttonInteraction.reply({ content: 'Ticket Closed', ephemeral: true });
            }
        });
 
        momo.on('interactionCreate', async (modalInteraction) => {
            if (!modalInteraction.isModalSubmit()) return;
        
            if (modalInteraction.customId === 'createTicketModal') {
                const reason = modalInteraction.fields.getTextInputValue('ticketReason');
                // Asegúrate de que el nombre del canal no sea 'undefined' y cumpla con los requisitos de Discord (2-100 caracteres, no caracteres especiales, etc.)
                const channelName = `ticket-${modalInteraction.user.username}`.substring(0, 99); // Asegúrate de que el nombre del canal no exceda el límite máximo de caracteres
        
                try {
                    const ticketChannel = await modalInteraction.guild.channels.create({
                        name: channelName, // Asegúrate de que 'name' tiene un valor válido
                        type: ChannelType.GuildText, // Usa la enumeración ChannelType para especificar el tipo de canal
                        topic: `Ticket para ${modalInteraction.user.username}: ${reason}`,
                        permissionOverwrites: [
                            {
                                id: modalInteraction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: modalInteraction.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                            }
                        ],
                    });
                
                    await modalInteraction.reply({ 
                        content: `Ticket creado: <#${ticketChannel.id}>. Ticket para ${modalInteraction.user.username}. Ticket creado por razón: ${reason}`,
                        ephemeral: true });
                } catch (error) {
                    console.error(error);
                    await modalInteraction.reply({ content: 'Hubo un error al crear el ticket para ' + modalInteraction.user.username + '. Por favor, intenta de nuevo.', ephemeral: true });
                }
            } else if (modalInteraction.customId === 'closeTicketModal') {
                const reason = modalInteraction.fields.getTextInputValue('ticketReason');
                await modalInteraction.reply({ content: `Ticket Cerrado: <#${ticketChannel.id}> Por razón: ${reason}` + reason, ephemeral: true }); 
                await modalInteraction.channel.send(`Ticket Closed: ${reason}`); 
            }
        });
    }
};
