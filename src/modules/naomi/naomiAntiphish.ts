import axios from "axios";
import { Message } from "discord.js";

import { BeccaLyria } from "../../interfaces/BeccaLyria";
import { beccaErrorHandler } from "../../utils/beccaErrorHandler";

/**
 * Owner command for flagging new scam domains.
 *
 * @param {BeccaLyria} Becca Becca's discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const naomiAntiphish = async (Becca: BeccaLyria, message: Message) => {
  try {
    // Naomi fish <link>
    const [, , link] = message.content.split(" ");

    const walshyResult = await axios.post<{ message: string }>(
      "https://bad-domains.walshy.dev/report",
      { domain: link }
    );

    const heptagramResult = await axios.post<boolean>(
      `http://api.heptagrambotproject.com/v4/scam/link/report?url=${link}`,
      {
        headers: {
          Authorization: "Bearer " + Becca.configs.heptagramApiToken,
        },
        body: {
          link: link,
          reportedby: `${message.author.id} || Becca Lyria`,
        },
      }
    );

    await message.reply(
      `I have reported that domain! Here's the result:\n${JSON.stringify({
        walshy: walshyResult.data.message,
        heptagram: heptagramResult.data,
      })}`
    );
  } catch (err) {
    await beccaErrorHandler(
      Becca,
      "naomi antiphish",
      err,
      message.guild?.name,
      message
    );
  }
};
