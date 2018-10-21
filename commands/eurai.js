const Discord = require("discord.js");
let euro = require("../euro.json");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

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

    let uEuro = euro[message.author.id].euro;

    let euroEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(0x00E5EE)
    .addField("💸 Serverio Eurai",`Šiuo metu turite **€${uEuro}**`)
    .addField("Parduotuvė", "Serverio eurus galite išleisti parduotuvėje. Naudokite **!parduotuve**");

    message.channel.send(euroEmbed).then(msg => {msg.delete(20000)});
    message.delete();

    } catch(err) {
        console.log(err);
    }


}

module.exports.help = {

    name: "euro",
    name: "username"

}
