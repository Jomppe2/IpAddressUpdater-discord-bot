
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
   intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
   ],
});

module.exports = client;

client.login(
   '*your discord bot token*'
);

client.on('ready', (c) => {
   console.log(`✅ ${c.user.tag} is online`);

   const fetchAndPostIP = require('./fetchIP.js');

});
