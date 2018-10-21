const Discord = require('discord.js');
const Fortnite = require("fortnite");
const stats = new Fortnite('1f8e0950-98c3-470a-8b54-da35ac420288');
const userFile = require('../userFile.json');
const fs = require('fs');

let platform;
let username;


module.exports.run = async (client, message, args) => {

    if(userFile[message.author.id].fortBind) return message.channel.send('Jau esate priskyręs savo fortnite paskyrą!');

    await getFortniteProfile(client, message, args);

    async function getFortniteProfile (client, message, args) {

        if (!['pc','xbl','psn'].includes(args[0])) return message.channel.send('**Prašome rašyti komandą pagal formą: !fort [ pc | xbl | psn ] <vardas>**');
        if (!args[1]) return message.channel.send('**Prašome rašyti komandą pagal formą: !fort [ pc | xbl | psn ] <vardas>**');
    
        platform = args.shift();
        username = args.join(' ');
    
        stats.user(username, platform).then( data => {
            let stats = data.stats;
            let lifetime = stats.lifetime;
    
            let kills = lifetime[10]['Kills'];

            getKills(kills);
            
    
        }).catch(error => {
            console.log(error);
            message.channel.send('Nepavyko rasti žaidėjo su šiuo vardu!');
    
        });
        
    
    }

    async function getKills(kills) {

        if(!userFile[message.author.id].fortBind) {

            userFile[message.author.id].fortBind = {
    
                username: username,
                killAmount: kills
    
            }
    
            await fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
                if(err) return console.log(err);
            });
    
        }
    }


}