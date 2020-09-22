module.exports = {
    name: 'author',
    description: "see author of bot",
    execute(message, cmnds, Discord){
        const authorembed = new Discord.MessageEmbed()
        .setColor(0x4634a7)
        .setTitle('This bot was coded by DontSliponDirt')
        message.channel.send(authorembed);
    }
}