const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const guidePages = [
    new EmbedBuilder()
        .setTitle('📘 Placeholders Guide: User (Page 1/4)')
        .setDescription('You can type these anywhere in the Title, Description, Author, or Footer, and they will transform into real data when sent!')
        .addFields(
            { name: '`{user}`', value: 'Pings the person who sent the embed.' },
            { name: '`{user.name}`', value: 'The username of the person who sent the embed (e.g. Kayse).' },
            { name: '`{user.tag}`', value: 'The username + tag (e.g. Kayse#0894).' },
            { name: '`{user.id}`', value: 'The raw Discord ID of the user.' },
            { name: '`{user.avatar}`', value: "A direct link to the user's avatar image (great for Author Icon or Thumbnails!)." }
        )
        .setColor('#5865F2'),
    new EmbedBuilder()
        .setTitle('📘 Placeholders Guide: Server (Page 2/4)')
        .setDescription('Server variables change depending on where the embed is sent.')
        .addFields(
            { name: '`{server}` or `{server.name}`', value: 'The name of the current server.' },
            { name: '`{server.id}`', value: 'The ID of the current server.' },
            { name: '`{server.membercount}`', value: 'The total number of members in the server.' },
            { name: '`{server.icon}`', value: "A direct link to the server's icon image." }
        )
        .setColor('#5865F2'),
    new EmbedBuilder()
        .setTitle('📘 Placeholders Guide: Time (Page 3/4)')
        .setDescription("Dynamic timestamps that adjust to every user's local timezone automatically.")
        .addFields(
            { name: '`{time}`', value: 'Displays the current short date and time (e.g., August 11, 2026 5:15 PM).' },
            { name: '`{date}`', value: 'Displays the current long date (e.g., August 11, 2026).' }
        )
        .setColor('#5865F2'),
    new EmbedBuilder()
        .setTitle('📘 Placeholders Guide: Emojis (Page 4/4)')
        .setDescription('You can easily use any custom emoji from this server (or any server the bot is in)!')
        .addFields(
            { name: 'How to use?', value: 'Simply type the emoji name wrapped in colons: `:emoji_name:`' },
            { name: 'Example', value: 'If you have an emoji named `nitro`, just type `:nitro:` anywhere in the embed and it will automatically transform into the real emoji when sent.' },
            { name: 'Animated Emojis', value: 'Yes, animated emojis work automatically too! Just type the name like `:boost_animated:`.' }
        )
        .setColor('#5865F2')
];
function getGuideComponents(pageIndex) {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`eb_guide_prev_${pageIndex}`)
            .setLabel('◀️ Previous')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(pageIndex === 0),
        new ButtonBuilder()
            .setCustomId(`eb_guide_next_${pageIndex}`)
            .setLabel('Next ▶️')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(pageIndex === guidePages.length - 1)
    );
}
module.exports = {
    guidePages,
    getGuideComponents
};
