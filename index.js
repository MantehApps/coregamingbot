const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const botconfig = require("./botconfig.json");
const isUrl = require("is-url")
const token = process.env.token;

const active = new Map();

let euro = require("./euro.json");
let userFile = require("./userFile.json");
let guildInfo = require("./guildInfo.json");
let todayDate = new Date();




fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});



client.on("ready", async () => {


    
    var guildx = client.guilds.find("id", "431185190044434432");
    //const minigamesChannel = client.channels.find("id", "479704698534887455");
    await guildx.channels.find("id", "470568836027121675").fetchMessage("477968084737720320");
    console.log(`${client.user.username} is now connected to ${guildx.name}!`);

    //minigamesChannel.send("Šis kanalas yra skirtas serverio mini žaidimams!\n\nŠiuo metu yra tik sukurtas tik vienas mini žaidimas.\n\nŽaidimą galite žaisti parašę **!coinflip <heads/tails> <eurų skaičius>**\n\nJums pasirinkus heads/tails ir parašius komandą, sužinosite laimėjote ar ne. Tikimybės šansas laimėti ant **Tails yra 50%** ir **Heads yra 50%**. Jums laimėjus gausite 1.5x atgal sumos kurią padėjote, o pralaimėjus tos sumos neteksite");

    let streamingOnlineUsers = "Prisijungę: " + guildx.members.filter(m => m.presence.status !== 'offline' && !m.user.bot).size + "/" + guildx.members.filter(m => !m.user.bot).size;

    client.user.setActivity(streamingOnlineUsers, {
        type: "STREAMING",
        url: "https://www.twitch.tv/mantehtv"
      });


    /*let newPresence = {game:{name:"Summer Night Vibes", type: 2}};
    client.user.setPresence(newPresence);*/

     var guildx = client.guilds.find("id", "431185190044434432");

            if(!guildInfo[guildx.id]) {

                guildInfo[guildx.id] = {

                    "mostMembersRecord": guildx.members.filter(m => !m.user.bot).size,
                    "memberRecords": 0

                };

                await fs.writeFileSync("./guildInfo.json", JSON.stringify(guildInfo, null, 4), (err) => {
                    if (err) console.log(err);
                });
                
            }
    
            try {
    
            if(guildx.members.filter(m => !m.user.bot).size > guildInfo[guildx.id].mostMembersRecord) { // Jeigu serveryje daugiau narių negu dabartinis serverio rekordas
        
                
                guildInfo[guildx.id] = {
                    mostMembersRecord: guildInfo[guildx.id].mostMembersRecord + 1, // Naujas narių rekordo skaičius.
                    memberRecords: guildInfo[guildx.id].memberRecords + 1 // Įvykusių rekordų skaičius.
                }

                const pokalbiaiChannel = client.channels.find("id", "443821222351077418");

                let recordEmbed = new Discord.RichEmbed()
                .setTitle(`Naujas serverio rekordas!`)
                .setDescription(`Dabar serveryje narių: ${guildx.members.filter(m => !m.user.bot).size}!`)
                .setColor(0x00E5EE)
                .addField("Prizas", "Rašykite **!rekordas** ir atsiimkite savo prizą!")
            
                pokalbiaiChannel.send(recordEmbed);

            }

            } catch(err) {
                console.log(err);
            }

            await fs.writeFileSync("./guildInfo.json", JSON.stringify(guildInfo, null, 4), (err) => {
                if (err) console.log(err);
            });

        



    
});

