require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js')


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


client.on('ready', (c) => {
    console.log(`${c.user.username} is Online`)
})



client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'help') {
        const embed = new EmbedBuilder()
            .setTitle('Commands to use')
            .setFields({
                name: '/test', 
                value: 'botfan svarar',
            },
            
            )


        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
});





client.login(process.env.TOKEN)
