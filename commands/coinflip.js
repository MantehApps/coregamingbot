const Discord = require("discord.js");
let euro = require("../euro.json");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    if(message.channel.id != "479704698534887455") return message.reply(`šiame kanale draudžiama naudotis šia komanda!\nNaudokite <#479704698534887455> kanalą!`).then(msg => {
        msg.delete(10000)
        message.delete();
      });

    let userCoinChoice;
    let userCoinDeposit;
    let calculate;

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


    if (args[0] == null || args[1] == null) return message.channel.send("1.Naudokite coinflipą pagal komandą **!coinflip <heads/tails> <eurų skaičius>**").then(msg => {
        msg.delete(10000)
        message.delete();
      });;


        if (!['heads','tails'].includes(args[0])) return message.channel.send("2.Naudokite coinflipą pagal komandą !coinflip **<heads/tails>** <eurų skaičius>").then(msg => {
            msg.delete(10000)
            message.delete();
          });;

            if(!Number.isInteger(parseInt(args[1]))) return message.channel.send("3.Naudokite coinflipą pagal komandą !coinflip <heads/tails> **<eurų skaičius>**").then(msg => {
                msg.delete(10000)
                message.delete();
              });;

                userCoinChoice = args[0];
                userCoinDeposit = args[1];
                console.log(userCoinChoice);

                if(euro[message.author.id].euro < userCoinDeposit) return message.channel.send(`Neturite tiek eurų! Jūsų saskaitos likutis: **€${euro[message.author.id].euro}**`);
                
                calculate = Math.random().toString();
                calculate = calculate.substring(0,4);
                console.log(calculate);

                try {

                if(parseFloat(calculate) >= 0.5) {

                    if(userCoinChoice == 'tails') {
                        euro[message.author.id].euro = euro[message.author.id].euro - parseInt(userCoinDeposit);
                        await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
                            if (err) console.log(err);
                        });
                        
                        let coinFlipEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle("Coin Flip")
                        .setDescription(`Pasirinkote **${userCoinChoice}** ir pralaimėjote **€${userCoinDeposit}**!\n\nSaskaitos likutis: **€${euro[message.author.id].euro}**`)
                        .setThumbnail("http://www.clker.com/cliparts/4/a/2/6/1393621733287511319tails-md.png")
                        .setColor(0x00E5EE);


                        return message.channel.send(coinFlipEmbed).then(msg => {
                            msg.delete(10000)
                            message.delete();
                          });

                    }

                    if(userCoinChoice == 'heads') {
                        euro[message.author.id].euro = euro[message.author.id].euro + (parseInt(userCoinDeposit * 1.5));
                        await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
                            if (err) console.log(err);
                        });

                        let coinFlipEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle("Coin Flip")
                        .setDescription(`Pasirinkote **${userCoinChoice}** ir laimėjote **€${(parseInt(userCoinDeposit * 1.5))}**!\n\nSaskaitos likutis: **€${euro[message.author.id].euro}**`)
                        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/a/a0/2006_Quarter_Proof.png")
                        .setColor(0x00E5EE);

                        return message.channel.send(coinFlipEmbed).then(msg => {
                            msg.delete(10000)
                            message.delete();
                          });

                    }

                } else if (parseFloat(calculate) < 0.5) {

                    if(userCoinChoice == 'tails') {
                        euro[message.author.id].euro = euro[message.author.id].euro + (parseInt(userCoinDeposit * 1.5));
                        await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
                            if (err) console.log(err);
                        });

                        let coinFlipEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle("Coin Flip")
                        .setDescription(`Pasirinkote **${userCoinChoice}** ir laimėjote **€${(parseInt(userCoinDeposit * 1.5))}**!\n\nSaskaitos likutis: **€${euro[message.author.id].euro}**`)
                        .setThumbnail("http://www.clker.com/cliparts/4/a/2/6/1393621733287511319tails-md.png")
                        .setColor(0x00E5EE);

                        return message.channel.send(coinFlipEmbed).then(msg => {
                            msg.delete(10000)
                            message.delete();
                          });

                    }

                    if(userCoinChoice == 'heads') {
                        euro[message.author.id].euro = euro[message.author.id].euro - parseInt(userCoinDeposit);
                        await fs.writeFileSync("./euro.json", JSON.stringify(euro, null, 4), (err) => {
                            if (err) console.log(err);
                        });

                        let coinFlipEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle("Coin Flip")
                        .setDescription(`Pasirinkote **${userCoinChoice}** ir pralaimėjote **€${userCoinDeposit}**!\n\nSaskaitos likutis: **€${euro[message.author.id].euro}**`)
                        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/a/a0/2006_Quarter_Proof.png")
                        .setColor(0x00E5EE);


                        return message.channel.send(coinFlipEmbed).then(msg => {
                            msg.delete(10000)
                            message.delete();
                          });

                    }

                }



                } catch(err) {
                    console.log(err);
                }






}

module.exports.help = {

    name: "euro",
    name: "username"

}   