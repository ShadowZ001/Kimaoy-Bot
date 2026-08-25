module.exports = {
    customId: 'eb_toggle_time',
    async execute(interaction) {
        if (interaction.message.interaction && interaction.user.id !== interaction.message.interaction.user.id) {
            return interaction.reply({ content: 'Only the person who ran the command can use these buttons.', ephemeral: true });
        }
        const { builderStates } = require('../../utils/embedState');
        const { generateBuilderPayload } = require('../../utils/cv2BuilderHelper');
        let state = builderStates.get(interaction.user.id);
        if (!state) state = {};
        state.showTimestamp = !state.showTimestamp;
        builderStates.set(interaction.user.id, state);
        const payload = generateBuilderPayload(interaction.user.id, interaction.user, interaction.guild);
        await interaction.update({ components: payload.components });
    }
};
