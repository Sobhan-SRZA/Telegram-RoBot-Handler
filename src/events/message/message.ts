import { Message, Update } from "telegraf/typings/core/types/typegram";
import { Context, NarrowedContext } from "telegraf";
import TelegramClient from "../../classes/Client";
import error from "../../utils/error";
import checkCmdCooldown from "../../utils/checkCmdCooldown";

export default async (client: TelegramClient, message: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>) => {
 try {
  const db = client.db!;

  // Filter the bots
  if (message.from.is_bot)
   return;

  if (message.text && message.text.startsWith("/")) {
   const
    // commandName = message.text.slice(1),
    // args = commandName.split(" ").slice(1),
    args = message.text.slice(1).trim().split(/ +/g),
    commandName = args.shift()!.toLowerCase(),
    command =
     client.commands.get(commandName) ||
     client.commands.find(a => a.aliases && a.aliases.includes(commandName));

   if (!command)
    return ;

   console.log(commandName);
   console.log(args);

   // Cooldown
   if (await checkCmdCooldown(client, message, command!))
    return ;

   // Command Handler
   await db.add("totalCommandsUsed", 1);
   return command.run(message);
  }
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