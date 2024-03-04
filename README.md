# IP-Address Updater Discord bot

This is a script for a discord bot, that restarts a minecraft server automatically. It detects when the ip-address of the computer where the script is running from, has changed and then restarts the server. It then uploads the changed ip-address to a specific discord text channel in a discord server, where the bot is added. The script can also detect, when the server has crashed, or isnt online for some reason. It also restarts the server, when this happens.

The reason why i made this script, is because our network operator sometimes changes the ip-address randomly, and the server needs to be restarted to be able to keep playing.

# What this script does:

This script runs every two minutes. When it runs, it checks the server status and fetches the ip-address of the pc, where the script is running, and stores it to a variable. The next time it runs, it compares the ip to the previus ip. If it's different, it connects to the server, and stops it. Next time it runs, it tries to connect to the server, and when it fails, it start's the server by opening a new command prompt.

This script updates the console every time it does something.

It posts a message to discord channel, when it notices a ip-address change. Then it posts a message, when the server is back online, along with the new ip-address.

Advantages of this script:
-
1. No need for a static ip-address, which costs extra money.
2. No need to start the server manually every time the ip-address changes.
3. No need to restart the server manually, when it crashes, or goes offline for some reason.

Disadvantages of this script:
-
1. Adds extra stuff running on the background on the server computer.
2. Every time the server is restarted, a new command prompt is opened and the old prompt cannot be closed automatically with this script. It adds a lot more code to be able to do that, and i made this script simple. A lot of cmd's opened on the pc could cause some minor performance issues along with unnecessary RAM memory usage, altought they could be closed manually now and then.

What you need to be able to use this script:
  -
  - Windows operating system. Could work with other systems as well
  - A discord bot
  - Node.js
  - You need to make changes to this code, so a coding enviroment is necessary (i used visual studio code)
  - Your pc needs to be allowed to execute scripts
  - These npm packages: Discord.js, modern-rcon and node-fetch
  - Some coding experience

How to make this code work for you:
  -
  - Every highlighted (*) section needs to be changed. You may need to change other parts of the code as well.
  - Make a folder in your desktop named "ipAddressUpdater", and make your discord bot's code in that folder. If you want to name the folder differently, you'll have to change the paths in the code accordingly.
  - All of these files need to be put in a folder named "src", and that folder needs to be in the "ipAdressUpdater" folder.
  - This script checks the server status and ip address every two minutes. That means, that if the ip-address has changed, it stops the server and starts it again after two minutes. If your server closing time is more than two minutes (which is not usual), you'll have to change the interval to be longer.

I used this video in making of the bot: https://youtu.be/KZ3tIGHU314?si=MQ00XvWixobSSyJG
