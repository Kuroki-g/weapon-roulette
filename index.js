import { Client, Events, GatewayIntentBits } from 'discord.js';
// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// 初期状態で実行する
client.once(Events.ClientReady, c => {
    console.log(`準備OKです! ${c.user.tag}がログインします。`);
});


import rand from './commands/rand.js';

const AVAILABLE_COMMAND_NAMES = [
    rand.data.name
]

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    if (!AVAILABLE_COMMAND_NAMES.includes(interaction.commandName)) {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
        return;
    }

    if (interaction.commandName === rand.data.name) {
        try {
            await rand.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    }
});


import config from './config.json' assert { type: "json" };
client.login(config.token);