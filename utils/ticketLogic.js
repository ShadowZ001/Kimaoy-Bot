const { AttachmentBuilder } = require('discord.js');
const Seller = require('../database/models/Seller');
const Ticket = require('../database/models/Ticket');
const { generateSellerBanner } = require('./sellerBanner');
async function handleSellerAssignment(interaction, ticketChannel, typeName, orderId, payDisplay = 'Not set', qtyDisplay = '1x') {
    try {
        await Ticket.create({
            orderId: orderId,
            channelId: ticketChannel.id,
            guildId: interaction.guild.id,
            clientId: interaction.user.id,
            productName: typeName,
            quantity: qtyDisplay,
            payment: payDisplay
        });
        const openDmPayload = {
            flags: 1 << 15,
            components: [
                {
                    type: 17,
                    accent_color: 4906624,
                    components: [
                        {
                            type: 10,
                            content: `<:0038_3:1534558194007806094> | **Your Ticket Is Open**\nHello <@${interaction.user.id}>. Your private request has been created.`
                        },
                        { type: 14, divider: true },
                        {
                            type: 10,
                            content: `<:0015_3:1534543114541338654> | **Deal Information**\nProduct: **${typeName}**\nQuantity: \`${qtyDisplay}\`\nPayment: **${payDisplay}**\nAmount: **Not set**\nTicket ID: \`${orderId}\``
                        },
                        { type: 14, divider: true },
                        {
                            type: 1,
                            components: [
                                { type: 2, style: 5, label: 'Go to Ticket', url: `https://discord.com/channels/${interaction.guild.id}/${ticketChannel.id}` },
                                { type: 2, style: 4, label: 'Cancel', emoji: { name: '6Cross', id: '1536427087471317112' }, custom_id: `cancel_ticket_dm_${orderId}` }
                            ]
                        }
                    ]
                }
            ]
        };
        await interaction.user.send({ flags: openDmPayload.flags, components: openDmPayload.components }).catch(() => {});
        const sellers = await Seller.find();
        if (sellers.length === 0) return; 
        const assignedSellerData = sellers[Math.floor(Math.random() * sellers.length)];
        const assignedSellerMember = await interaction.guild.members.fetch(assignedSellerData.userId).catch(() => null);
        if (!assignedSellerMember) return;
        await Ticket.updateOne({ orderId }, { sellerId: assignedSellerData.userId });
        await ticketChannel.permissionOverwrites.edit(assignedSellerData.userId, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        });
        const sellerBuffer = await generateSellerBanner(assignedSellerMember.user, assignedSellerData);
        const sellerAttachment = new AttachmentBuilder(sellerBuffer, { name: 'seller_banner.png' });
        const sellerPayload = {
            flags: 1 << 15,
            components: [
                {
                    type: 17,
                    accent_color: 4906624,
                    components: [
                        {
                            type: 12,
                            items: [{ media: { url: 'attachment://seller_banner.png' } }]
                        },
                        { type: 14, divider: true },
                        {
                            type: 10,
                            content: `<:0010_4:1534543094387703808> | **Seller Information**\nSeller: <@${assignedSellerData.userId}>\nUser ID: \`${assignedSellerData.userId}\`\nCompleted deals: **${assignedSellerData.completedDeals}**\nTotal volume: **${assignedSellerData.totalVolume.toFixed(2)}€**\nAverage completion: **${assignedSellerData.averageCompletionTimeStr}**\nAvailable limit: **${assignedSellerData.availableLimit.toFixed(2)}€**`
                        },
                        { type: 14, divider: true },
                        {
                            type: 10,
                            content: `<:stars1:1536427648308346921> | **Vouches**\n${assignedSellerData.vouches}`
                        },
                        { type: 14, divider: true },
                        {
                            type: 10,
                            content: `<:stars1:1536427648308346921> | **Seller Feedback**\n**${assignedSellerData.rating.toFixed(1)}/5** <:stars1:1536427648308346921> | **${assignedSellerData.totalReviews} reviews** from **${assignedSellerData.totalReviews} customers**`
                        },
                        { type: 14, divider: true },
                        {
                            type: 10,
                            content: `<:0040_4:1534558206766874844> Deal only with the assigned seller shown above.`
                        }
                    ]
                }
            ]
        };
        await ticketChannel.send({
            flags: sellerPayload.flags,
            components: sellerPayload.components,
            files: [sellerAttachment]
        });
        const termsPayload = {
            flags: 1 << 15,
            components: [
                {
                    type: 17,
                    accent_color: 4906624,
                    components: [
                        {
                            type: 10,
                            content: `<:0017_3:1534543128814682263> | **${typeName.toLowerCase()}**`
                        },
                        { type: 14, divider: true },
                        {
                            type: 10,
                            content: (() => {
                                const t = typeName.toLowerCase();
                                if (t.includes('decoration') || t.includes('profile') || t.includes('nitro')) {
                                    return `1. Items are provided via Gift Link (GL). We do NOT require your account login information.\n2. Warranty is valid only for the purchased duration.\n3. Do not stack it as Credit else warranty will be voided.\n4. You must provide a clear screen recording showing the entire claiming process.\n5. Any attempt to scam or abuse the warranty will void it immediately.`;
                                } else if (t.includes('boost')) {
                                    return `1. Provide a permanent server invite link.\n2. Do not kick the boosting accounts or the warranty will be voided.\n3. Warranty is valid only for the purchased duration.\n4. Do not ping sellers unnecessarily.`;
                                } else if (t.includes('exchange')) {
                                    return `1. Crypto networks must be verified before sending.\n2. INR transfers require screenshot proof.\n3. Exchange rates are final once confirmed in the ticket.`;
                                } else {
                                    return `1. Please be patient while staff assists you.\n2. Do not ping unnecessarily.\n3. Provide all necessary details upfront.`;
                                }
                            })()
                        },
                        { type: 14, divider: true },
                        {
                            type: 10,
                            content: `<:0040_4:1534558206766874844> The client must accept these terms before an amount can be submitted.`
                        },
                        {
                            type: 1,
                            components: [
                                { type: 2, style: 3, label: 'Accept Terms', custom_id: 'accept_terms' }
                            ]
                        }
                    ]
                }
            ]
        };
        await ticketChannel.send({
            flags: termsPayload.flags,
            components: termsPayload.components
        });
        await assignedSellerMember.send(`<:0040_4:1534558206766874844> **New Ticket Assigned!**\nYou have been assigned to ${ticketChannel} for a **${typeName}** order.`).catch(() => {});
        const clientDmPayload = {
            flags: 1 << 15,
            components: [
                {
                    type: 17,
                    accent_color: 4906624,
                    components: [
                        {
                            type: 9,
                            components: [{ type: 10, content: `<:0055_4:1534558343153188986> | **Your Ticket Has Been Claimed**\n<@${assignedSellerData.userId}> is now handling your request.` }],
                            accessory: { type: 11, media: { url: assignedSellerMember.user.displayAvatarURL({ extension: 'png', size: 128 }) } }
                        },
                        { type: 14, divider: true },
                        { type: 10, content: `<:0010_4:1534543094387703808> | **Seller Information**\nSeller: <@${assignedSellerData.userId}>\nUser ID: \`${assignedSellerData.userId}\`\nCompleted deals: **${assignedSellerData.completedDeals}**\nTotal volume: **${assignedSellerData.totalVolume.toFixed(2)}€**\nAverage completion: **${assignedSellerData.averageCompletionTimeStr}**` },
                        { type: 14, divider: true },
                        { type: 10, content: `<:stars1:1536427648308346921> | **Vouches**\n${assignedSellerData.vouches}` },
                        { type: 14, divider: true },
                        { type: 10, content: `<:stars1:1536427648308346921> | **Feedback**\n**${assignedSellerData.rating.toFixed(1)}/5** <:stars1:1536427648308346921> | **${assignedSellerData.totalReviews} customers**` },
                        { type: 14, divider: true },
                        { type: 10, content: `<:0040_4:1534558206766874844> Continue only inside <#${ticketChannel.id}>.` },
                        {
                            type: 1,
                            components: [
                                { type: 2, style: 5, label: 'Go to Ticket', url: `https://discord.com/channels/${interaction.guild.id}/${ticketChannel.id}` }
                            ]
                        }
                    ]
                }
            ]
        };
        await interaction.user.send({ flags: clientDmPayload.flags, components: clientDmPayload.components }).catch(() => {});
    } catch (e) {
        console.error("Error during seller assignment", e);
    }
}
module.exports = { handleSellerAssignment };
