const { ActivityType } = require("discord.js"); 
const momo = require("../../core/client");
const prefix = require("../../config.json").prefix;
 
momo.on("ready", async () => {
    momo.db = await require('../../momoDB/momoDB')(momo)

    
    momo.user.setPresence({
        activities: [
            {
                name: `💞・${momo.user.username} active 24/7`, 
                type: ActivityType.Custom
            },
        ],
        status: "idle",
    });
    
    const statusArray = [
        `${momo.user.username}'s RAM:${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} %`,
        `${momo.user.username} active in ${momo.guilds.cache.size} server/s`,
        `${momo.user.username} active in ${momo.channels.cache.size} canal/s`,
        `${momo.user.username} looking ${momo.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} user/s`,
    ];
    let index = 0; 
    const randTime = Math.floor(Math.random() * 5) + 1;
    setTimeout(() => {
        setInterval(() => {
            if (index === statusArray.length) index = 0;
            const status = statusArray[index];
            momo.user.setPresence({
                activities: [{ name: status, type: ActivityType.Custom }],
                status: "idle",
            }); 
            index++;
        }, 6 * 1000);
    }, randTime);
    console.log('\n💞・Logged as '.white + momo.user.username + ' in '.white + momo.user.presence.status + ' mode'.white);
});
