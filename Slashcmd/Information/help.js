const { Discord, SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const slashcommands = require('../../slashcommands.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra la ayuda del bot'), 
    
    async run (momo, message, args) {
        try {
            if (message.user.bot || !message.guild) return;
            message.channel.sendTyping();//claro. obv , tonto yo, si es una interaction, obv no existen mentions aca....
            //const member = message.members.mentions.first() || message.guild.members.cache.get(args[0]) || message.member;
            const member = message.member;
            const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Select Category.')
                .addOptions([  
                    { 
                        label: `${momo.user.username}` + ' home page', 
                        description: 'Show the main information of the bot.', 
                        value: 'opcion0', 
                        emoji: '<:casa:1168862138325024859>',
                    }, 
                    { 
                        label: `${momo.user.username}`+ ' admin', 
                        description: 'Commands for moderation.', 
                        value: 'opcion1', 
                        emoji: '<:i_:1168862126232834079>',
                    },
                    { 
                        label: `${momo.user.username}`+ ' setup', 
                        description: 'Commands where to obtain information.', 
                        value: 'opcion2', 
                        emoji: '<:i_:1168862127973466142>',
                    }, 
                    { 
                        label: `${momo.user.username}` + ' antinuke', 
                        description: 'Commands for protection to you server.', 
                        value: 'opcion3', 
                        emoji: '⚠️',
                    }, 
                    { 
                        label: `${momo.user.username}` + ' music',
                        description: 'Commands for music in you server.', 
                        value: 'opcion4', 
                        emoji: '<:Icon:1177969726136266862>',
                    }, 

                    { 
                        label: `${momo.user.username}` + ' miscellaneous', 
                        description: 'Commands misc to use in you server.', 
                        value: 'opcion6', 
                        emoji: '<:i_:1168862129386950766>',
                    }, 
                    { 
                        label: `${momo.user.username}` + ' emotes', 
                        description: 'Commands emotes manager to you server.', 
                        value: 'opcion7', 
                        emoji: '<a:93c858eb5d804ba0954f0c350b610da7:1177963433925287977>',
                    },
                    { 
                        label: `${momo.user.username}` + ' premium', 
                        description: 'Commands only to user premium.', 
                        value: 'opcion5', 
                        emoji: '<:premium:1168222348953014372>',
                    },                 
                ])
                );
                const embedOptions = {
                    
                    opcion0: { 
                        title: `Commands ${momo.user.username} <:momostarw:1206266007090364486>.`,
                        description: 
                        "> <:Flechaheart:1203068677570830407> `{momo}`'s prefix is `{momoprefix}`.\n"+
                        "> <:Flechaheart:1203068677570830407> `{momoguildprefix}help <command>` to get more info about a command.\n"+
                        "> <:Flechaheart:1203068677570830407> `{momoguildprefix}invite` to invite {momo} to your server  [Momo Invite](https://discord.gg/ezfkXgekw7).\n"+
                        "> <:Flechaheart:1203068677570830407> `{momoguildprefix}support` to join the support server of {momo}. [Momo](https://discord.gg/ezfkXgekw7)\n" +
                        "> <:Flechaheart:1203068677570830407> `{momoguildprefix}donate` to donate to {momo}. [Cinammon Donation](https://www.patreon.com/cinammon)\n"+
                        "> <:Flechaheart:1203068677570830407> `{momoguildprefix}dashboard` to access your dashboard: [Dashboard](https://cinammon.es/panel).\n" +
                        "> <:Flechaheart:1203068677570830407> `{momoguildprefix}patreon` if you {momo} wanna you support {momo}? [Patreon](https://www.patreon.com/cinammon)\n"+
                        "> <:Flechaheart:1203068677570830407> `{momoguildprefix}hosting` make sure to join [Cinammon Hosting](https://discord.gg/ezfkXgekw7)\n"+
                        "> <:Flechaheart:1203068677570830407> `{momoguildprefix}guide` if you  need help with {momo}? check the guide: [Cinammon Guide](https://docs.cinammon.es)\n" 
                    },
                    
                    opcion1: { title: '<:momomoon:1206265862684672101> Administrator', 
                    description: '\`\`\`role            ban             delchannel      nuke            poll            removerole      say             unnuke          vcmove          status          roleall         setnick         setgreet-msg    setinvites      lock            unlock          autousername\`\`\`',
                    },

                    opcion2: { 
                        title: '<:momomoon:1206265862684672101> Everyone', 
                        description: '\`\`\`profile         avatar          banner          serverbanner    serveravatar    whois           permissions     server          afk             rolelist        sos             roleinfo        mc              ig              ping            uptime          bc\`\`\`',
                    },
                    
                    opcion3: { 
                        title: '⚠️ Antinuke', 
                        description: '\`\`\`antibots         antiraid        antijoins        antilinks        antiloggers     whitelist       unwhitelist      antiflood\`\`\`',
                    },
                    
                    opcion4: { 
                        title: '<:momomoon:1206265862684672101> Music', 
                        description: '\`\`\`play            skip            loop            clearqueue      stop            pause           resume          replay\`\`\`',
                    },
                    
                    opcion5: {
                        title: '<:momomoon:1206265862684672101> Premium', 
                        description: '\`\`\`add-m           setbanner       servername       setpfp          autopfp         autobanner      autocouples\`\`\`',
                    },
                    
                    opcion6: {
                        title: '<:momomoon:1206265862684672101> Miscellaneous', 
                        description: '\`\`\`firstmsg        img             randomuser      youtube         kiss            slap            ship            kiss cheek      hack\`\`\`',
                    },
                    
                    opcion7: {
                        title: '<:momomoon:1206265862684672101> Emotes', 
                        description: '\`\`\`add             jumbo           slots           rename\`\`\`',
                    },
                };
                
                const initialEmbed = new EmbedBuilder() 
                .setAuthor({ name: `${momo.user.username}`, iconURL: momo.user.displayAvatarURL() })
                .setTitle(`${momo.user.username} Home Page <:momostarw:1206266007090364486>.`)
                // .setDescription(`We have \`7\` categories and \`100\` to explore.`)
                .setDescription(
                    // `We have 7 categories and ${momo.commands.size} in total.\n`+
                    "> <:Flechaheart:1203068677570830407> `{momo}`'s prefix is `{momoprefix}`.\n"+
                    "> <:Flechaheart:1203068677570830407> `{momoguildprefix}help <command>` to get more info about a command.\n"+
                    "> <:Flechaheart:1203068677570830407> `{momoguildprefix}invite` to invite {momo} to your server  [Momo Invite](https://discord.gg/ezfkXgekw7).\n"+
                    "> <:Flechaheart:1203068677570830407> `{momoguildprefix}support` to join the support server of {momo}. [Momo](https://discord.gg/ezfkXgekw7)\n" +
                    "> <:Flechaheart:1203068677570830407> `{momoguildprefix}donate` to donate to {momo}. [Cinammon Donation](https://www.patreon.com/cinammon)\n"+
                    "> <:Flechaheart:1203068677570830407> `{momoguildprefix}dashboard` to access your dashboard: [Dashboard](https://cinammon.es/panel).\n" +
                    "> <:Flechaheart:1203068677570830407> `{momoguildprefix}patreon` if you {momo} wanna you support {momo}? [Patreon](https://www.patreon.com/cinammon)\n"+
                    "> <:Flechaheart:1203068677570830407> `{momoguildprefix}hosting` make sure to join [Cinammon Hosting](https://discord.gg/ezfkXgekw7)\n"+
                    "> <:Flechaheart:1203068677570830407> `{momoguildprefix}guide` if you  need help with {momo}? check the guide: [Cinammon Guide](https://docs.cinammon.es)\n" 
                )
                const reply = await message.channel.send({
                    embeds: [initialEmbed],
                    components: [row],
                    allowedMentions: { repliedUser: false },
                    ephemeral: true,
                });
                
                const filter = (i) => i.customId === 'select' && i.user.id === message.member.id;
                const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });
                
                collector.on('collect', async (i) => {
                    const selectedValue = i.values[0];
                    const selectedOption = embedOptions[selectedValue];
                    
                    if (i.user.id !== message.member.id) {
                        return i.reply({ content: 'You are not authorized to use these buttons.', ephemeral: true });
                    }
                    
                    if (selectedOption) {
                        const updatedEmbed = new EmbedBuilder()
                        .setAuthor({ name: `${momo.user.username}`, iconURL: momo.user.displayAvatarURL() })
                        .setTitle(selectedOption.title)
                        .setDescription(selectedOption.description)
                        ;
                        
                        await i.update({
                            embeds: [updatedEmbed],
                            components: [row],
                        });
                    } else {
                        i.reply({ content: 'An unknown interaction type occurred.', ephemeral: true });
                    }
                });
                
                collector.on('end', (collected) => {
                    if (collected.size === 0) {
                        reply.edit({ components: [] });
                    }
                });
            } catch (error) {
                return console.error(error);
            }
        },
    } 
