const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { connectToDatabase } = require('./database/connect');
const { setupProcessErrorHandlers, logError } = require('./errors/errorHandler');
setupProcessErrorHandlers();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
    ]
});
client.commands = new Collection();
client.prefixCommands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.prefix = process.env.PREFIX || '!';
const loadHandlers = () => {
    try {
        const getAllFiles = (dirPath, arrayOfFiles) => {
            const files = fs.readdirSync(dirPath);
            arrayOfFiles = arrayOfFiles || [];
            files.forEach(file => {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
                } else {
                    arrayOfFiles.push(path.join(dirPath, file));
                }
            });
            return arrayOfFiles;
        };
        const slashPath = path.join(__dirname, 'cogs', 'slash');
        if (fs.existsSync(slashPath)) {
            const slashFiles = getAllFiles(slashPath).filter(file => file.endsWith('.js'));
            for (const file of slashFiles) {
                const command = require(file);
                if (command.data && command.data.name) {
                    client.commands.set(command.data.name, command);
                }
            }
        }
        const prefixPath = path.join(__dirname, 'cogs', 'prefix');
        if (fs.existsSync(prefixPath)) {
            const prefixFiles = fs.readdirSync(prefixPath).filter(file => file.endsWith('.js'));
            for (const file of prefixFiles) {
                const command = require(path.join(prefixPath, file));
                if (command.name) {
                    client.prefixCommands.set(command.name, command);
                }
            }
        }
        const buttonsPath = path.join(__dirname, 'cogs', 'buttons');
        if (fs.existsSync(buttonsPath)) {
            const buttonFiles = getAllFiles(buttonsPath).filter(file => file.endsWith('.js'));
            for (const file of buttonFiles) {
                const button = require(file);
                if (button.customId) {
                    client.buttons.set(button.customId, button);
                }
            }
        }
        const selectMenusPath = path.join(__dirname, 'cogs', 'components', 'select_menus');
        if (fs.existsSync(selectMenusPath)) {
            const selectMenuFiles = getAllFiles(selectMenusPath).filter(file => file.endsWith('.js'));
            for (const file of selectMenuFiles) {
                const selectMenu = require(file);
                if (selectMenu.customId) {
                    client.selectMenus.set(selectMenu.customId, selectMenu);
                }
            }
        }
        const modalsPath = path.join(__dirname, 'cogs', 'modals');
        if (fs.existsSync(modalsPath)) {
            const modalFiles = getAllFiles(modalsPath).filter(file => file.endsWith('.js'));
            for (const file of modalFiles) {
                const modal = require(file);
                if (modal.customId) {
                    client.modals.set(modal.customId, modal);
                }
            }
        }
        const eventsPath = path.join(__dirname, 'events');
        if (fs.existsSync(eventsPath)) {
            const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event = require(path.join(eventsPath, file));
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            }
        }
    } catch (error) {
        logError(error, 'Handler Loading');
    }
};
async function init() {
    try {
        await connectToDatabase();
        loadHandlers();
        if (process.env.TOKEN) {
            await client.login(process.env.TOKEN);
            const { startTempRoleChecker } = require('./utils/tempRoles');
            startTempRoleChecker(client);
        } else {
            console.log('No token provided in .env, cannot login to Discord.');
        }
    } catch (error) {
        logError(error, 'Bot Initialization');
    }
}
init();
