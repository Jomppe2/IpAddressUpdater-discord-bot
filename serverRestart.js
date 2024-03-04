
const Rcon = require('modern-rcon');

const host = 'localhost';
const password = 'yourPassword';

let rcon = new Rcon(host, password);

async function connectRcon() {
   try {
      await rcon.connect();
      console.log('Connected to Minecraft server');

      await rcon.send('stop');

      await rcon.disconnect();
      
   } catch (error) {
      console.error('Failed to connect to Minecraft server via RCON:', error);
   }
}

connectRcon();
