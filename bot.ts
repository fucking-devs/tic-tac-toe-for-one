import { Bot, Context } from 'grammy';
import { createGameKeyboard } from './keyboard';
import { startGame, makeMove, resetGame } from './gameLogic';

const bot = new Bot('7420628298:AAH_hibqqR4jtJcyAOwVemJSuBzuHERTKO0'); 

bot.command('start', async (ctx) => {
    await ctx.reply('Добро пожаловать! Нажмите кнопку ниже, чтобы начать игру.', {
        reply_markup: { inline_keyboard: [[{ text: 'Играть', callback_data: 'play_game' }]] }
    });
});

// Обработчик команды /reset
bot.command('reset', async (ctx) => {
    const result = await resetGame(ctx);
    if (result) {
        await ctx.reply(result);
    }
});

bot.on('callback_query:data', async (ctx) => {
    if (ctx.callbackQuery.data === 'play_game') {
        await startGame(ctx);
    } else {
        const cellIndex = parseInt(ctx.callbackQuery.data);
        const result = await makeMove(ctx, cellIndex);
        if (result) {
            await ctx.reply(result);
        }
    }
});

bot.start();