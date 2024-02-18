const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'historialPrefix',
    category: 'Public',
    description: 'Command for showing the prefix history of the server.',
    alias: ['hp', 'prefixhistory', 'prefixes', 'historialprefix', 'historialprefixes', 'hprefix', 'HP'],
    async execute(message, args, momo) {
        try {
            const guildId = message.guild.id;
            const username = message.author.username;

            // Retrieve prefix change history from the historialPrefix table
            const [history] = await momo.db.execute("SELECT * FROM historialPrefix WHERE guildId = ?", [guildId]);
            console.log(history);
            if (history.length === 0) {
                replyembed = new EmbedBuilder()
                    .setTitle(`Prefix History for Server **${message.guild.name}**`)
                    .setColor(0x2f3136)
                    .setTimestamp()
                    .setDescription(`<:momowarn:1206682132311842878> **No entries found.**`)
                    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                
                const reply = await message.channel.send({ embeds: [replyembed] });
                setTimeout(() => reply.delete(), 15000);
                return;
            } 

            const embed = new EmbedBuilder()
                .setTitle(`Prefix History for Server **${message.guild.name}**`)
                .setColor(0x2f3136)
                .setTimestamp()
                .setDescription(`**Prefixes:**\n\n${history.map(entry => `\`${entry.oldPrefix}\` changed to \`${entry.newPrefix}\` by <@${entry.userid}> on ${entry.fecha}`).join('\n')}`)
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
            
            // Enviar embed al usuario que ejecutó el comando
            message.channel.send({ embeds: [embed] });

            // Escribir historial en un archivo JSON
            const dataFolderPath = path.join(__dirname, '..', '..', 'Momo Data', 'MomoPrefix');
            const historialFilePath = path.join(dataFolderPath, 'MomoHistoryPrefix.json');

            // Asegurarse de que la carpeta 'Momo Data' exista
            if (!fs.existsSync(dataFolderPath)) {
                fs.mkdirSync(dataFolderPath, { recursive: true });
            }

            const historialJSON = history.map(entry => ({ 
                id: entry.id,
                guildId: entry.guildId,
                oldPrefix: entry.oldPrefix,  
                newPrefix: entry.newPrefix,
                userid: entry.userid,
                fecha: entry.fecha
            }));

            fs.writeFileSync(historialFilePath, JSON.stringify(historialJSON, null, 4));

            // ID del canal específico donde quieres enviar el historial de prefijos
            const specificChannelId = '1208566719338258482';

            // Buscar el canal por ID
            const specificChannel = message.guild.channels.cache.get(specificChannelId);

            // Verificar si el canal existe y enviar el mensaje
            if (specificChannel) {
                specificChannel.send({ content: `Historial de prefijos actualizado en **${message.guild.name}**`, embeds: [embed] });
            } else {
                message.channel.send(`El canal con ID ${specificChannelId} no se encontró en este servidor.`);
            }
        } catch (error) {
            console.error(error); 
            const errorReply = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    "<:momowarn:1206682132311842878> There was an error retrieving the prefix history due to a database issue."
                )
                await message.channel.send({ embeds: [errorReply] });
            setTimeout(() => errorReply.delete(), 5000);

            const ErrorEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    `**Error executing the command**\n- \`\`\`${error.command}\`\`\`\n\n` +
                    `**ErrMessage:**\n - \`\`\`${error.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${error.stack}\`\`\`\n`
                );
            const embedMessage = await message.channel.send({ embeds: [ErrorEmbed] });
            setTimeout(() => embedMessage.delete(), 10000);
        }
    } 
};