client.on("presenceUpdate", (oldMember, newMember) => {
    let guild = newMember.guild;
    let owRole = guild.roles.find("name", "Overwatch");
    let fnRole = guild.roles.find("name", "Fortnite");
    let pubgRole = guild.roles.find("name", "PUBG");
    let csgoRole = guild.roles.find("name", "CS:GO");
    let lolRole = guild.roles.find("name", "League of Legends");
    let gtavRole = guild.roles.find("name", "GTA V");
    let dauntlessRole = guild.roles.find("name", "Dauntless");
    let dotaRole = guild.roles.find("name", "Dota 2");
    let runescapeRole = guild.roles.find("name", "Runescape");

    let NSFWRole = guild.roles.find("name", "NSFW Narys");
  
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

    if(newMember.user.presence.game && newMember.user.presence.game.name === "DOTA 2") {
        newMember.addRole(dotaRole).catch(console.error);
    }

    if(newMember.user.presence.game && newMember.user.presence.game.name === "Runescape 3") {
        newMember.addRole(runescapeRole).catch(console.error);
    }

    if(newMember.roles.has(NSFWRole.id)) {

        // BLAH BLAH
    }

    var guildx = client.guilds.find("id", "431185190044434432");
    let streamingOnlineUsers = "Prisijungę: " + guildx.members.filter(m => m.presence.status !== 'offline' && !m.user.bot).size + "/" + guildx.members.filter(m => !m.user.bot).size;

    client.user.setActivity(streamingOnlineUsers, {
        type: "STREAMING",
        url: "https://www.twitch.tv/mantehtv"
      });




  });



