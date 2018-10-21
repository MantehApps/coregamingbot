const Discord = require('discord.js');
const fs = require("fs");
let euro = require("../euro.json");
let userFile = require("../userFile.json");

const items = JSON.parse(fs.readFileSync('./shop.json', 'utf8'));

module.exports.run = async (client, message, args) => {

    let categories = []

    if (!args.join(" ")) {

        for (var i in items) {

            if (!categories.includes(items[i].type)) {
                categories.push(items[i].type)
            }

        }


        const embedItems = new Discord.RichEmbed()
            .setTitle("CoreGaming Lithuania parduotuvė")
            .setDescription('\n\nPrekes galite nusipirkte parašę **!parduotuve <prekės vardas>**')
            .setColor(0x00E5EE)

        for (var i = 0; i < categories.length; i++) {

            var tempDesc = '';

            for (var c in items) {
                if(categories[i] === items[c].type) {
                    tempDesc += `**${items[c].emoji} ${items[c].name}** | **€${items[c].price}** | ${items[c].desc}\n\n`;
                }
            }

            embedItems.addField(categories[i], tempDesc);
            //embedItems.addField("Emoji", `**😋 Emoji Rinkinys #1** |  Jau neužilgo!\n\n**🏆 Emoji Rinkinys #2** |  Jau neužilgo!\n\n**🐢 Emoji Rinkinys #3** |  Jau neužilgo!\n\n**🍑 Emoji Rinkinys #4** |  Jau neužilgo!\n\n**🍩 Emoji Rinkinys #5** |  Jau neužilgo!\n\n`);


        }

        return message.channel.send(embedItems);

    }


    let itemName = '';
    let itemPrice = 0;
    let itemDesc = '';

    try {

    for (var i in items) {

        if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) {

            itemName = items[i].name;
            itemPrice = items[i].price;
            itemDesc = items[i].desc;

        }

    }

    }catch(err) {
        console.log(err);
    }


    if (itemName === '') {
        return message.channel.send("**Šios prekės parduotuvėje nėra, patikrinkite pavadinimą ir bandykite dar sykį!**");
    }

    if(!euro[message.author.id]){

        euro[message.author.id] = {

            euro: 0

        };
    }

    let uEuro = euro[message.author.id].euro;
    let messageUser = message.guild.members.get(message.author.id);

    if(uEuro < itemPrice) {
        return message.channel.send(`Neturite tiek eurų! Jūsų saskaitos likutis: **€${uEuro}**`);
    }

    let NSFWRole = message.guild.roles.find("name", "NSFW Narys");
    let emojiPack1Role = message.guild.roles.find("name", "Emoji Pack #1");

    if(!messageUser.roles.has(NSFWRole.id)) {

    if(itemName === "NSFW 7d") { // NSFW 7 dienu


            message.guild.members.get(message.author.id).addRole(NSFWRole);

            // startof CHECK DATES
            Date.prototype.addDays = function(days) { 

                var startDate = new Date(this.valueOf())
                startDate.setDate(startDate.getDate() + days);
                return startDate;
        
            }
        
            var startDate = new Date();
            var endDate = new Date(startDate.addDays(7)); 
            // endof CHECK DATES


            if(!userFile[message.author.id]) {

                userFile[message.author.id] = {
                
                    hasNSFW: 7,
                    boughtNSFW: startDate,
                    endsNSFW: endDate,
                    giftsWithdrawn: 0

                }

            } else {

                userFile[message.author.id] = {
                
                    hasNSFW: 7,
                    boughtNSFW: startDate,
                    endsNSFW: endDate,
                    giftsWithdrawn: userFile[message.author.id].giftsWithdrawn
                }

            }

            fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
                if(err) console.log(err);
            });

        }

    if(itemName === "NSFW 14d") { // NSFW 14 dienu


            message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "NSFW Narys"));

            // startof CHECK DATES
            Date.prototype.addDays = function(days) { 

                var startDate = new Date(this.valueOf())
                startDate.setDate(startDate.getDate() + days);
                return startDate;
        
            }
        
            var startDate = new Date();
            var endDate = new Date(startDate.addDays(14)); 
            // endof CHECK DATES


            if(!userFile[message.author.id]) {

                userFile[message.author.id] = {
                
                    hasNSFW: 14,
                    boughtNSFW: startDate,
                    endsNSFW: endDate,
                    giftsWithdrawn: 0

                }

            } else {

                userFile[message.author.id] = {
                
                    hasNSFW: 14,
                    boughtNSFW: startDate,
                    endsNSFW: endDate,
                    giftsWithdrawn: userFile[message.author.id].giftsWithdrawn
                }

            }

            fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
                if(err) console.log(err);
            });

        }

    if(itemName === "NSFW 30d") { // NSFW 30 dienu


            message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "NSFW Narys"));

            // startof CHECK DATES
            Date.prototype.addDays = function(days) { 

                var startDate = new Date(this.valueOf())
                startDate.setDate(startDate.getDate() + days);
                return startDate;
        
            }
        
            var startDate = new Date();
            var endDate = new Date(startDate.addDays(30)); 
            // endof CHECK DATES


            if(!userFile[message.author.id]) {

                userFile[message.author.id] = {
                
                    hasNSFW: 30,
                    boughtNSFW: startDate,
                    endsNSFW: endDate,
                    giftsWithdrawn: 0

                }

            } else {

                userFile[message.author.id] = {
                
                    hasNSFW: 30,
                    boughtNSFW: startDate,
                    endsNSFW: endDate,
                    giftsWithdrawn: userFile[message.author.id].giftsWithdrawn
                }

            }

            fs.writeFileSync("./userFile.json", JSON.stringify(userFile, null, 4), (err) => {
                if(err) console.log(err);
            });

        }
        
        try {
            
            let nsfwEndsDate = endDate.toString().substring(0,15);
        
            let successfulPurchaseEmbed = new Discord.RichEmbed()
            .setTitle("CoreGaming Lithuania parduotuvė")
            .setColor(0x00E5EE)
            .addField(`Nusipirkote **${itemName}**`, `Jūsų NSFW narystė pasibaigs **${nsfwEndsDate}**`)
            .addField(`Jūsų saskaitos likutis`, `**€${uEuro-itemPrice}**`)
        
        
            //message.channel.send(`Nusipirkote **${itemName}**! \nJūsų NSFW narystė pasibaigs **${nsfwEndsDate}**\nJūsų saskaitos likutis: **€${uEuro}**`);
            message.channel.send(successfulPurchaseEmbed);
            euro[message.author.id].euro = uEuro - parseInt(itemPrice);
        
            } catch(err) {
                console.log(err);
            }

    }
    
    if(itemName === "Emoji Rinkinys #1") {

        if(!messageUser.roles.has(emojiPack1Role.id)) {

            message.guild.members.get(message.author.id).addRole(emojiPack1Role);
            euro[message.author.id].euro = uEuro - parseInt(itemPrice);

            let successfulEmojiPack1 = new Discord.RichEmbed()
            .setTitle("CoreGaming Lithuania parduotuvė")
            .setColor(0x00E5EE)
            .addField(`Nusipirkote **${itemName}**`, `Jūsų nauji emoji: **${itemDesc}**`)
        
            message.channel.send(successfulEmojiPack1);

        } else {
            return message.channel.send("**Jau esate nusipirkę šią prekę!**");
        }
        

    }



    fs.writeFile("./euro.json", JSON.stringify(euro, null, 4), (err) => {
        if(err) return console.log(err);
    });

            



}


module.exports.help = {

    name: "euro",
    name: "NSFW",
    name: "boughtNSFW",
    name: "endsNSFW"

}