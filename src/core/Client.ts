import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { Command } from './Command';
import { Event } from './Event';

type TypescordClientOptions = {
  token: string;
  clientId: string;
  guildId?: string;
};

export class TypescordClient {
  private client: Client;
  private commands: Command[] = [];
  private events: Event[] = [];
  private token: string;
  private clientId: string;
  private guildId?: string;

  constructor(options: TypescordClientOptions) {
    this.token = options.token;
    this.clientId = options.clientId;
    this.guildId = options.guildId;
    this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
  }

  public command(command: Command) {
    this.commands.push(command);
  }

  public event(event: Event) {
    this.events.push(event);
  }

  public async start() {
    const rest = new REST({ version: '10' }).setToken(this.token);
    const body = this.commands.map(cmd => cmd.toJSON());

    try {
      if (this.guildId) {
        await rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), { body });
      } else {
        await rest.put(Routes.applicationCommands(this.clientId), { body });
      }
    } catch (err) {
      console.error('Error registering commands:', err);
    }

    for (const event of this.events) {
      this.client.on(event.name, event.execute);
    }

    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;
      const command = this.commands.find(c => c.name === interaction.commandName);
      if (command) await command.execute(interaction);
    });

    await this.client.login(this.token);
  }
}
