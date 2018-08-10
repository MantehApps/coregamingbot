// Get Overwatch Data from a website.
const Discord = require('discord.js');
const overwatch = require('overwatch-api');

const region = 'eu';

module.exports.run = async (client, message, args) => {

let platform;
let name;

if(!['pc','xbl','psn'].includes(args[0])) return message.channel.send('**Prašome rašyti komandą pagal formą: !fort [ pc | xbl | psn ] <vardas-1234>**');
if (!args[1]) return message.channel.send('**Prašome rašyti komandą pagal formą: !fort [ pc | xbl | psn ] <vardas-1234>**');

platform = args.shift();
name = args.join(' ');

    overwatch.getProfile(platform, region, name, (err, json) => {

        if(err) {
            console.log(error);
            message.channel.send('Nepavyko rasti žaidėjo su šiuo vardu!');
        } else {
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
    });

}