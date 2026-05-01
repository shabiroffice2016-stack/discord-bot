const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!task")) {
    await axios.post(process.env.N8N_WEBHOOK, {
      user: message.author.username,
      message: message.content
    });

    message.reply("Task received ✅");
  }
});

client.login(process.env.DISCORD_TOKEN);
