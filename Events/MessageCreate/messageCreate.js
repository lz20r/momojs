const {Prefix} = require("../../config.json");
require("../../Handlers/commands");
const { EmbedBuilder } = require("discord.js");
const momo = require("../../core/client");
 
momo.on("messageCreate", async (message) => {
    if (message.channel.type === 'dm' || message.author.bot) { 
        return;
    } 
    const [row] = await momo.db.query(`SELECT prefix FROM prefijos WHERE guildId = ?`, [message.guild.id])
 
    const prefix = row.length > 0 ? row[0].prefix : Prefix

    const logChannelId = "1176225809976000563"; // ID del canal de registro

    if (message.content.toLowerCase().startsWith("prefix") && message.author.id == "1033160523044376616") {
        return message.reply(`My prefix is ${prefix}`);
    }


    if (!message.content.startsWith(prefix)) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd = momo.commands.find((c) => c.name === command || (c.alias && c.alias.includes(command)));

    if (cmd) {
        message.delete();
        message.prefix = prefix
        cmd.execute(message, args, momo);
        const logChannel = message.guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor("#c1d5db")
                .setTitle("Command Executed")
                .addFields(

                    {
                        name: 'Usuario',
                        value: `${message.author.globalName} [${message.author.tag}]`,
                        inline: true
                    },

                    {
                        name: 'Run CMD',
                        value: cmd.name,
                        inline: false
                    },

                    {
                        name: 'Canal',
                        value: message.channel.name,
                        inline: false
                    },

                    {
                        name: 'Servidor',
                        value: message.guild.name,
                        inline: false
                    }

                )
                .setTimestamp();
            logChannel.send({ content: `<@!1033160523044376616>`, embeds: [logEmbed], allowedMentions: { repliedUser: false } })
        }
    }
});
