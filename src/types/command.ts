import { Context, NarrowedContext } from "telegraf";
import { Message, Update } from "telegraf/typings/core/types/typegram";

type Categories = "misc" | "admin" | "owner" | "nsfw";

export default interface CommandType {
    data: {
        name: string;
        description: string;
    };
    category: Categories;
    aliases?: string[];
    usage?: string;
    cooldown: number;
    only_owner?: boolean;
    only_group?: boolean;
    only_admins?: boolean;
    run: (ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>, args: string[]) => void;
}

export type {
    Categories
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