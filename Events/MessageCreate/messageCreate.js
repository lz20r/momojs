require("../../Handlers/commands");
const { EmbedBuilder } = require("discord.js");
const momo = require("../../core/client");  
const RAM_GET = require('../../core/RAM/RAMGetter');
const { Prefix } = require("../../config.json");

momo.on("messageCreate", async (message) => {
    if (message.channel.type === 'dm' || message.author.bot) { 
        return;
    } 

    let connection;
    try {
        connection = await RAM_GET.getDBConnection();
    } catch (error) {
        console.error("Error al obtener la conexiÃ³n a la base de datos:", error);
        return;
    }

    let prefix = Prefix;
    try {
        const [row] = await connection.query(`SELECT prefix FROM prefijos WHERE guildId = ?`, [message.guild.id]);
        if (row.length > 0) {
            prefix = row[0].prefix;
        }
    } catch (error) {
        console.error("Error al obtener el prefijo de la base de datos:", error);
    }

    const logChannelId = "1204154596864565259";  

    if (message.content.startsWith(`<@${momo.user.id}>`) || message.content.startsWith(`<@!${momo.user.id}>`)) {
        const embed = new EmbedBuilder()
            .setColor("#c1d5db")
            .setDescription( `
                <a:MT_moonstars:1208777470430674964> heya ${message.author}, my little momo friend\n 
                are u trying to know my prefix?? i'll show you all my prefixes, 
> <a:MT_bluehearts:1208779999700590656> ${momo.user.username} prefix  \`${Prefix}\` 
> <a:MT_bluehearts:1208779999700590656> guild prefix \`${prefix}\` 
> <a:MT_bluehearts:1208779999700590656> self prefix 
            `);
        message.channel.send({ embeds: [embed] }); 
    } 

    if (!message.content.startsWith(prefix)) {
        return;    
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd = momo.commands.find((c) => c.name === command || (c.alias && c.alias.includes(command)));
    const server_name = message.guild.name;
    const channel_name = message.channel;
    const author_name_id = message.author.id;
    const author_name = message.author.globalName;
    const author_tag = message.author;
    const command_name = cmd.name;

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
            logChannel.send({ content: `<@!1033160523044376616>`, embeds: [logEmbed], allowedMentions: { repliedUser: false } });
        } 
    } 
});
