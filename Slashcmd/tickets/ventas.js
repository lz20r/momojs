const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data : new SlashCommandBuilder()
    .setName("ventas")
    .setDescription("Crea un ticket de venta"),

    async execute(interaction, momo) {
      const embed2 = new EmbedBuilder()
        .setTitle(`Hola ${interaction.user.username}`)
        .setColor("#313338")
        .setDescription(
          `> Te damos la bienvenida a la categoria **VENTAS**, Ahora s贸los tienes que esperar y un <@&1208457075131158558> se pondr谩 en contacto con usted en breve. \n > Te pedimos que por favor indiques que tipo de problema o duda presentas. \n\n > Te pedimos paciencia y respeto ante todo. Recuerda que todos los tickets quedan registrados en nuestra Base de Datos. \n\n  > We welcome you to the category **SALES**, now you just have to wait and a <@&1208457075131158558> will contact you shortly. \n > We ask you to please indicate what kind of problem or question you have. \n\n > We ask for your patience and respect above all. Remember that all tickets are recorded in our database.`
        )
        .setFooter({
          text: `Administracion de ZeroStore`,
          iconURL: interaction.guild.iconURL()
        });
  
      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`cerrarticket`)
          .setLabel(`Close ticket`)
          .setEmoji(`馃棏`)
          .setStyle(ButtonStyle.Danger)
      );
  
      const channelexist = interaction.guild.channels.cache.find(
        (c) => c.name === `sales-${interaction.user.username}`
      );
  
      if (channelexist) {
        const embedError = new EmbedBuilder()
            .setTitle("Ticket ZeroStore")
            .setDescription(` > 馃嚘馃嚪 <@${interaction.user.id}> Ya tienes un ticket abierto, no puedes abrir mas. \n\n > 馃嚭馃嚫 <@${interaction.user.id}> You already have one ticket open, you can't open more.`)
            .setColor("#313338");
  
        const salesButton = new ButtonBuilder()
            .setLabel("Ir al ticket")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${interaction.guild.id}/${channelexist.id}`);
  
            const buttonRow = new ActionRowBuilder().addComponents(salesButton);
      
            return interaction.reply({
              embeds: [embedError],
              components: [buttonRow],
              ephemeral: true,
          });
      }
      
        const channel = await interaction.guild.channels.create({
          name: `sale-${interaction.user.username}`,
          reason: "Ticket Sales",
          type: ChannelType.GuildText,
          parent: "1208577253819158629"
        });
        await channel.permissionOverwrites.create(channel.guild.roles.everyone, {
          ViewChannel: false,
          SendMessages: false,
        });
        await channel.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
          SendMessages: true,
        });
  
        const staff = interaction.guild.roles.cache.get(`1208457075131158558`, `1208458506521411735`)
  
      await channel.permissionOverwrites.create(staff, {
        ViewChannel: true,
        SendMessages: true,
      });
  
      const log = interaction.guild.channels.cache.get(`1208565687631482910`);
  
      const salesEmbed = new EmbedBuilder()
            .setTitle("Ticket ZeroStore")
            .setDescription(` > 馃嚘馃嚪 Hola <@${interaction.user.id}>! tu ticket de **SOPORTE** se creo correctamente en <#${channel.id}> \n\n >  馃嚭馃嚫 Hello <@${interaction.user.id}>! your **SUPPORT** ticket was successfully created in <#${channel.id}>.`)
            .setColor("#313338");
  
        const saleButton = new ButtonBuilder()
            .setLabel("Ticket")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${interaction.guild.id}/${channel.id}`);
  
        const buttonRow = new ActionRowBuilder().addComponents(saleButton);
  
        await interaction.reply({
            embeds: [salesEmbed],
            components: [buttonRow],
            ephemeral: true,
        });
  
        const saleslog = new EmbedBuilder()
        .setTitle("Logs ZeroStore")
        .setDescription(` > <@&1208457075131158558> Se creo un ticket de **SOPORTE** en <#${channel.id}>. El ticket es de <@${interaction.user.id}>`)
        .setColor("#313338");
  
    const LogsButton = new ButtonBuilder()
        .setLabel("Ir al ticket")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${interaction.guild.id}/${channel.id}`);
  
    let LogsRow = new ActionRowBuilder().addComponents(LogsButton);
  
    const logMessage = await log.send({
      embeds: [saleslog],
      components: [LogsRow],
      ephemeral: true,
  });
  
  await channel.send({
      content: `<@${interaction.user.id}>`,
      embeds: [salesEmbed],
      components: [button],
  });
  
       // A帽ade un intervalo para comprobar si el canal ha sido eliminado
       const interval = setInterval(async () => {
        const deletedChannel = interaction.guild.channels.cache.get(channel.id);
        if (!deletedChannel) {
            // Si el canal ha sido eliminado, actualiza el embedLog, deshabilita el bot贸n y det茅n el intervalo
            const updatedEmbedLog = new EmbedBuilder()
                .setTitle("Logs ZeroStore")
                .setDescription(` > <@&1208457075131158558> Se cerr贸 el ticket de **VENTAS** en <#${channel.id}>. El ticket era de <@${interaction.user.id}>`)
                .setColor("#313338");
  
            await logMessage.edit({
                embeds: [updatedEmbedLog],
                components: [new ActionRowBuilder().addComponents(LogsButton.setDisabled(true))], // Deshabilita el bot贸n
                ephemeral: true,
            });
  
            clearInterval(interval);
        }
    }, 5000); // Intervalo de verificaci贸n (en milisegundos)
  },
  };
