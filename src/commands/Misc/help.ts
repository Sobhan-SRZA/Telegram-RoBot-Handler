import CommandType from "../../types/command";
import error from "../../utils/error";
import TelegramClient from "../../classes/Client";

const command: CommandType = {
  data: {
    name: "help",
    description: "لیست دستورات بات."
  },
  category: "member",
  cooldown: 10,
  only_owner: false,
  run: async (ctx) => {
    try {
      ctx.reply("this is help text")
     } catch (e: any) {
      error(e)
    }
  }
};
export default command;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */