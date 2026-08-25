<div align="center">

```
 ██╗  ██╗██╗███╗   ███╗ █████╗  ██████╗ ██╗   ██╗
 ██║ ██╔╝██║████╗ ████║██╔══██╗██╔═══██╗╚██╗ ██╔╝
 █████╔╝ ██║██╔████╔██║███████║██║   ██║ ╚████╔╝ 
 ██╔═██╗ ██║██║╚██╔╝██║██╔══██║██║   ██║  ╚██╔╝  
 ██║  ██╗██║██║ ╚═╝ ██║██║  ██║╚██████╔╝   ██║   
 ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   
```

<h3>A feature-rich Discord CV2 Builder bot</h3>

<a href="https://nexiohost.in"><img src="https://img.shields.io/badge/⭐%20PREMIUM%20HOSTING-NexioHost-FFD700?style=for-the-badge&labelColor=1a1a2e&color=FFD700&logoColor=FFD700"/></a>

<p>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/></a>
  <a href="https://discord.js.org"><img src="https://img.shields.io/badge/Discord.js-v14-5865F2?style=for-the-badge&logo=discord&logoColor=white"/></a>
  <a href="https://mongodb.com"><img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/></a>
</p>
<p>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-red?style=for-the-badge"/></a>
  <a href="https://github.com/ShadowZ001"><img src="https://img.shields.io/badge/GitHub-ShadowZ001-181717?style=for-the-badge&logo=github&logoColor=white"/></a>
</p>

</div>

---

## ✦ Overview

Kimaoy-Bot is a fully-featured Discord bot designed to manage and send Discord v10 CV2 (Component V2) messages natively in your server. Built with `discord.js v14`, `Node.js`, and `MongoDB`.

```
Kimaoy-Bot/
├── 🤖  cogs/                  All bot features (commands, components, events)
│   ├── components/            CV2 string select menus and modals
│   └── slash/                 Slash commands (e.g. /tos)
├── 📚  events/                Event handlers (ready, interactionCreate, messageCreate)
├── 🛠️  utils/                 Shared utilities (cv2BuilderHelper)
├── 🗄️  schemas/               MongoDB mongoose schemas
└── 📝  index.js               Entry point
```

---

## ✦ Features

<table>
<tr>
<td width="50%">

**🛡️ CV2 Message Builder**
- Interactive CV2 message builder
- Complete control over title, description, color, image, and author
- Real-time preview of the embedded message
- Dropdown (StringSelectMenu) based interface
- Channel selector integration

</td>
<td width="50%">

**🎵 Utilities & Tools**
- Auto-sync Application emojis
- `/tos` command with strictly enforced rules for sellers
- Support for complex Middleman (MM) verification & vouches
- Custom emojis flawlessly injected into markdown headers
- Clean, comment-free codebase

</td>
</tr>
</table>

---

## ✦ Prerequisites

| Requirement | Version / Notes |
|---|---|
| Node.js | 18 or higher |
| MongoDB URI | For database connection |
| Discord bot token | — |

---

## ✦ Setup

**1 — Clone the repo**

```bash
git clone https://github.com/ShadowZ001/Kimaoy-Bot.git
cd Kimaoy-Bot
```

**2 — Install dependencies**

```bash
npm install
```

**3 — Configure Environment**
Create a `.env` file and configure it:
```env
TOKEN=your_bot_token
CLIENT_ID=your_client_id
MONGODB_URI=your_mongodb_uri
```

**4 — Start the bot**
```bash
node index.js
```
