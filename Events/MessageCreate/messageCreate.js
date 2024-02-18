const {prefix} = require("../../config.json");
require("../../Handlers/commands");
const { EmbedBuilder } = require("discord.js");
const momo = require("../../core/client");
 
momo.on("messageCreate", async (message) => {
    if (message.channel.type === 'dm' || message.author.bot) { 
        return;
    } 
    const [row] = await momo.db.query(`SELECT prefix FROM prefijos WHERE guildId = ?`, [message.guild.id])
 
    const prefix = row.length > 0 ? row[0].prefix : Prefix;

    const logChannelId = "1204154596864565259";  

    if (message.content.toLowerCase().startsWith("prefix") && message.author.id == "1033160523044376616") {
        return message.reply(`My prefix is ${prefix}`);
    } 
    if (!message.content.startsWith(prefix)) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd = momo.commands.find((c) => c.name === command || (c.alias && c.alias.includes(command)));
    server_name = message.guild.name 
    channel_name = message.channel
    author_name_id = message.author.id  
    author_name = message.author.globalName
    author_tag = message.author
    command_name = cmd.name 
    if (cmd) {
        message.delete(); 
 
        cmd.execute(message, args, momo); 
        const logChannel = message.guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor("#c1d5db")
                .setTitle("`Command Executed`")
                .setDescription(`Server: **${server_name}**\nChannel: **${channel_name}**\nUser: **${author_name} - ${author_tag}**\nUser ID: **${author_name_id}**\nCommand: **${command_name}**\nPrefix: **${prefix}**`)  
                .setTimestamp();
            logChannel.send({ content: `<@!1033160523044376616>`, embeds: [logEmbed], allowedMentions: { repliedUser: false } })
        } 
    }
});
 