const { logError } = require('../errors/errorHandler');
const Seller = require('../database/models/Seller');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.content.toLowerCase().startsWith('+rep ')) {
            const match = message.content.match(/^\+rep\s+(?:<@!?)?(\d+)>?\s*(?:\|\s*)?(.*)$/i);
            if (match) {
                const sellerId = match[1];
                try {
                    if (sellerId === message.author.id) {
                        return message.reply({ content: "You can't vouch for yourself!", ephemeral: true }).catch(() => {});
                    }
                    const seller = await Seller.findOne({ userId: sellerId });
                    if (seller) {
                        seller.vouches += 1;
                        const reason = match[2] ? match[2].trim() : '';
                        if (reason) {
                            seller.recentVouches.unshift(reason);
                            if (seller.recentVouches.length > 5) {
                                seller.recentVouches = seller.recentVouches.slice(0, 5);
                            }
                        }
                        await seller.save();
                        const embed = new EmbedBuilder()
                            .setDescription(`Vouch \`${seller.vouches}\` submitted for <@${sellerId}>.`)
                            .setColor('#5865F2');
                        await message.reply({ embeds: [embed] });
                    }
                } catch (err) {
                    logError(err, 'Vouch System (+rep)');
                }
                return;
            }
        }
        const prefix = client.prefix || '!';
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.prefixCommands ? client.prefixCommands.get(commandName) : null;
        if (!command) return;
        try {
            await command.execute(message, args, client);
        } catch (error) {
            logError(error, `Executing Prefix Command: ${commandName}`);
            await message.reply({ content: 'There was an error while executing this command!', ephemeral: true }).catch(() => {});
        }
    },
};
