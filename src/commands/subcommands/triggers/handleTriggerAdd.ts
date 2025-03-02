/* eslint-disable jsdoc/require-param */
import { EmbedBuilder } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/commands/errorEmbedGenerator";
import { beccaErrorHandler } from "../../../utils/beccaErrorHandler";

/**
 * Adds a new trigger to the server config.
 */
export const handleTriggerAdd: CommandHandler = async (
  Becca,
  interaction,
  t,
  config
) => {
  try {
    const trigger = interaction.options.getString("trigger", true);
    const response = interaction.options.getString("response", true);

    const hasTrigger = config.triggers.find((el) => el[0] === trigger);

    if (hasTrigger) {
      await interaction.editReply({
        content: t<string, string>("commands:triggers.add.duplicate"),
      });
      return;
    }

    if (config.triggers.length >= 50) {
      await interaction.editReply({
        content: t<string, string>("commands:triggers.add.max"),
      });
      return;
    }

    config.triggers.push([trigger, response]);
    config.markModified("triggers");
    await config.save();

    const success = new EmbedBuilder();
    success.setTitle(t<string, string>("commands:triggers.add.title"));
    success.setDescription(
      t<string, string>("commands:triggers.add.description", { trigger })
    );
    success.setColor(Becca.colours.default);
    success.addFields([
      {
        name: t<string, string>("commands:triggers.add.trigger"),
        value: trigger,
      },
      {
        name: t<string, string>("commands:triggers.add.response"),
        value: response,
      },
    ]);
    success.setAuthor({
      name: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL(),
    });
    success.setTimestamp();
    success.setFooter({
      text: t<string, string>("defaults:donate"),
      iconURL: "https://cdn.nhcarrigan.com/profile.png",
    });

    await interaction.editReply({ embeds: [success] });
  } catch (err) {
    const errorId = await beccaErrorHandler(
      Becca,
      "trigger add command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Becca, "trigger add", errorId, t)],
    });
  }
};
