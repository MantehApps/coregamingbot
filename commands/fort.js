const Fortnite = require("fortnite");
const stats = new Fortnite('1f8e0950-98c3-470a-8b54-da35ac420288');
const Discord = require('discord.js');
const userFile = require('../userFile.json');
const euro = require("../euro.json");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    let platform;
    let username;

    if (!['pc','xbl','psn'].includes(args[0])) return message.channel.send('**Prašome rašyti komandą pagal formą: !fort [ pc | xbl | psn ] <vardas>**');
    if (!args[1]) return message.channel.send('**Prašome rašyti komandą pagal formą: !fort [ pc | xbl | psn ] <vardas>**');

    platform = args.shift();
    username = args.join(' ');

    stats.user(username, platform).then( data => {
        let stats = data.stats;
        let lifetime = stats.lifetime;
        let solo = stats.solo;
        let duo = stats.duo;
        let squad = stats.squad;


        //let soloKd = solo[2]['kd'];
        let score = lifetime[6]['Score'];
        let mPlayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let winper = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];
        let soloKD = solo['kd'];
        let duoKD = duo['kd'];
        let squadKD = squad['kd'];



        let embed = new Discord.RichEmbed()
        .setColor(0x00E5EE)
        .setTitle(`Fortnite Statistika:`)
        .setAuthor(`${username}`)
        .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/fortnite_gamepedia/2/23/Storm_shard_icon.png")
        .setImage("http://flipapicture.com/uploaded_images/28062005_Fortnite2FreleaseNotes2FHeader_STW-644x144-c4e624cfb137e0797f485164105b1508d2fe0e2f.png")
        .addField("Taškai", score, true)
        .addField("Kills", kills, true)
        .addField("Laimėti matchai", wins, true)
        .addField("Sužaisti matchai", mPlayed, true)
        .addField("Laimėjimo šansai", winper, true)
        .addField("KD", kd, true)
        .addField("Solo KD", soloKD, true)
        .addField("Duos KD", duoKD, true)
        .addField("Squads KD", squadKD, true)
        .setFooter(`Paieška daryta nario: ${message.author.username}`, message.author.avatarURL)
        .setTimestamp();



        
        if(username == userFile[message.author.id].fortBind.username) {

            let killsDifference = kills - parseInt(userFile[message.author.id].fortBind.killAmount);


            if(killsDifference > 0) {


                if(!euro[message.author.id]){

                    euro[message.author.id] = {
            
                        username: message.author.username,
                        euro: 0
            
                    };

                } else if (!euro[message.author.id].username) {
            
                    euro[message.author.id] = {
            
                        username: message.author.username,
                        euro: euro[message.author.id].euro
            
                    };
            
                }


                euro[message.author.id].euro = euro[message.author.id].euro + (killsDifference * 0.5);

                userFile[message.author.id].fortBind.killAmount = kills;

                fs.writeFile("./euro.json", JSON.stringify(euro, null, 4), (err) => {
                    if(err) return console.log(err);
                });

                fs.writeFile("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
                    if(err) return console.log(err);
                });

                let prizeEmbed = new Discord.RichEmbed()
                .setColor(0x00E5EE)
                .addField("Prizas", `${message.author.username} atsiėmė **€${killsDifference * 0.5}** už **${killsDifference}** naujai padarytus Fortnite killus!`);
                setTimeout(function() {
                    message.channel.send(prizeEmbed);
                }, 1000);

            } 

        }


        message.channel.send(embed);
        message.delete();


    }).catch(error => {
        console.log(error);
        message.channel.send('Nepavyko rasti žaidėjo su šiuo vardu!');

    });

}