import { SlashCommandBuilder } from 'discord.js';
import allWeapons from '../all-weapons.json' assert { type: "json" };

// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
const data = new SlashCommandBuilder()
    .setName('rand')
    .setDescription('ブキランダム選出');

/**
 * ブキをランダムに選出します。
 * @returns {string}
 */
const pickUpWeapon = () => {
    // 配列であるallWeaponsからランダムに1つの要素を取得します。
    const randomIndex = Math.floor(Math.random() * allWeapons.length);
    return allWeapons[randomIndex].main;
}

/**
 * コマンドの実行内容を記述します。
 * @param {ChatInputCommandInteraction<CacheType>} interaction
 * @returns {Promise<void>}
*/
async function execute(interaction) {
    await interaction.reply(pickUpWeapon());
}

export default {
    data: data,
    execute: execute
}