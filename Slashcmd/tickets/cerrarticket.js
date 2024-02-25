const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField, ChannelType, PermissionFlagsBits } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('cerrarticket')
      .setDescription('Cerra un ticket'),
       
    async execute(interaction, momo) {
      const hperm = interaction.member.roles.cache.has('1207309715999166524') || interaction.member.roles.cache.has('1207309853769338930');
  
      if (!hperm) {
        return interaction.reply({
          content: `<@${interaction.user.id}> no puedes usar el botón, no eres Staff.`,
          ephemeral: true,
        }); 
      }
  
      if (interaction.customId === 'cerrarticket') {
        const modal = new ModalBuilder() // Crear un modal
          .setTitle('Cerrar Ticket')
          .setDescription('Por favor, proporciona una razón para cerrar este ticket.')
          .addComponents(
            new TextInputBuilder() // Crear un campo de entrada de texto en el modal
              .setPlaceholder('Escribe aquí...')
              .setMinLength(1)
              .setMaxLength(200)
              .setCustomId('reason')
          )
          .setFooter('El ticket se cerrará una vez que proporciones una razón.');
  
        interaction.reply({
          content: 'Por favor, proporciona una razón para cerrar el ticket:',
          components: [modal],
          ephemeral: true,
        });
      }
  
      if (interaction.customId === 'reason') {
        const razon = interaction.values[0]; // Obtener la razón proporcionada por el usuario
  
        // Aquí debes enviar un mensaje privado al usuario que creó el ticket con la razón de cierre
        const usuarioTicket = interaction.channel.name.split('-')[0]; // Suponiendo que el canal del ticket esté nombrado como "usuario-ticket"
        const usuario = momo.users.cache.find(user => user.username === usuarioTicket);
  
        if (usuario) {
          usuario.send(`Tu ticket ha sido cerrado por la siguiente razón: ${razon}`);
        }
  
        await interaction.channel.delete();
      }
    },
  };  
