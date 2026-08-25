const { logError } = require('../errors/errorHandler');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        try {
            if (interaction.isChatInputCommand()) {
                const command = client.commands.get(interaction.commandName);
                if (!command) return;
                await command.execute(interaction, client);
            } else if (interaction.isButton()) {
                let button = client.buttons.get(interaction.customId);
                if (!button) {
                    button = client.buttons.find(b => interaction.customId.startsWith(b.customId));
                }
                if (!button) return;
                await button.execute(interaction, client);
            } else if (interaction.isStringSelectMenu() || interaction.isChannelSelectMenu()) {
                let selectMenu = client.selectMenus.get(interaction.customId);
                if (!selectMenu) {
                    selectMenu = client.selectMenus.find(m => interaction.customId.startsWith(m.customId));
                }
                if (!selectMenu) return;
                await selectMenu.execute(interaction, client);
            } else if (interaction.isModalSubmit()) {
                let modal = client.modals.get(interaction.customId);
                if (!modal) {
                    modal = client.modals.find(m => interaction.customId.startsWith(m.customId));
                }
                if (!modal) return;
                await modal.execute(interaction, client);
            }
        } catch (error) {
            logError(error, `Interaction Handling: ${interaction.customId || interaction.commandName}`);
            const replyMethod = interaction.replied || interaction.deferred ? 'followUp' : 'reply';
            await interaction[replyMethod]({ content: 'There was an error while executing this interaction!', ephemeral: true }).catch(() => {});
        }
    },
};
