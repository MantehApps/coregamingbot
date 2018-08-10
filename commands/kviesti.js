const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    let fortniteRole = message.guild.roles.find('name',"Fortnite");
    let inviteFriendName = message.mentions.members.first();

    var argString = args[0];

    if (`${inviteFriendName}` == message.author.toString()) { 
        
        message.channel.send(`${message.author}, negalite kviesti savęs!`);
        message.delete();

    } else if (argString == undefined) { // Jeigu nepazymetas narys.

        message.channel.send(`${message.author} kviečia žaisti ${fortniteRole} !`);
        message.delete();

    } else if (argString != undefined) {
        
        if (inviteFriendName == undefined) {

            message.channel.send(`Naudokite **!kviesti** ARBA **!kviesti @narys**`);
            message.delete();
    
        } else if (inviteFriendName != message.author.toString()) {

            message.channel.send(`${message.author} kviečia ${inviteFriendName} žaisti ${fortniteRole} !`);
            message.delete();

        } 

    }

};