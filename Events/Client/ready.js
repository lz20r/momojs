const { momo } = require("../../core/client");
const { ActivityType } = require("discord.js");
const { mysql } = require("../../momoDB/index"); 

momo.on("ready", async () => {
    try { 
        mysql.set("strictQuery", false);
        await mysql.connection.execute("SET GLOBAL sql_mode = 'NO_ENGINE_SUBSTITUTION'", {useNewUrlParser: true, useUnifiedTopology: true}); 
    } catch (error) {
        console.log("Error al establecer conexion con MYSQL".red); 
    }  
    
    momo.user.setPresence({
        activities: [
            {
                name: `${momo.user.username}'s 24/7 in  canal/s`,
                type: ActivityType.Custom,
            },
        ],
        status: "idle",
    });
    
    const statusArray = [
        `RAM：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} %`,
        `Today is ${String(new Date()).split(" ", 5).join(" ")}`,
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
    console.log('\nLogged as '.white + momo.user.username + ' in '.white + momo.user.presence.status + ' mode'.white);
});
