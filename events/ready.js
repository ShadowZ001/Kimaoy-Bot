const { REST, Routes } = require('discord.js');
const { logError } = require('../errors/errorHandler');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.clear();
        console.log(`\x1b[1;31m
 ██╗  ██╗██╗███╗   ███╗ █████╗  ██████╗ ██╗   ██╗
 ██║ ██╔╝██║████╗ ████║██╔══██╗██╔═══██╗╚██╗ ██╔╝
 █████╔╝ ██║██╔████╔██║███████║██║   ██║ ╚████╔╝ 
 ██╔═██╗ ██║██║╚██╔╝██║██╔══██║██║   ██║  ╚██╔╝  
 ██║  ██╗██║██║ ╚═╝ ██║██║  ██║╚██████╔╝   ██║   
 ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   
\x1b[0m`);
        console.log("Loaded & Online!");
        try { await require('../utils/syncEmojis')(client); } catch(e) { console.error("EmojiSync Error:", e); }
        console.log(`Logged in as: ${client.user.tag}`);
        console.log(`Connected to: ${client.guilds.cache.size} guilds`);
        
        let totalUsers = 0;
        client.guilds.cache.forEach(guild => totalUsers += guild.memberCount);
        console.log(`Connected to: ${totalUsers} users\n`);
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        try {
            const commands = client.commands.map(cmd => cmd.data.toJSON());
            console.log('Started refreshing application (/) commands.');
            if (process.env.CLIENT_ID) {
                 await rest.put(
                    Routes.applicationCommands(process.env.CLIENT_ID),
                    { body: commands },
                );
                console.log('Successfully reloaded application (/) commands.');
            } else {
                console.log('CLIENT_ID is missing in .env, skipping slash command registration.');
            }
        } catch (error) {
            logError(error, 'Slash Command Registration');
        }
    },
};
