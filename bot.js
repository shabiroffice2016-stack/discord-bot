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
  console.log(`✅ Bot ready: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;

  try {
    // Send to n8n
    const response = await axios.post(process.env.N8N_WEBHOOK, {
      user: message.author.username,
      message: message.content,
      channelId: message.channel.id
    });

    // Reply with n8n response
    const reply = response.data?.reply || "Done ✅";
    await message.reply(reply);

  } catch (err) {
    console.error(err);
    await message.reply("❌ Error processing request");
  }
});

client.login(process.env.DISCORD_TOKEN);
