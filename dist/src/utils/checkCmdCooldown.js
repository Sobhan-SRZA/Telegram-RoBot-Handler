"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkCmdCooldown;
const tslib_1 = require("tslib");
const error_1 = tslib_1.__importDefault(require("./error"));
const Collection_1 = require("../classes/Collection");
async function checkCmdCooldown(client, message, command) {
    try {
        const userId = message.from.id;
        if (!client.cooldowns.has(command.data.name))
            client.cooldowns.set(command.data.name, new Collection_1.Collection());
        const timestamps = client.cooldowns.get(command.data.name), defaultCooldownDuration = 3, cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
        if (timestamps.has(userId)) {
            const expirationTime = timestamps.get(userId) + cooldownAmount;
            if (Date.now() < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                await message.replyWithMarkdownV2(`\`\`\`\n*به دلیل استفاده بیش از حد، شما موقتا از دستور /${command.data.name} محروم شده‌اید. دوباره پس از <t:${expiredTimestamp}:R> می‌توانید از آن استفاده کنید.*\`\`\``);
                return true;
            }
            ;
        }
        ;
        timestamps.set(userId, Date.now());
        setTimeout(() => timestamps.delete(userId), cooldownAmount);
        return false;
    }
    catch (e) {
        (0, error_1.default)(e);
    }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=checkCmdCooldown.js.map