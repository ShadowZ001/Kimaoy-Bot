module.exports = {
    customId: 'eb_modal_images',
    async execute(interaction) {
        const { builderStates } = require('../../utils/embedState');
        const { generateBuilderPayload } = require('../../utils/cv2BuilderHelper');
        const thumbnail = interaction.fields.getTextInputValue('thumbInput');
        const image = interaction.fields.getTextInputValue('imageInput');
        let state = builderStates.get(interaction.user.id);
        if (!state) state = {};
        state.thumbnailUrl = thumbnail || '';
        state.imageUrl = image || '';
        builderStates.set(interaction.user.id, state);
        const payload = generateBuilderPayload(interaction.user.id, interaction.user, interaction.guild);
        await interaction.update({ components: payload.components });
    }
};
