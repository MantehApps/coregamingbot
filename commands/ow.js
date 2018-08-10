// Get Overwatch Data from a website.

const overwatch = require('overwatch-api');

const region = 'eu';

module.exports.run = async (client, message, args) => {

let platform = "pc";
let name = "Manteh-2615";

if(!['pc','xbl','psn'].includes(args[0])) return message.channel.send('**Prašome rašyti komandą pagal formą: !fort [ pc | xbl | psn ] <vardas-1234>**');
if (!args[1]) return message.channel.send('**Prašome rašyti komandą pagal formą: !fort [ pc | xbl | psn ] <vardas-1234>**');

//platform = args.shift();
//name = args.join(' ');

    overwatch.getProfile(platform, region, name, (err, json) => {

        if(err) console.error(err);
        else console.log(json);
        
    });

}