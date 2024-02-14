const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    alias: [],

 async execute(momo, message, args) {

    const EmbedPing = new EmbedBuilder()
        .setTitle('🏓 ¡Pong!')
        .setDescription(`*Mi ping es de* **\`${momo.ws.ping}ms\`**`)
        .setColor("#2b2d31")

        const EmbedCal = new EmbedBuilder()
        .setDescription('`Calculando mi ping`')
        .setColor('Yellow')

        const replyMessage = await message.reply({ embeds: [EmbedCal], allowedMentions: { repliedUser: false } });
        const dots = ['.', '..', '...'];

        const showDots = (count) => {
            setTimeout(() => {
                EmbedCal.setDescription(`\`Calculando mi ping${dots[count % 3]}\``);
                replyMessage.edit({ embeds: [EmbedCal] });
                if (count < 5) {
                    showDots(count + 1);
                } else {
                    setTimeout(() => {
                        replyMessage.edit({ embeds: [EmbedPing] });
                    }, 600); 
                }
            }, 600);
        };

        showDots(0);
    }
} 
