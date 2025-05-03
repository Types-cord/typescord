import { config } from 'dotenv';
config();

import { TypescordClient, CommandHandler, getDecoratedCommands } from 'typescord-ts';

class BotCommands {
  @CommandHandler('ping', 'Replies with Pong!')
  ping(interaction: any) {
    interaction.reply('Pong!');
  }
}

const bot = new TypescordClient({
  token: process.env.TOKEN!,
  clientId: process.env.CLIENT_ID!,
  guildId: process.env.GUILD_ID,
});

getDecoratedCommands().forEach(cmd => bot.command(cmd));

bot.start();