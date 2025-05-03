import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export class Command {
  name: string;
  description: string;
  execute: (interaction: ChatInputCommandInteraction) => void;

  constructor(options: { name: string; description: string; execute: (interaction: ChatInputCommandInteraction) => void }) {
    this.name = options.name;
    this.description = options.description;
    this.execute = options.execute;
  }

  toJSON() {
    return new SlashCommandBuilder().setName(this.name).setDescription(this.description).toJSON();
  }
}