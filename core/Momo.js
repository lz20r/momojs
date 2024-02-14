const index = require('../index'); 
const Events = require('../Handlers/Events');
const {momotoken} = require('../config.json');
const eventos = require('../Handlers/eventos');
const Commands = require('../Handlers/commands');
const getFiles = require('../Handlers/getFiles');
const SlashCommands = require('../slashcommands');
const antiCrash = require('../Handlers/antiCrash');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

module.exports = class momoClient extends Client {
    constructor(){ 
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers, 
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.MessageContent
            ], 
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: true,
            },
        });

        this.slashCommands = new Collection();
        this.slashArray = [];
        this.collectors = new Collection();
        this.UsersDataProcessesEndPoint = new Collection();
        this.UsersPendingProcesses = new Collection();

    } 
    async start() {
        await index.load();
        await antiCrash.execute(this);
        await Events.execute(this);
        await getFiles.execute(this);
        await SlashCommands.execute(this);
        await Commands.execute(this);
        eventos.execute(this);  
        commandUserLoader.execute(this);
        commandMessageLoader.execute(this);
        this.login(`${momotoken}`);  

    } 
} 
