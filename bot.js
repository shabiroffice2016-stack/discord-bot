const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Optional: only respond to commands
  if (!message.content.startsWith("!")) return;

  try {
    // Send message to n8n
    await axios.post(process.env.N8N_WEBHOOK, {
      user: message.author.username,
      message: message.content,
      channel: message.channel.id
    });

    // Reply in Discord
    await message.reply("Received ✅ Processing...");
    
  } catch (err) {
    console.error(err);
    await message.reply("Error sending to server ❌");
  }
});

client.login(process.env.DISCORD_TOKEN);
