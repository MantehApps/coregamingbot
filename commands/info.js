const Discord = require('discord.js');
const fs = require("fs");
let euro = require("../euro.json");
let userFile = require("../userFile.json");

module.exports.run = async (client, message, args) => {


    if(!euro[message.author.id]){

        euro[message.author.id] = {

            euro: 0

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

    if (!userFile[message.author.id].giftsWithdrawn) {

        userFile[message.author.id] = {

            hasNSFW: userFile[message.author.id].hasNSFW,
            boughtNSFW: userFile[message.author.id].boughtNSFW,
            endsNSFW: userFile[message.author.id].endsNSFW,
            giftsWithdrawn: 0,

        }

        await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
            if(err) return console.log(err);
        });
    }

    if (!userFile[message.author.id].username) {

        userFile[message.author.id] = {

            username: message.author.username,
            hasNSFW: userFile[message.author.id].hasNSFW,
            boughtNSFW: userFile[message.author.id].boughtNSFW,
            endsNSFW: userFile[message.author.id].endsNSFW,
            giftsWithdrawn: userFile[message.author.id].giftsWithdrawn

        }

        await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
            if(err) return console.log(err);
        });

    }

    if (!userFile[message.author.id].lastDaily) {

        userFile[message.author.id] = {

            username: message.author.username,
            hasNSFW: userFile[message.author.id].hasNSFW,
            boughtNSFW: userFile[message.author.id].boughtNSFW,
            endsNSFW: userFile[message.author.id].endsNSFW,
            giftsWithdrawn: userFile[message.author.id].giftsWithdrawn,
            lastDaily: false

        }

        await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
            if(err) return console.log(err);
        });

    }

    


    userCreatedAt = message.author.createdAt.toString();
    userCreatedAt = userCreatedAt.substring(0, 15);


    //var guildx = client.guilds.find("id", "431185190044434432");
    let roles = message.member.roles.map(g => g.name);
    let userInfoArray = message.member;
    let userRoles = "";
    let userNickname;

    for (var i = 0; i < roles.length; i++) {
        if(roles[i] == roles[0]) {
        } else if (roles[i] == roles[1]) {
            userRoles = userRoles + roles[i];
        } else {
            userRoles = userRoles + ", " + roles[i];
        }
    }

    if (userInfoArray.nickname == null) {
        userNickname = "Neturi";
    } else {
        userNickname = userInfoArray.nickname;
    }




    let infoEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setColor(0x00E5EE)
        .addField("Pravardė", userNickname)
        .addField("Rolės", userRoles)
        .addField("Serverio Eurai", `€${euro[message.author.id].euro}`)
        .addField("Profilis sukurtas", userCreatedAt);


        message.channel.send(infoEmbed);
        message.delete();


}

module.exports.help = {

    name: "euro",
    name: "username"

}