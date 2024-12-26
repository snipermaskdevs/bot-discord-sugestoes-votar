const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

require('dotenv').config();

// Defina o ID do canal de sugestões e do cargo de staff
const canalSugestoesId = '1298763043001466910';
const cargoStaffId = '1299292089602932747';
//const canalSugestoesId = 'SEU_CANAL_ID_AQUI';
//const cargoStaffId = ''SEU_CARGO_STAFF_ID_AQUI';

client.on('ready', () => {
  console.log(`Bot logado como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    // Verifica se a mensagem foi enviada no canal de sugestões e não foi enviada pelo bot
    if (message.channel.id === canalSugestoesId && !message.author.bot) {
      const sugestao = message.content;
  
      const sugestaoEmbed = new EmbedBuilder()
        .setColor('#37ff06')
        .setTitle('Nova Sugestão')
        .setDescription(sugestao)
        .addFields(
          { name: 'Positivo', value: 'Votos: 0 (0%)', inline: true },
          { name: 'Negativo', value: 'Votos: 0 (0%)', inline: true },
          { name: 'Total de Votantes', value: '0', inline: false }
        )
        .setFooter({ text: `Sugerido por ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
  
      const sugestaoMessage = await message.channel.send({ embeds: [sugestaoEmbed] });
      await sugestaoMessage.react('👍');
      await sugestaoMessage.react('👎');
      await sugestaoMessage.react('🔒');
  
      const filtro = (reaction, user) => ['👍', '👎', '🔒'].includes(reaction.emoji.name);
  
      const coletor = sugestaoMessage.createReactionCollector({ filtro, dispose: true });
  
      const atualizarEmbed = async () => {
        const votosPositivos = sugestaoMessage.reactions.cache.get('👍')?.count - 1 || 0;
        const votosNegativos = sugestaoMessage.reactions.cache.get('👎')?.count - 1 || 0;
  
        const totalVotos = votosPositivos + votosNegativos;
        const porcentagemPositiva = totalVotos ? (votosPositivos / totalVotos) * 100 : 0;
        const porcentagemNegativa = totalVotos ? (votosNegativos / totalVotos) * 100 : 0;
  
        sugestaoEmbed.data.fields[0].value = `Votos: ${votosPositivos} (${porcentagemPositiva.toFixed(0)}%)`;
        sugestaoEmbed.data.fields[1].value = `Votos: ${votosNegativos} (${porcentagemNegativa.toFixed(0)}%)`;
        sugestaoEmbed.data.fields[2].value = `Total de Votantes: ${totalVotos}`;
  
        await sugestaoMessage.edit({ embeds: [sugestaoEmbed] });
      };
  
      coletor.on('collect', async (reaction, user) => {
        if (reaction.emoji.name === '🔒') {
          const membro = await message.guild.members.fetch(user.id);
  
          if (!membro.roles.cache.has(cargoStaffId)) {
            try {
              await user.send("Você não tem permissão para encerrar esta sugestão.");
            } catch (error) {
              console.log("Não foi possível enviar a mensagem direta para o usuário.");
            }
            return;
          }
  
          coletor.stop('Encerrado pelo staff');
          return;
        }
  
        await atualizarEmbed();
      });
  
      coletor.on('remove', async (reaction, user) => {
        await atualizarEmbed();
      });
  
      coletor.on('end', (collected, reason) => {
        if (reason === 'Encerrado pelo staff') {
          sugestaoEmbed.setColor('#ff0000').setFooter({ text: 'Votação encerrada pelo staff' });
          sugestaoMessage.edit({ embeds: [sugestaoEmbed] });
        }
      });
  
      message.delete();
    }
  });

  client.login(process.env.TOKEN);