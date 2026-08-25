const { builderStates, targetChannels } = require('./embedState');
const { parsePlaceholders } = require('./placeholders');
const DEFAULT_HEX = 9352859; 
function generateBuilderPayload(userId, user, guild) {
    let state = builderStates.get(userId);
    if (!state) {
        state = {
            title: 'Embed Title (Click Edit Basic)',
            description: 'Embed Description here.',
            color: '8EB69B',
            authorName: '',
            authorIcon: '',
            footerText: '',
            footerIcon: '',
            imageUrl: '',
            thumbnailUrl: '',
            showTimestamp: false
        };
        builderStates.set(userId, state);
    }
    let accentColor = DEFAULT_HEX;
    if (state.color) {
        let hex = state.color.replace('#', '');
        if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
            accentColor = parseInt(hex, 16);
        }
    }
    const previewComponents = [];
    if (state.authorName) {
        const parsedAuthor = parsePlaceholders(state.authorName, user, guild);
        const parsedIcon = state.authorIcon ? parsePlaceholders(state.authorIcon, user, guild) : null;
        const authorComp = {
            type: 9,
            components: [{ type: 10, content: `**${parsedAuthor}**` }]
        };
        if (parsedIcon) {
            authorComp.accessory = { type: 11, media: { url: parsedIcon } };
        }
        previewComponents.push(authorComp);
        previewComponents.push({ type: 14, divider: true });
    }
    let mainText = '';
    if (state.title) {
        mainText += `### ${parsePlaceholders(state.title, user, guild)}\n`;
    }
    if (state.description) {
        mainText += parsePlaceholders(state.description, user, guild);
    }
    if (mainText) {
        previewComponents.push({ type: 10, content: mainText });
    }
    if (state.thumbnailUrl) {
        previewComponents.push({ type: 14, divider: true });
        previewComponents.push({ 
            type: 12, 
            items: [{ media: { url: parsePlaceholders(state.thumbnailUrl, user, guild) } }]
        });
    }
    if (state.imageUrl) {
        if (!state.thumbnailUrl) previewComponents.push({ type: 14, divider: true });
        previewComponents.push({ 
            type: 12, 
            items: [{ media: { url: parsePlaceholders(state.imageUrl, user, guild) } }]
        });
    }
    if (state.footerText || state.showTimestamp) {
        previewComponents.push({ type: 14, divider: true });
        let footerText = '';
        if (state.footerText) footerText += parsePlaceholders(state.footerText, user, guild);
        if (state.showTimestamp) {
            if (footerText) footerText += ' • ';
            footerText += `<t:${Math.floor(Date.now() / 1000)}:f>`;
        }
        const footerComp = {
            type: 9,
            components: [{ type: 10, content: footerText }]
        };
        if (state.footerIcon) {
            footerComp.accessory = { type: 11, media: { url: parsePlaceholders(state.footerIcon, user, guild) } };
        }
        previewComponents.push(footerComp);
    }
    if (previewComponents.length === 0) {
        previewComponents.push({ type: 10, content: '_Empty preview_' });
    }
    return {
        flags: 1 << 15,
        components: [
            {
                type: 17,
                accent_color: accentColor,
                components: previewComponents
            },
            {
                type: 17,
                accent_color: DEFAULT_HEX,
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 3, 
                                custom_id: 'eb_edit_menu',
                                placeholder: 'Select an option to edit your embed...',
                                options: [
                                    { label: 'Basic Info', value: 'eb_edit_basic', description: 'Edit Title, Description, and Color' },
                                    { label: 'Author', value: 'eb_edit_author', description: 'Edit Author Name and Icon' },
                                    { label: 'Images', value: 'eb_edit_images', description: 'Edit Thumbnail and Main Image' },
                                    { label: 'Footer', value: 'eb_edit_footer', description: 'Edit Footer Text and Icon' },
                                    { label: 'Toggle Timestamp', value: 'eb_toggle_time', description: 'Show or hide the current time' },
                                    { label: 'Placeholders Guide', value: 'eb_open_guide', description: 'View available text placeholders' },
                                    { label: 'Send CV2 Message', value: 'eb_send', description: 'Send your completed embed to the selected channel' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 17,
                accent_color: DEFAULT_HEX,
                components: [
                    {
                        type: 1,
                        components: [
                            { 
                                type: 8,
                                custom_id: 'eb_channel_select', 
                                placeholder: 'Select target channel to send to...',
                                channel_types: [0, 5]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}
function generateFinalPayload(userId, user, guild) {
    const fullPayload = generateBuilderPayload(userId, user, guild);
    return {
        flags: 1 << 15,
        components: [fullPayload.components[0]]
    };
}
module.exports = { generateBuilderPayload, generateFinalPayload };
