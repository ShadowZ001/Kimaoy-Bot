const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
module.exports = {
    customId: 'eb_edit_menu',
    async execute(interaction) {
        if (interaction.message.interaction && interaction.user.id !== interaction.message.interaction.user.id) {
            return interaction.reply({ content: '<:6Cross:1536427087471317112> Only the person who ran the command can use this menu.', ephemeral: true });
        }
        const selected = interaction.values[0];
        const { builderStates } = require('../../../utils/embedState');
        const { generateBuilderPayload } = require('../../../utils/cv2BuilderHelper');
        let state = builderStates.get(interaction.user.id) || {};
        if (selected === 'eb_edit_basic') {
            const modal = new ModalBuilder().setCustomId('eb_modal_basic').setTitle('Edit Basic Info');
            modal.addComponents(
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('titleInput').setLabel('Title').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.title || '')),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('descInput').setLabel('Description').setStyle(TextInputStyle.Paragraph).setRequired(false).setValue(state.description || '')),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('colorInput').setLabel('Color (Hex)').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.color || '8EB69B'))
            );
            return interaction.showModal(modal);
        }
        if (selected === 'eb_edit_author') {
            const modal = new ModalBuilder().setCustomId('eb_modal_author').setTitle('Edit Author Info');
            modal.addComponents(
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('authorNameInput').setLabel('Author Name').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.authorName || '')),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('authorIconInput').setLabel('Author Icon URL').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.authorIcon || '')),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('authorUrlInput').setLabel('Author URL').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.authorUrl || ''))
            );
            return interaction.showModal(modal);
        }
        if (selected === 'eb_edit_images') {
            const modal = new ModalBuilder().setCustomId('eb_modal_images').setTitle('Edit Images');
            modal.addComponents(
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('thumbInput').setLabel('Thumbnail URL').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.thumbnailUrl || '')),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('imageInput').setLabel('Image URL').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.imageUrl || ''))
            );
            return interaction.showModal(modal);
        }
        if (selected === 'eb_edit_footer') {
            const modal = new ModalBuilder().setCustomId('eb_modal_footer').setTitle('Edit Footer');
            modal.addComponents(
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('footerTextInput').setLabel('Footer Text').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.footerText || '')),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('footerIconInput').setLabel('Footer Icon URL').setStyle(TextInputStyle.Short).setRequired(false).setValue(state.footerIcon || ''))
            );
            return interaction.showModal(modal);
        }
        if (selected === 'eb_toggle_time') {
            state.showTimestamp = !state.showTimestamp;
            builderStates.set(interaction.user.id, state);
            const payload = generateBuilderPayload(interaction.user.id, interaction.user, interaction.guild);
            return interaction.update({ components: payload.components });
        }
        if (selected === 'eb_open_guide') {
            const payload = generateBuilderPayload(interaction.user.id, interaction.user, interaction.guild);
            const guideText = "**Placeholder Guide**\n`{user}` - User tag\n`{user.id}` - User ID\n`{server}` - Server Name\n`{server.id}` - Server ID\n`{memberCount}` - Server Member Count";
            return interaction.reply({ content: guideText, ephemeral: true }).then(() => {
                interaction.message.edit({ components: payload.components }).catch(() => {});
            });
        }
        if (selected === 'eb_send') {
            await interaction.deferReply({ ephemeral: true });
            const { targetChannels } = require('../../../utils/embedState');
            const targetChannelId = targetChannels.get(interaction.user.id);
            if (!targetChannelId) {
                const payload = generateBuilderPayload(interaction.user.id, interaction.user, interaction.guild);
                interaction.message.edit({ components: payload.components }).catch(() => {});
                return interaction.editReply({ content: '<:6Cross:1536427087471317112> You must select a target channel first using the dropdown below.' });
            }
            const targetChannel = await interaction.client.channels.fetch(targetChannelId).catch(() => null);
            if (!targetChannel) {
                return interaction.editReply({ content: '<:6Cross:1536427087471317112> Could not find the selected channel. It may have been deleted.' });
            }
            const { generateFinalPayload } = require('../../../utils/cv2BuilderHelper');
            const finalPayload = generateFinalPayload(interaction.user.id, interaction.user, interaction.guild);
            try {
                await targetChannel.send({ flags: finalPayload.flags, components: finalPayload.components });
                targetChannels.delete(interaction.user.id);
                const payload = generateBuilderPayload(interaction.user.id, interaction.user, interaction.guild);
                interaction.message.edit({ components: payload.components }).catch(() => {});
                await interaction.editReply({ content: `<:Tick:1536426890448080937> Successfully sent your embed to <#${targetChannelId}>!` });
            } catch (error) {
                await interaction.editReply({ content: '<:6Cross:1536427087471317112> Failed to send the embed. Make sure I have permissions to send messages and embed links in that channel.' });
            }
        }
    }
};
