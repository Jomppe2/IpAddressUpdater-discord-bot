
const client = require('./index.js');
const Rcon = require('modern-rcon');
const { exec } = require('child_process');

const host = 'localhost';
const password = '*yourPassword*';

let rcon = new Rcon(host, password);
let serverOnline = false;

function StartServer() {
   exec('start cmd.exe /K C:/Users/*yourUsername*/Desktop/ipAddressUpdater/src/commands.bat', (error, stdout, stderr) => {
      if (error) {
         console.error(`exec error: ${error}`);
         return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
   });
}

async function testRcon() {
   try {
      await rcon.connect();
      await rcon.disconnect();
      console.log('Server Online');
      serverOnline = true;
   } catch (error) {
      console.error('Failed to connect to Minecraft server. Restarting server.');
      setTimeout(() => {
         StartServer();
      }, 5000);
      serverOnline = false;
   }
}

let lastIpAddress = null;

const channelId = '*yourDiscordChannelID*';

async function getPublicIP() {
   try {
      const fetch = await import('node-fetch');
      const response = await fetch.default('https://api.ipify.org?format=json');
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return await data.ip;
   } catch (error) {
      console.error('Error fetching IP address:', error.message);
   }
}

// Function to post the IP address if it has changed
async function postIfIpAddressChanged(ipAddress, client) {
   await testRcon();
   if (ipAddress !== lastIpAddress) {
      lastIpAddress = ipAddress;
      if (serverOnline == true) {
         //restart the server
         const command = 'node src/serverRestart.js';
         exec(command, (error, stdout, stderr) => {
            if (error) {
               console.error(`Error executing command: ${error}`);
               return;
            }
            if (stderr) {
               console.log('Command output:', { stderr });
            }
            if (stdout) {
               console.log('Command output:', { stdout });
            }
         });
         //posting new ip address to discord
         try {
            const channel = await client.channels.fetch(channelId);
            if (!channel) {
               throw new Error(`Channel with ID ${channelId} not found.`);
            }
            await channel.send(`Detected an ip-address change. Server will be restarted.`);
            console.log('restarting server due to ip-address change.');

            async function serverStatus() {
               try {
                  await rcon.connect();
                  await rcon.disconnect();
                  await channel.send(`Server is online! New ip-address: ${ipAddress}`);
                  console.log('Server online');
               } catch (error) {
                  setTimeout(() => {
                     serverStatus();
                  }, 2000);
               }
            }
            setTimeout(() => {
               serverStatus();
            }, 125000);

         } catch (error) {
            console.error('Error posting IP address:', error);
         }
      }
   }
}
// Function to get the public IP address and post if it has changed
async function checkAndPostIP() {
   try {
      const ipAddress = await getPublicIP();
      console.log('Fetched IP-address:', ipAddress);
      postIfIpAddressChanged(ipAddress, client);
   } catch (error) {
      console.error('Error fetching IP-address:', error.message);
   }
};


// Call checkAndPostIP() initially
checkAndPostIP();

// Set an interval to call checkAndPostIP() every two minutes (120,000 milliseconds)
setInterval(checkAndPostIP, 120000);
