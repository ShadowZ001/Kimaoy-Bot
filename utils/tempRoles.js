const TempRole = require('../database/models/TempRole');
function startTempRoleChecker(client) {
    setInterval(async () => {
        try {
            const now = new Date();
            const expiredRoles = await TempRole.find({ expiresAt: { $lte: now } });
            for (const record of expiredRoles) {
                try {
                    const guild = await client.guilds.fetch(record.guildId).catch(() => null);
                    if (guild) {
                        const member = await guild.members.fetch(record.userId).catch(() => null);
                        if (member) {
                            await member.roles.remove(record.roleId).catch(() => {});
                        }
                    }
                } catch (e) {
                    console.error("Error removing temp role:", e);
                }
                await TempRole.deleteOne({ _id: record._id });
            }
        } catch (err) {
            console.error("Error checking temp roles:", err);
        }
    }, 60 * 1000);
}
module.exports = { startTempRoleChecker };
