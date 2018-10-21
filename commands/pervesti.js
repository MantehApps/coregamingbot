const Discord = require('discord.js');
const fs = require("fs");
let euro = require("../euro.json");

module.exports.run = async (client, message, args) => {

    if(!euro[message.author.id]){
        return message.reply("Neturite eurų!");
    }

    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if (!euro[pUser.id]){
        euro[pUser.id] = {
            euro: 0
        };
    }

    let pEuro = euro[pUser.id].euro;
    let sEuro = euro[message.author.id].euro;

    console.log("1");

    if(sEuro < args[1]) return message.reply(`Neturite tiek eurų! Jūsų saskaitos likutis: **€ ${sEuro}**`);

    euro[message.author.id] = {
        euro: sEuro - parseInt(args[1])
    };

    console.log("2");

    euro[pUser.id] = {
        euro: pEuro + parseInt(args[1])
    };

    message.channel.send(`**${message.author}** pervedė **€${args[1]}** nariui **${pUser}**`);

    fs.writeFileSync("./euro.json", JSON.stringify(euro, null , 4), (err) => {
        if(err) console.log(err);
    });

}

module.exports.help = {

    name: "pay"

}