// discord.js v14では、下記のようにRESTとRoutesはdiscord.jsパッケージから直接インポートできます
import { REST, Routes } from 'discord.js';

// hey.jsのmodule.exportsを呼び出します。
import { data } from './commands/hey.js';
import config from './config.json' assert { type: "json" };

// 登録するコマンドの配列を作成する。
const commands = [
    data.toJSON()
];

/**
 * DiscordのAPIには現在最新のversion10を指定
 * @link https://discord-api-types.dev/api/discord-api-types-v10
 */
const rest = new REST({ version: '10' }).setToken(config.token);

/**
 * Discordサーバーにコマンドを登録する。
 */
const deployCommands = async () => {
    try {
        await rest.put(
			Routes.applicationGuildCommands(config.applicationId, config.guildId),
			{ body: commands },
		);
        console.log('サーバー固有のコマンドが登録されました！');
    } catch (error) {
        console.error('コマンドの登録中にエラーが発生しました:', error);
    }
};

await deployCommands();