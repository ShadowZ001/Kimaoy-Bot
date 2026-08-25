module.exports = {
    customId: 'eb_modal_footer',
    async execute(interaction) {
        const { builderStates } = require('../../utils/embedState');
        const { generateBuilderPayload } = require('../../utils/cv2BuilderHelper');
        const text = interaction.fields.getTextInputValue('footerTextInput');
        const icon = interaction.fields.getTextInputValue('footerIconInput');
        let state = builderStates.get(interaction.user.id);
        if (!state) state = {};
        state.footerText = text || '';
        state.footerIcon = icon || '';
        builderStates.set(interaction.user.id, state);
        const payload = generateBuilderPayload(interaction.user.id, interaction.user, interaction.guild);
        await interaction.update({ components: payload.components });
    }
};
