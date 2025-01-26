import { Context, NarrowedContext } from "telegraf";
import { Message, Update } from "telegraf/typings/core/types/typegram";
import TelegramClient from "../classes/Client";
import error from "./error";
import CommandType from "../types/command";
import { Collection } from "../classes/Collection";
import escapeMarkdown from "../functions/escapeMarkdown";

export default async function checkCmdCooldown(
  client: TelegramClient,
  message: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>,
  command: CommandType
): Promise<boolean | void> {
  try {
    const userId = message.from.id;
    if (!client.cooldowns.has(command.data.name))
      client.cooldowns.set(command.data.name, new Collection());

    const
      timestamps = client.cooldowns.get(command.data.name)!,
      cooldownDuration = (command.cooldown ?? 3),
      cooldownAmount = cooldownDuration * 1000;


    if (timestamps.has(userId)) {
      const expirationTime = timestamps.get(userId)! + cooldownAmount;
      if (Date.now() < expirationTime) {
        await message.replyWithMarkdownV2(escapeMarkdown(`**⚠ شما به دلیل اسپم ممنوع شدید!**\nبدلیل اسپم از دستور **/${command.data.name}** به مدت \`🕓 ${cooldownDuration} ثانیه\` ممنوع شدید!\n لطفا پس از اتمام زمان دوباره تلاش کنید.`))
        return true;
      }
    }

    timestamps.set(userId, Date.now());
    setTimeout(() => timestamps.delete(userId), cooldownAmount);

    return false;
  } catch (e: any) {
    error(e);
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