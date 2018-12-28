var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    message = message.trim();
    var messageSpaceSplit = message.split(' ');
    var beginningWord = messageSpaceSplit[0];
    if (beginningWord.toLowerCase() !== ('im') && beginningWord.toLowerCase() !==  'i\'m') {
        return;
    }

    var messageBeginningSplit = message.split(beginningWord);

    bot.sendMessage({
        to: channelID,
        message: ['Hi, ', messageBeginningSplit[1].trim() , '. I\'m Dad!'].join('')
    });
});