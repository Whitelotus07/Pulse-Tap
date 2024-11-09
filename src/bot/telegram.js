import TelegramBot from 'node-telegram-bot-api';
import { db } from '../lib/firebase'; // Adjust the path as necessary
import { doc, getDoc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Directly assign your Telegram bot token here (for testing purposes only)
const token = '7605552178:AAGyBtgm-up6Yzzn1lLzsP_hqYgZUvZrudc';
const bot = new TelegramBot(token, { polling: true });

// Command: /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  try {
    await setDoc(doc(db, 'telegram_users', String(chatId)), {
      username,
      chatId,
      lastInteraction: new Date().toISOString()
    });

    bot.sendMessage(chatId, 
      `🎮 Welcome to Pulse Tap Bot!\n\nCommands:\n` +
      `/stats - View your game stats\n` +
      `/leaderboard - View global leaderboard\n` +
      `/daily - Claim daily bonus\n` +
      `/link - Link your game account`
    );
  } catch (error) {
    console.error('Error in /start:', error);
    bot.sendMessage(chatId, '❌ There was an issue starting the bot. Please try again later.');
  }
});

// Command: /leaderboard
bot.onText(/\/leaderboard/, async (msg) => {
  const chatId = msg.chat.id;
  
  try {
    const leaderboardRef = doc(db, 'leaderboard', 'global');
    const leaderboardDoc = await getDoc(leaderboardRef);
    const data = leaderboardDoc.data();

    if (!data || !data.players) {
      return bot.sendMessage(chatId, '📊 Leaderboard is empty!');
    }

    const top10 = data.players
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((player, index) => 
        `${index + 1}. ${player.username}: ${player.score.toLocaleString()} taps`
      )
      .join('\n');

    bot.sendMessage(chatId, 
      `🏆 Global Leaderboard - Top 10\n\n${top10}`, 
      { parse_mode: 'Markdown' }
    );
  } catch (error) {
    console.error('Error in /leaderboard:', error);
    bot.sendMessage(chatId, '❌ Error fetching leaderboard. Please try again later.');
  }
});

// Command: /stats
bot.onText(/\/stats/, async (msg) => {
  const chatId = msg.chat.id;
  
  try {
    const userRef = doc(db, 'telegram_users', String(chatId));
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    if (!userData?.gameId) {
      return bot.sendMessage(chatId, 
        '❌ Game account not linked!\nUse /link to connect your game account.'
      );
    }

    const gameRef = doc(db, 'users', userData.gameId);
    const gameDoc = await getDoc(gameRef);
    const gameData = gameDoc.data();

    bot.sendMessage(chatId,
      `📊 Your Stats\n\n` +
      `Level: ${gameData.level}\n` +
      `Total Taps: ${gameData.totalTaps.toLocaleString()}\n` +
      `Coins: ${gameData.coins.toLocaleString()}\n` +
      `Power: ${gameData.tapPower}/tap`
    );
  } catch (error) {
    console.error('Error in /stats:', error);
    bot.sendMessage(chatId, '❌ Error fetching stats. Please try again later.');
  }
});

// Command: /link
bot.onText(/\/link/, async (msg) => {
  const chatId = msg.chat.id;
  // Here you would implement the logic to link the user's game account
  bot.sendMessage(chatId, '🔗 Please provide your game account ID to link your account.');
});

// Start the bot
console.log('Telegram bot is running...');
