/* eslint-disable jsdoc/require-param */

// import {
//   ActionRow,
//   ActionRowBuilder,
//   ButtonBuilder,
//   ButtonComponent,
//   ButtonStyle,
// } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/commands/errorEmbedGenerator";
import { beccaErrorHandler } from "../../../utils/beccaErrorHandler";

/**
 * Handles adding a role to an existing reaction role post.
 */
export const handleAdd: CommandHandler = async (Becca, interaction, t) => {
  try {
    await interaction.editReply({
      content: "This command is temporarily unavailable.",
    });
    // const { guild } = interaction;

    // if (!guild) {
    //   await interaction.editReply({ content: t<string, string>("responses:missingGuild") });
    //   return;
    // }

    // const role = interaction.options.getRole("role", true);
    // const [messageId, channelId] = interaction.options
    //   .getString("link", true)
    //   .split("/")
    //   .reverse();

    // if (!messageId || !channelId) {
    //   await interaction.editReply({
    //     content: t<string, string>("commands:reactionrole.add.badLink"),
    //   });
    //   return;
    // }

    // const channel =
    //   guild.channels.cache.get(channelId) ||
    //   (await guild.channels.fetch(channelId));

    // if (!channel || !("messages" in channel)) {
    //   await interaction.editReply({
    //     content: t<string, string>("commands:reactionrole.add.badChannel"),
    //   });
    //   return;
    // }

    // const message = await channel.messages.fetch(messageId);

    // if (!message) {
    //   await interaction.editReply({
    //     content: t<string, string>("commands:reactionrole.add.badMessage"),
    //   });
    //   return;
    // }

    // if (message.author.id !== Becca.user?.id) {
    //   await interaction.editReply({
    //     content: t<string, string>("commands:reactionrole.add.notMine"),
    //   });
    //   return;
    // }

    // if (!message.components.length) {
    //   await interaction.editReply({
    //     content: t<string, string>("commands:reactionrole.add.notReactionRole"),
    //   });
    //   return;
    // }

    // if (
    //   message.components.length === 5 &&
    //   message.components.every((row) => row.components.length === 5)
    // ) {
    //   await interaction.editReply({
    //     content: t<string, string>("commands:reactionrole.add.tooManyRoles"),
    //   });
    //   return;
    // }

    // const rowHasRole = message.components.find((row) =>
    //   row.components.find((button) => button.customId === `rr-${role.id}`)
    // );

    // if (rowHasRole) {
    //   await interaction.editReply({
    //     content: t<string, string>("commands:reactionrole.add.hasRole"),
    //   });
    //   return;
    // }

    // const shortRow = message.components.find(
    //   (row) => row.components.length < 5
    // ) as ActionRow<ButtonComponent> | undefined;

    // const button = new ButtonBuilder()
    //   .setLabel(role.name)
    //   .setCustomId(`rr-${role.id}`)
    //   .setStyle(ButtonStyle.Secondary);

    // if (!shortRow) {
    //   const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button]);

    //   message.components.push(row);
    //   await message.edit({ components: message.components });
    //   await interaction.editReply({
    //     content: t<string, string>("commands:reactionrole.add.success"),
    //   });
    //   return;
    // }
    // shortRow.addComponents([button]);
    // await message.edit({ components: message.components });
    // await interaction.editReply({
    //   content: t<string, string>("commands:reactionrole.add.success"),
    // });
  } catch (err) {
    const errorId = await beccaErrorHandler(
      Becca,
      "reaction role create",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Becca, "reactionrole create", errorId, t)],
    });
  }
};
