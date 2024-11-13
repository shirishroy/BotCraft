import discord
import os
from dotenv import load_dotenv

load_dotenv()
intents = discord.Intents.default()
intents.message_content = True

bot = discord.Client(intents=intents)

@bot.event
async def on_ready():
    print(f'\n[{bot.user.name}] status: Online (ID: {bot.user.id})\n')

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    if message.content.startswith('-Hi'):
        await message.channel.send('Hello!')

bot.run(os.getenv('DISCORD_TOKEN'))
