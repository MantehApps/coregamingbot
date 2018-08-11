const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const vipFile = require('./commands/vip.js');
const token = "NDQ0OTY3NTM2NDQyNzM2Njky.DjDz0A.sx-KuWYkj-DuvrQ2xR867DnS12s"
//const token = process.env.token;


const botconfig = require("./botconfig.json");

let vipCode = '168205';
let memberHasVIP = new Boolean();





fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});


client.on("ready", async () => {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity(`Serveryje narių: ${(client.users.size)}`);
});

client.on("presenceUpdate", (oldMember, newMember) => {
    let guild = newMember.guild;
    let owRole = guild.roles.find("name", "Overwatch");
    let fnRole = guild.roles.find("name", "Fortnite");
    let pubgRole = guild.roles.find("name", "PUBG");
    let csgoRole = guild.roles.find("name", "CS:GO");
    let lolRole = guild.roles.find("name", "League of Legends");
    let gtavRole = guild.roles.find("name", "GTA V");
    let dauntlessRole = guild.roles.find("name", "  Dauntless");
    let dotaRole = guild.roles.find("name", "Dota 2");
    
    if(!owRole && !fnRole && !pubgRole && !csgoRole) return;
  
    if(newMember.user.presence.game && newMember.user.presence.game.name === "Overwatch") {
      newMember.addRole(owRole).catch(console.error);
    } 

    if(newMember.user.presence.game && newMember.user.presence.game.name === "Fortnite") {
        newMember.addRole(fnRole).catch(console.error);
    }

    if(newMember.user.presence.game && newMember.user.presence.game.name === "PLAYERUNKNOWNS'S BATTLEGROUNDS") {
        newMember.addRole(pubgRole).catch(console.error);
    }

    if(newMember.user.presence.game && newMember.user.presence.game.name === "Counter-Strike Global Offensive") {
        newMember.addRole(csgoRole).catch(console.error);
    }

    if(newMember.user.presence.game && newMember.user.presence.game.name === "League of Legends") {
        newMember.addRole(lolRole).catch(console.error);
    }

    if(newMember.user.presence.game && newMember.user.presence.game.name === "Grand Theft Auto V") {
        newMember.addRole(gtavRole).catch(console.error);
    }

    if(newMember.user.presence.game && newMember.user.presence.game.name === "Dauntless") {
        newMember.addRole(dauntlessRole).catch(console.error);
    }

    if(newMember.user.presence.game && newMember.user.presence.game.name === "Dota 2") {
        newMember.addRole(dotaRole).catch(console.error);
    }

    


  });

client.on("messageReactionAdd", (reaction, user) => {
    
    if(reaction.message.id == '477957705760243713') {
        console.log("React Added on message Ranks")
    }

});

client.on("message", async message => {

    if (message.author.bot) return;
        // KITOS KOMANDOS BE PREFIX

            let coreGamingID = client.guilds.get("431185190044434432");
            let vipRole = coreGamingID.roles.find("name", "V.I.P");


        if (message.channel.type === 'dm' && vipFile.vipRequestFunction != undefined) {
            try {
                if (message.content === vipCode && vipFile.vipRequestFunction() == true) {
                    
                    let getMessageAuthorID = message.author.id;
                    memberHasVIP = coreGamingID.member(getMessageAuthorID).roles.has(vipRole.id);

                    if(memberHasVIP == false) {
                        coreGamingID.member(getMessageAuthorID).addRole(vipRole);
                        return message.author.send("Sveikiname prisijungus į **CoreGaming Lithuania VIP!**");
                    } else if (memberHasVIP == true) {
                        return message.author.send("Jus jau esate VIP!");
                    }
                    
                } else if (message.content != vipCode && vipFile.vipRequestFunction() == true && message.content != "!vip") {
                    return message.author.send("Įvestas neteisingas VIP kodas!");
                }
            } catch (err) {
                console.log(err);
            } 
        };
        
    
    
        //
    if (message.content.indexOf(botconfig.prefix) !== 0) return;

    const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();



    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
      } catch (err) {
        console.error(err);
      }
});

client.on("guildMemberAdd", () => {

    client.user.setActivity(`Serveryje narių: ${(client.users.size) + 1}`);

});

client.on("guildMemberRemove", () => {

    client.user.setActivity(`Serveryje narių: ${(client.users.size) - 1}`);

});


client.login(token);