const axios = require('axios');
const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');

dotenv.config();

// Token của bot Telegram (lấy từ BotFather)
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID; // Chat ID của bạn (thay thế sau)

// URL API của repository GitHub
const repoApiUrl = 'https://api.github.com/repos/wormhole-foundation/wormhole-sdk-ts';
const releasesApiUrl = `${repoApiUrl}/releases/latest`;
const commitsApiUrl = `${repoApiUrl}/commits`;

// Khởi tạo bot Telegram
const bot = new TelegramBot(telegramToken, { polling: true });

// Lưu thông tin mới nhất để so sánh
let latestReleaseTag = null;
let latestCommitSha = null;

async function checkGitHubUpdates() {
    try {
        const [releaseResponse, commitResponse] = await Promise.all([
            axios.get(releasesApiUrl, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                },
            }),
            axios.get(commitsApiUrl, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                },
            })
        ]);

        const latestRelease = releaseResponse.data;
        const latestCommit = commitResponse.data[0];

        // Kiểm tra bản phát hành mới
        if (latestRelease.tag_name !== latestReleaseTag) {
            latestReleaseTag = latestRelease.tag_name;
            const releaseMessage = `
                🚀 *New release detected!*
                📦 Repo: wormhole-sdk-ts
                🔖 Tag: ${latestRelease.tag_name}
                📝 Name: ${latestRelease.name}
                📅 Released at: ${new Date(latestRelease.published_at).toLocaleString()}
                🔗 [View release](${latestRelease.html_url})
            `;
            bot.sendMessage(chatId, releaseMessage, { parse_mode: 'Markdown' });
        }

        // Kiểm tra commit mới
        if (latestCommit.sha !== latestCommitSha) {
            latestCommitSha = latestCommit.sha;
            const commitMessage = `
                📢 *New commit detected!*
                📦 Repo: wormhole-sdk-ts
                🔨 Commit: ${latestCommit.sha.substring(0, 7)}
                ✍️ Author: ${latestCommit.commit.author.name}
                📝 Message: ${latestCommit.commit.message}
                📅 Committed at: ${new Date(latestCommit.commit.author.date).toLocaleString()}
                🔗 [View commit](${latestCommit.html_url})
            `;
            bot.sendMessage(chatId, commitMessage, { parse_mode: 'Markdown' });
        }
    } catch (error) {
        console.error('Lỗi khi kiểm tra cập nhật GitHub:', error);
    }
}

// Kiểm tra cập nhật GitHub mỗi 10 phút
setInterval(checkGitHubUpdates, 600000);
checkGitHubUpdates(); // Kiểm tra ngay lập tức khi khởi động
