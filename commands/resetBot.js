
module.exports.run = async (client, message, args) => {
    message.channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login('NDQ0OTY3NTM2NDQyNzM2Njky.DjDz0A.sx-KuWYkj-DuvrQ2xR867DnS12s'));
}