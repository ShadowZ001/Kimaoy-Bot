module.exports = {
    customId: 'eb_modal_author',
    async execute(interaction) {
        const { builderStates } = require('../../utils/embedState');
        const { generateBuilderPayload } = require('../../utils/cv2BuilderHelper');
        const name = interaction.fields.getTextInputValue('authorNameInput');
        const icon = interaction.fields.getTextInputValue('authorIconInput');
        let state = builderStates.get(interaction.user.id);
        if (!state) state = {};
        state.authorName = name || '';
        state.authorIcon = icon || '';
        builderStates.set(interaction.user.id, state);
        const payload = generateBuilderPayload(interaction.user.id, interaction.user, interaction.guild);
        await interaction.update({ components: payload.components });
    }
};
