# Typescord
A clean, extensible Discord bot framework written in TypeScript.

## Features
- Slash command support
- Event handling
- Decorator support for clean command/event registration
- Simple, extensible API
- TypeScript native

## Example
```ts
const bot = new TypescordClient({ token: 'YOUR_TOKEN', clientId: 'YOUR_CLIENT_ID' });

bot.command(new Command({
  name: 'ping',
  description: 'Ping pong!',
  execute: interaction => interaction.reply('Pong!'),
}));

bot.start();
```

## With Decorators
```ts
class BotCommands {
  @CommandHandler('ping', 'Replies with Pong!')
  ping(interaction) {
    interaction.reply('Pong!');
  }
}
```

## License
MIT