client.on("messageReactionAdd", (reaction, user) => {

    let guild = client.guilds.get("431185190044434432");
    let reactUser = guild.members.get(user.id);
    let owRole = guild.roles.find("name", "Overwatch");
    let fnRole = guild.roles.find("name", "Fortnite");
    let pubgRole = guild.roles.find("name", "PUBG");
    let csgoRole = guild.roles.find("name", "CS:GO");
    let lolRole = guild.roles.find("name", "League of Legends");
    let gtavRole = guild.roles.find("name", "GTA V");
    let dotaRole = guild.roles.find("name", "Dota 2");
    let runescapeRole = guild.roles.find("name", "Runescape");



    if(reaction.message.id == '477968084737720320') { // Rolės užsidėjimas nusijėmimas - paaiškinimas by Manteh
        

            if(reaction.emoji.name == 'FN' && !reactUser.roles.has(fnRole.id)) {
                try {
                    guild.member(user.id).addRole(fnRole);
                }catch(err) {
                    console.log(err);
                }
            }

            
            if(reaction.emoji.name == 'ow' && !reactUser.roles.has(owRole.id)) {
                try {
                    guild.member(user.id).addRole(owRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'PUBG' && !reactUser.roles.has(pubgRole.id)) {
                try {
                    guild.member(user.id).addRole(pubgRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'LoL' && !reactUser.roles.has(lolRole.id)) {
                try {
                    guild.member(user.id).addRole(lolRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'dota2' && !reactUser.roles.has(dotaRole.id)) {
                try {
                    guild.member(user.id).addRole(dotaRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'csgo' && !reactUser.roles.has(csgoRole.id)) {
                try {
                    guild.member(user.id).addRole(csgoRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'gtav' && !reactUser.roles.has(gtavRole.id)) {
                try {
                    guild.member(user.id).addRole(gtavRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'rs' && !reactUser.roles.has(runescapeRole.id)) {
                try {
                    guild.member(user.id).addRole(runescapeRole);
                }catch(err) {
                    console.log(err);
                }
            }


    }

});

client.on("messageReactionRemove", (reaction, user) => {

    let guild = client.guilds.get("431185190044434432");
    let reactUser = guild.members.get(user.id);
    let owRole = guild.roles.find("name", "Overwatch");
    let fnRole = guild.roles.find("name", "Fortnite");
    let pubgRole = guild.roles.find("name", "PUBG");
    let csgoRole = guild.roles.find("name", "CS:GO");
    let lolRole = guild.roles.find("name", "League of Legends");
    let gtavRole = guild.roles.find("name", "GTA V");
    let dotaRole = guild.roles.find("name", "Dota 2");
    let runescapeRole = guild.roles.find("name", "Runescape");

    if(reaction.message.id == '477968084737720320') { // Rolės užsidėjimas nusijėmimas - paaiškinimas by Manteh

            if(reaction.emoji.name == 'FN' && reactUser.roles.has(fnRole.id)) {
                try {
                    guild.member(user.id).removeRole(fnRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'ow' && reactUser.roles.has(owRole.id)) {
                try {
                    guild.member(user.id).removeRole(owRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'PUBG' && reactUser.roles.has(pubgRole.id)) {
                try {
                    guild.member(user.id).removeRole(pubgRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'LoL' && reactUser.roles.has(lolRole.id)) {
                try {
                    guild.member(user.id).removeRole(lolRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'dota2' && reactUser.roles.has(dotaRole.id)) {
                try {
                    guild.member(user.id).removeRole(dotaRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'csgo' && reactUser.roles.has(csgoRole.id)) {
                try {
                    guild.member(user.id).removeRole(csgoRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'gtav' && reactUser.roles.has(gtavRole.id)) {
                try {
                    guild.member(user.id).removeRole(gtavRole);
                }catch(err) {
                    console.log(err);
                }
            }

            if(reaction.emoji.name == 'rs' && reactUser.roles.has(runescapeRole.id)) {
                try {
                    guild.member(user.id).removeRole(runescapeRole);
                }catch(err) {
                    console.log(err);
                }
            }



    }

});

client.on("message", async message => {

    try{

    if (message.author.bot) return;
        // KITOS KOMANDOS BE PREFIX

        /*await function play(connection, message) {

                    var server = message.guild.id
                
                    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: 
                    "audioonly" }));
                
                    server.dispatcher.setVolume(0.2);
                
                    server.queue.shift();
                
                    server.dispatcher.on("end", function () {
                
                    if (server.queue[0]) play(connection, message);
                    else connection.disconnect();
                
                    });
            
            }*/

            console.log(message.content);

        if((message.content).includes("<:Thiccnos:481134643811188746>") || (message.content).includes("<:Sad_Thor:481134645946220554>") || (message.content).includes("<:ImhotepSmile:481134646135095327>") || (message.content).includes("<:HardOn:481134644126023681>") || (message.content).includes("<:ahegao:481134644452917249>")) {

            let messageUser = message.guild.members.get(message.author.id);
            let emojiPack1Role = message.guild.roles.find("name", "Emoji Pack #1");

            if(!messageUser.roles.has(emojiPack1Role.id)) {

                message.reply("negalite naudoti šių emoji kadangi neesate nusipirkę tam atitinkamo emoji pack'o!");
                message.delete();

            }

        }


        if(message.channel.id == "479704698534887455" && !message.content.startsWith(botconfig.prefix)) return message.reply(`šiame kanale galite naudoti tik 🦍 Winstono komandas!`).then(msg => {
                msg.delete(10000)
                message.delete();
            });

        if(message.channel.id == "466354784170016768" && !message.content.startsWith(botconfig.prefix)) return message.reply(`šiame kanale galite naudoti tik 🦍 Winstono komandas!`).then(msg => {
                msg.delete(10000)
                message.delete();
        });
  
        try {    

        if(isUrl(message.content)) {

            if(message.channel.id != "463393640362803200") { // Jeigu linkas pokalbiu channel
                nuorodosChannel = message.guild.channels.find("id", "463393640362803200");
                message.reply(`šiame kanale draudžiama keltis nuorodas!\nNaudokite <#463393640362803200> kanalą!`).then(msg => {
                    msg.delete(10000)
                  });
                nuorodosChannel.send(message.content);
                message.delete();
            }

        }

        } catch(err) {console.log(err)};
 

        let NSFWRole = message.guild.roles.find("name", "NSFW Narys");
        let messageUser = message.guild.members.get(message.author.id);

        if(!euro[message.author.id]){

            euro[message.author.id] = {
    
                username: message.author.username,
                euro: 0
    
            };
    
            await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
                if(err) return console.log(err);
            });

        } else if (!euro[message.author.id].username) {
    
            euro[message.author.id] = {
    
                username: message.author.username,
                euro: euro[message.author.id].euro
    
            };
    
            await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
                if(err) return console.log(err);
            });
    
        }


        if(!userFile[message.author.id]) {

            userFile[message.author.id] = {
            
                hasNSFW: false,
                boughtNSFW: false,
                endsNSFW: false,
                giftsWithdrawn: 0,
                lastDaily: false
            }
    
            await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
                if(err) return console.log(err);
            });
    
        } 
        

        if(messageUser.roles.has(NSFWRole.id)) {


            let todayDateString = todayDate.toJSON().substring(0,10);

            let endsNSFWString = userFile[message.author.id].endsNSFW;

            if(endsNSFWString != false) {
                endsNSFWString = endsNSFWString.substring(0, 10);
            }


            if(todayDateString === endsNSFWString) {

                messageUser.removeRole(NSFWRole.id);
                message.channel.send(`Nario ${message.author.username} **NSFW Narystė** pasibaigė!`);

                    userFile[message.author.id] = {
                
                        hasNSFW: false,
                        boughtNSFW: false,
                        endsNSFW: false
                
                    }
            
                    fs.writeFile("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
                        if (err) console.log(err);
                    });
                
                }
            }
    
        
    
        //
    if (message.content.indexOf(botconfig.prefix) !== 0) return;

    if(!euro[message.author.id]){

        euro[message.author.id] = {

            euro: 0

        }

        fs.writeFile("./euro.json", JSON.stringify(euro, null, 4), (err) => {
            if (err) console.log(err);
        });
    }

    const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, active);
      } catch (err) {
        //console.error(`${message.author.username} panaudojo komandą ${message.content}`);
        console.log(err);
      }

    }catch(err){
        console.log(err);
    }
});

client.on("guildMemberAdd", (newMember) => {

    var guildx = client.guilds.find("id", "431185190044434432");

    if(!guildInfo[guildx.id]) {

        guildInfo[guildx.id] = {

            "mostMembersRecord": guildx.members.filter(m => !m.user.bot).size,
            "memberRecords": 0

        };

        fs.writeFile("./guildInfo.json", JSON.stringify(guildInfo, null, 4), (err) => {
            if (err) console.log(err);
        });
        
    }


    try {

    if(guildx.members.filter(m => !m.user.bot).size > guildInfo[guildx.id].mostMembersRecord) { // Jeigu serveryje daugiau narių negu dabartinis serverio rekordas


        guildInfo[guildx.id] = {
            mostMembersRecord: guildInfo[guildx.id].mostMembersRecord + 1, // Naujas narių rekordo skaičius.
            memberRecords: guildInfo[guildx.id].memberRecords + 1 // Įvykusių rekordų skaičius.
        }

        const pokalbiaiChannel = client.channels.find("id", "443821222351077418");

        let recordEmbed = new Discord.RichEmbed()
        .setTitle(`Naujas serverio rekordas!`)
        .setDescription(`Dabar serveryje narių: ${guildx.members.filter(m => !m.user.bot).size}!`)
        .setColor(0x00E5EE)
        .addField("Prizas", "Rašykite **!rekordas** ir atsiimkite savo prizą!")
    
        pokalbiaiChannel.send(recordEmbed);

        fs.writeFileSync("./guildInfo.json", JSON.stringify(guildInfo, null, 4), (err) => {
            if (err) console.log(err);
        });

    }

    } catch(err) {
        console.log(err);
    }


});

client.on("guildMemberRemove", () => {

    var guildx = client.guilds.find("id", "431185190044434432");
    client.user.setActivity(`Serveryje narių: ${(client.guilds.get(guildx.id).memberCount)}`);

});


client.login(token);