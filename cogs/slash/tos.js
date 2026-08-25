const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tos')
        .setDescription('Send the official Terms of Service to a channel (CV2 format)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to send the TOS to')
                .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
                .setRequired(true)
        ),
    async execute(interaction) {
        const targetChannel = interaction.options.getChannel('channel');
        const tosPayload = {
            flags: 1 << 15,
            components: [
                {
                    type: 17,
                    accent_color: 9352859, 
                    components: [
                        { 
                            type: 10, 
                            content: "### <:0041_3:1534558218410397906> Official Terms of Service" 
                        },
                        { 
                            type: 10, 
                            content: "> By participating in our marketplace, you agree to abide by the following rules. Ignorance of the rules is not an excuse." 
                        },
                        { type: 14, divider: true },
                        { 
                            type: 10, 
                            content: "#### <:0075_3:1534573426575147059> For Sellers\n" +
                                     "**1. Completing Deals:** After you successfully complete your order, you **MUST** run the `/completedeal` command to properly log the transaction.\n" +
                                     "**2. Zero Tolerance for Scams:** Do NOT scam anyone. Any attempt to scam or deceive a customer will result in an immediate permanent ban.\n" +
                                     "**3. Middleman Policy:** You **MUST** accept an official Middleman (MM) if the customer requests it. Refusing to use an MM is strictly prohibited.\n" +
                                     "**4. Vouch Requirements:** Sellers are required to have at least **11 Shiba Vouches** to maintain their trusted status and privileges.\n" +
                                     "**5. Professionalism:** Always provide the exact goods or services as advertised and treat customers with respect."
                        },
                        { type: 14, divider: true },
                        { 
                            type: 10, 
                            content: "#### <:0046_4:1534558258767855647> For Customers\n" +
                                     "**1. Safety First:** Always verify the seller's vouches before making a purchase. If you feel unsafe, **always request an official MM**.\n" +
                                     "**2. Reporting:** If a seller refuses to use a Middleman when asked, open a ticket and report them to the staff immediately.\n" +
                                     "**3. No Scamming:** Scamming works both ways. Chargebacks, fake proofs of payment, or refusing to pay will result in a ban.\n" +
                                     "**4. Final Sales:** Unless the seller explicitly offers a warranty or refund policy, consider all purchases final."
                        },
                        { type: 14, divider: true },
                        { 
                            type: 10, 
                            content: "*If you have any questions or concerns regarding these Terms of Service, please open a support ticket.*" 
                        }
                    ]
                }
            ]
        };
        try {
            await targetChannel.send({
                flags: tosPayload.flags,
                components: tosPayload.components
            });
            await interaction.reply({ content: `<:Tick:1536426890448080937> Successfully sent the CV2 TOS to ${targetChannel}!`, ephemeral: true });
        } catch (error) {
            console.error('Failed to send TOS:', error);
            await interaction.reply({ content: '<:6Cross:1536427087471317112> Failed to send the TOS. Please ensure I have permissions to send messages in that channel.', ephemeral: true });
        }
    }
};
