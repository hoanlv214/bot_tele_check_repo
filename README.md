# GitHub Release Notifier Bot

This project is a Telegram bot that monitors the latest releases of a specified GitHub repository and sends notifications when a new release is detected.

## Features

- Monitors the latest releases of a GitHub repository
- Sends notifications via Telegram when a new release is detected
- Customizable check interval

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your system
- A Telegram bot token (obtained from BotFather)
- Your Telegram chat ID

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/github-release-notifier-bot.git
   cd github-release-notifier-bot
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Telegram bot token and chat ID:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

4. (Optional) If you want to increase the GitHub API request limit, add your GitHub personal access token to the `.env` file:
   ```
   GITHUB_TOKEN=your_github_token_here
   ```

## Configuration

Open `bot.js` and modify the following variables:

- `repoApiUrl`: Set this to the GitHub API URL of the repository you want to monitor.
- `checkInterval`: Adjust the interval (in milliseconds) at which the bot checks for new releases.

## Usage

To start the bot, run:
```
npm start
```

The bot will now monitor the specified GitHub repository and send notifications via Telegram when a new release is detected.
