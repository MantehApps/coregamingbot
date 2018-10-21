// Get Overwatch Data from a website.
const Discord = require('discord.js');
const overwatch = require('overwatch-api');
const OWStats = require('overwatch-stats');


const region = 'eu';

module.exports.run = async (client, message, args) => {

let platform;
let name;

if(!['pc','xbl','psn'].includes(args[0])) return message.channel.send('**Prašome rašyti komandą pagal formą: !ow [ pc | xbl | psn ] <vardas#1234>**');
if(!args[1]) return message.channel.send('**Prašome rašyti komandą pagal formą: !ow [ pc | xbl | psn ] <vardas#1234>**');
if(!(args[1]).includes('#')) return message.channel.send('**Prašome rašyti komandą pagal formą: !ow [ pc | xbl | psn ] <vardas#1234>**');

platform = args.shift();
name = args.join(' ');
//name = name.replace("#","-");

message.channel.send("Kraunama Overwatch profilio statistika...").then(msg => {
    msg.delete(5000);
});

    OWStats.load(name).then(data => {


        let stats = new OWStats(data);

        //if(stats.error == "Private") return message.channel.send("Šis profilis yra privatus!");

        let qpOverall = stats._raw.body.eu.stats.quickplay.overall_stats;
        let compOverall = stats._raw.body.eu.stats.competitive.overall_stats;
        let compHeroes = stats._raw.body.eu.heroes.playtime.competitive;
        let mostPlayedHeroTime = 0;
        let mostPlayedHero = "";

        for(var i = 0; i < Object.keys(compHeroes).length; i++) {

            if (compHeroes[Object.keys(compHeroes)[i]] > mostPlayedHeroTime) {

                mostPlayedHeroTime = compHeroes[Object.keys(compHeroes)[i]];
                mostPlayedHero = Object.keys(compHeroes)[i];

            }

        }

        mostPlayedHeroTime = parseInt(mostPlayedHeroTime);

        if(qpOverall.comprank == null) {
            qpOverall.comprank = "Unranked"
        } 

        let embed = new Discord.RichEmbed()
        .setColor(0x00E5EE)
        .setTitle(`<:ow:477970613428813837> Overwatch Statistika [Competitive]`)
        .setAuthor(name, qpOverall.rank_image)
        .setThumbnail(qpOverall.avatar)
        .setFooter(`Paieška daryta nario: ${message.author.username}`, message.author.avatarURL)
        .setTimestamp()

        if(qpOverall.tier_image && qpOverall.tier && qpOverall.comprank != null) {

            let tier = (qpOverall.tier).charAt(0).toUpperCase() + (qpOverall.tier).slice(1);
            mostPlayedHero = mostPlayedHero.charAt(0).toUpperCase() + mostPlayedHero.slice(1);

            embed.setImage(qpOverall.tier_image);
            embed.addField("Rank", `**${tier}** [${qpOverall.comprank} SR]`, true)
            embed.addField("Mėgstamiausias hero", `**${mostPlayedHero}** [${mostPlayedHeroTime} H]`, true)
            if(qpOverall.prestige > 0) {

                embed.addField("Lygis", `${qpOverall.prestige}${qpOverall.level}`, true);

            } else if (qpOverall.prestige = 0) {

                embed.addField("Lygis", qpOverall.level, true);
            }
            embed.addField("Laimėti matchai", compOverall.wins)
            embed.addField("Sužaisti matchai", compOverall.games)
            embed.addField("Laimėjimo šansai", `${compOverall.win_rate}%`)

        } else {

            embed.addField("Rank", "Unranked", true);

            if(qpOverall.prestige > 0) {

                embed.addField("Lygis", `${qpOverall.prestige}${qpOverall.level}`, true);

            } else if (!qpOverall.prestige) {

                embed.addField("Lygis", qpOverall.level, true);

            }

        }

        message.channel.send(embed);     

        message.delete();

        });

        /*(OWStats.load(name)).catch(function(error) {
           
           let errorTextArray = JSON.parse(error.response.res.text);
           console.log(errorTextArray.error);
           if(errorTextArray.error == 'Private') {
               message.channel.send("**Šis profilis yra privatus!**").then(msg => {msg.delete(5000)});
           }


          });*/



    /*overwatch.getProfile(platform, region, name, (err, json) => {

        if(err) {
            console.log(err);
            message.channel.send('Nepavyko rasti žaidėjo su šiuo vardu!');
        } else {
            console.log(json);
            let owUsername = json['username'];
            let owLevel = json['level'];
            let owQuickPlayedTime = json['playtime']['quickplay'];
            let owAvatar = json['portrait'];

            let embed = new Discord.RichEmbed()
            .setColor(0x00E5EE)
            .setTitle(`Overwatch Statistika:`)
            .setAuthor(`${owUsername}`)
            .setThumbnail(owAvatar)
            .addField("Lygis", owLevel, true)
            .addField("Laiko pražaista QP", owQuickPlayedTime, true)
            .setFooter(`Paieška daryta nario: ${message.author.username}`, message.author.avatarURL)
            .setTimestamp()

            message.channel.send(embed);
            message.delete();
        }
    });*/

}