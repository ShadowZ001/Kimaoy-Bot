function parsePlaceholders(text, user, guild) {
    if (!text) return text;
    let parsed = text;
    if (user) {
        parsed = parsed.replace(/{user}/g, `<@${user.id}>`);
        parsed = parsed.replace(/{user\.name}/g, user.username);
        parsed = parsed.replace(/{user\.tag}/g, user.tag);
        parsed = parsed.replace(/{user\.id}/g, user.id);
        parsed = parsed.replace(/{user\.avatar}/g, user.displayAvatarURL({ dynamic: true }));
    }
    if (guild) {
        parsed = parsed.replace(/{server}/g, guild.name);
        parsed = parsed.replace(/{server\.name}/g, guild.name);
        parsed = parsed.replace(/{server\.id}/g, guild.id);
        parsed = parsed.replace(/{server\.membercount}/g, guild.memberCount.toString());
        parsed = parsed.replace(/{server\.icon}/g, guild.iconURL({ dynamic: true }) || '');
    }
    const now = new Date();
    parsed = parsed.replace(/{time}/g, `<t:${Math.floor(now.getTime() / 1000)}:f>`);
    parsed = parsed.replace(/{date}/g, `<t:${Math.floor(now.getTime() / 1000)}:D>`);
    if (guild && guild.client) {
        parsed = parsed.replace(/(?<!<a?):([a-zA-Z0-9_]+):(?!\d+>)/g, (match, name) => {
            const emoji = guild.client.emojis.cache.find(e => e.name === name);
            if (emoji) {
                return emoji.toString();
            }
            return match;
        });
    }
    return parsed;
}
module.exports = { parsePlaceholders };
