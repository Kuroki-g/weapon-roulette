import { SlashCommandBuilder } from 'discord.js';

// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
export const data = new SlashCommandBuilder()
    .setName('hey')
    .setDescription('あいさつに反応してbotが返事します');
export async function execute(interaction) {
    await interaction.reply('Hello world.');
}
