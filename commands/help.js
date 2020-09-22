

module.exports = {
    name: 'help',
    description: "help list",
    execute(message, cmnds, Discord, prefix){
        const helpembed = new Discord.MessageEmbed()
            .setColor(0x4634a7)
            .setTitle('Help list')
            .addField(
                'Member commands',`\`${prefix}author\`   | see coder of bot\n\`${prefix}info\`  | view info of a member\n\`${prefix}love\`     | send some love\n\`${prefix}insult\`   | insult someone\n\`${prefix}massping\` | ping someone 50 times\n\`${prefix}bigox\` | big ox`
            )
        message.channel.send(helpembed);
        //message.channel.send('help')
    }
}