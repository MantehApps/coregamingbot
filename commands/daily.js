const Discord = require("discord.js");
let euro = require("../euro.json");
let userFile = require("../userFile.json");
const fs = require("fs");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {

    let cooldown = 8.64e+7;
    let amount = 10;



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
    
    try {

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

    if(!userFile[message.author.id].lastDaily) {

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


    if (userFile[message.author.id].lastDaily == false) {

        let prizeEmbed = new Discord.RichEmbed()
        .setColor(0x00E5EE)
        .addField("Prizas", `${message.author.username} atsiėmė €10 dienos prizą!`)
        //.addField("Saskaitos likutis",`Šiuo metu turite **€${euro[message.author.id].euro + 20}**`);
    
        message.channel.send(prizeEmbed);

        userFile[message.author.id].lastDaily = Date.now()

        euro[message.author.id] = {

            username: message.author.username,
            euro: euro[message.author.id].euro + amount

        }

        await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
            if(err) return console.log(err);
        });

        await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
            if(err) return console.log(err);
        });


    } else if (userFile[message.author.id].lastDaily != false && cooldown - (Date.now() - userFile[message.author.id].lastDaily) > 0) {

        let timeObj = ms(cooldown - (Date.now() - userFile[message.author.id].lastDaily));

        message.reply(`Jau esate atsiėmę šios dienos prizą! Dienos prizą vėl galėsite atsiimti už **${timeObj.hours}h ${timeObj.minutes}m**!`);

    } else {

        let prizeEmbed = new Discord.RichEmbed()
        .setColor(0x00E5EE)
        .addField("Prizas", `${message.author.username} atsiėmė €10 dienos prizą!`)
        //.addField("Saskaitos likutis",`Šiuo metu turite **€${euro[message.author.id].euro + 20}**`);
    
        message.channel.send(prizeEmbed);

        userFile[message.author.id].lastDaily = Date.now()

        euro[message.author.id] = {

            username: message.author.username,
            euro: euro[message.author.id].euro + amount

        }

        await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
            if(err) return console.log(err);
        });

        await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
            if(err) return console.log(err);
        });

    }

    } catch(err) {
        console.log(err);
    }


    

}

module.exports.help = {

    name : "lastDaily"

}