const Discord = require('discord.js');
const fs = require("fs");
let euro = require("../euro.json");
let userFile = require("../userFile.json");
let guildInfo = require("../guildInfo.json");


module.exports.run = async (client, message, args, active) => {

    var guildx = client.guilds.find("id", "431185190044434432");

    if(!userFile[message.author.id]) {

        userFile[message.author.id] = {
        
            hasNSFW: false,
            boughtNSFW: false,
            endsNSFW: false,
            giftsWithdrawn: 0
        }

        await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
            if(err) return console.log(err);
        });

    } else if (!userFile[message.author.id].giftsWithdrawn) {

        userFile[message.author.id] = {

            hasNSFW: userFile[message.author.id].hasNSFW,
            boughtNSFW: userFile[message.author.id].boughtNSFW,
            endsNSFW: userFile[message.author.id].endsNSFW,
            giftsWithdrawn: 0

        }

        await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
            if(err) return console.log(err);
        });

    }

    if(!euro[message.author.id]){

        euro[message.author.id] = {

            euro: 0

        };

        fs.writeFile("./euro.json", JSON.stringify(euro, null, 4), (err) => {
            if(err) return console.log(err);
        });
    }



    try {

    if(userFile[message.author.id].giftsWithdrawn < guildInfo[guildx.id].memberRecords){

        userFile[message.author.id] = {
            hasNSFW: userFile[message.author.id].hasNSFW,
            boughtNSFW: userFile[message.author.id].boughtNSFW,
            endsNSFW: userFile[message.author.id].endsNSFW,
            giftsWithdrawn: userFile[message.author.id].giftsWithdrawn + 1
        }

        await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
            if(err) return console.log(err);
        });

        euro[message.author.id] = {
            username: message.author.username,
            euro: euro[message.author.id].euro + 20
        }

        await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
            if(err) return console.log(err);
        });

        let prizeEmbed = new Discord.RichEmbed()
        .setColor(0x00E5EE)
        .addField("Prizas", `${message.author.username} atsiėmė €20 rekordo proga!`)
        //.addField("Saskaitos likutis",`Šiuo metu turite **€${euro[message.author.id].euro + 20}**`);
    
        const pokalbiaiChannel = client.channels.find("id", "443821222351077418");
        message.channel.send(prizeEmbed);
        message.delete();

    } else if (userFile[message.author.id].giftsWithdrawn >= guildInfo[guildx.id].memberRecords) {

        message.channel.send("Nėra jokios dovanos kurią galite atsiimti!");

    }

        } catch(err) {
            console.log(err);
        }

}

module.exports.help = {

    name: "euro",
    name: "giftsWithdrawn"

}