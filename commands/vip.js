const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // let VIP = message.guild.roles.find("name", "V.I.P");

    var vipRequested = new Boolean(false);
    
    if (message.channel.type === 'dm' && vipRequested != true) {
        message.author.send("Įveskite VIP prisijungimo kodą:");
        vipRequested = true;
        exports.vipRequestFunction = function() {
            return vipRequested;
        };
    }

}