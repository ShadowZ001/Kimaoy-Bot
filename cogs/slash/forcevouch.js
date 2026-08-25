const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const Seller = require('../../database/models/Seller');
const { logError } = require('../../errors/errorHandler');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcevouch')
        .setDescription('Forcefully add a vouch to a seller (Admin only)')
        .addUserOption(option => 
            option.setName('seller')
                .setDescription('The seller to vouch for')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Amount of vouches to add (default: 1)')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const sellerUser = interaction.options.getUser('seller');
            const amount = interaction.options.getInteger('amount') || 1;
            const seller = await Seller.findOne({ userId: sellerUser.id });
            if (!seller) {
                const errPayload = {
                    flags: 1 << 15,
                    components: [{ type: 17, accent_color: 16711680, components: [{ type: 10, content: `> <:6Cross:1536427087471317112> | **Error**\n> <@${sellerUser.id}> is not registered as a seller in the database.` }] }]
                };
                return interaction.editReply({ flags: errPayload.flags, components: errPayload.components });
            }
            seller.vouches += amount;
            await seller.save();
            const embed = new EmbedBuilder()
                .setDescription(`Vouch \`${seller.vouches}\` submitted for <@${sellerUser.id}>. (Forced by Admin)`)
                .setColor('#5865F2');
            await interaction.editReply({ embeds: [embed] });
        } catch (err) {
            logError(err, 'Slash Command: forcevouch');
            await interaction.editReply({ content: 'An error occurred while executing this command.' });
        }
    },
};
