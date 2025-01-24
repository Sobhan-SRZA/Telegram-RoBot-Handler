import { Context, NarrowedContext } from "telegraf";
import { Message, Update } from "telegraf/typings/core/types/typegram";

export default interface CommandType {
    data: {
        name: string;
        description: string;
    };
    category: "member" | "admin" | "music" | "owner" | "nsfw";
    aliases?: string[];
    usage?: string;
    cooldown: number;
    only_owner: boolean;
    run: (ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>) => void;
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