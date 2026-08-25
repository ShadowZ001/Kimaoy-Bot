const { targetChannels } = require('../../../utils/embedState');
module.exports = {
    customId: 'eb_channel_select',
    async execute(interaction) {
        if (interaction.message.interaction && interaction.user.id !== interaction.message.interaction.user.id) {
            return interaction.reply({ content: '<:6Cross:1536427087471317112> Only the person who ran the command can use this menu.', ephemeral: true });
        }
        const selectedChannelId = interaction.values[0];
        targetChannels.set(interaction.user.id, selectedChannelId);
        await interaction.deferUpdate();
    }
};
