const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "setprefix",
    category: 'config',
    description: 'Change the prefix of this bot.',
    alias: ["Prefix", "setP", "sP", "sp", "setp", "changePrefix", "cP"],
    permissions: ["Administrator"],
    async execute(message, args, momo) {
        const dataFolderPath = path.join(__dirname, '..', '..', 'Momo Data','MomoPrefix');
        const prefixFilePath = path.join(dataFolderPath, 'MomoPrefix.json');

        // Asegurarse de que la carpeta 'Momo Data' exista
        if (!fs.existsSync(dataFolderPath)) {
            fs.mkdirSync(dataFolderPath, { recursive: true });
        }

        const guildId = message.guild.id;
        const guildName = message.guild.name;
        const userid = message.author.id;
        const username = message.author.username;
        const currentDate = new Date().toLocaleDateString(); // Fecha en formato corto

        let currentPrefix;

        try {
            // Intenta recuperar el prefijo actual de la base de datos
            const [rows] = await momo.db.execute("SELECT prefix FROM prefijos WHERE guildId = ?", [guildId]);
            if (rows.length > 0) {
                currentPrefix = rows[0].prefix;
            } else {
                currentPrefix = 'm.'; // Prefijo predeterminado
            }

            if (!args[0]) {
                const reply = await message.channel.send(`[${username}] tried to change the prefix from **${currentPrefix}** in the server **${guildName}**, but didn't specify a new one. The current prefix **${currentPrefix}** will be maintained.`);
                setTimeout(() => reply.delete(), 5000);
                return;
            }

            const newPrefix = args[0];

            // Actualizar o insertar el nuevo prefijo en la base de datos
            if (rows.length > 0) {
                await momo.db.execute("UPDATE prefijos SET prefix = ?, userid = ?, fecha = NOW() WHERE guildId = ?", [newPrefix, userid, guildId]);
            } else {
                await momo.db.execute("INSERT INTO prefijos (guildId, prefix, userid, fecha) VALUES (?, ?, ?, NOW())", [guildId, newPrefix, userid]);
            }

            const confirmationMessage = await message.channel.send({ content: `[${username}] has changed the prefix of the server **${guildName}** from **${currentPrefix}** to **${newPrefix}**.` });
            setTimeout(() => confirmationMessage.delete(), 5000);

            // Leer el archivo JSON existente, agregar/actualizar la información para este servidor y escribir de nuevo al archivo
            fs.readFile(prefixFilePath, (err, data) => {
                if (err && err.code !== 'ENOENT') throw err; // Ignorar si el archivo no existe, pero lanzar cualquier otro error
                const prefixes = data ? JSON.parse(data.toString()) : {};
                prefixes[guildId] = {
                    guildName: guildName,
                    username: username,
                    date: currentDate,
                    prefix: newPrefix
                };
                fs.writeFile(prefixFilePath, JSON.stringify(prefixes, null, 4), (err) => {
                    if (err) throw err;
                });
            });

        } catch (e) {
            const errorReply = await message.channel.send({ content: "There was an error updating the prefix due to a database issue." });
            setTimeout(() => errorReply.delete(), 5000);

            const ErrorEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    `**Error executing the command**\n- \`\`\`${e.command}\`\`\`\n\n` +
                    `**ErrMessage:**\n - \`\`\`${e.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${e.stack}\`\`\`\n`
                );
            const embedMessage = await message.channel.send({ embeds: [ErrorEmbed] });
            setTimeout(() => embedMessage.delete(), 10000);
        }
    }
};
