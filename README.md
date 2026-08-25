<div align="center">

```
 ██╗  ██╗██╗███╗   ███╗ █████╗  ██████╗ ██╗   ██╗
 ██║ ██╔╝██║████╗ ████║██╔══██╗██╔═══██╗╚██╗ ██╔╝
 █████╔╝ ██║██╔████╔██║███████║██║   ██║ ╚████╔╝ 
 ██╔═██╗ ██║██║╚██╔╝██║██╔══██║██║   ██║  ╚██╔╝  
 ██║  ██╗██║██║ ╚═╝ ██║██║  ██║╚██████╔╝   ██║   
 ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   
```

<h3>A premium Discord bot for Sellers, Middlemen, and Ticket Management</h3>

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

**Kimaoy-Bot** is a highly specialized, feature-rich Discord bot designed specifically for marketplace servers. It provides an all-in-one ecosystem for **Ticket Management**, **Seller Verification & Vouches**, **Middleman (MM) Enforcement**, and a beautiful interactive **CV2 Embed Builder**. 

Built with `discord.js v14` and powered by `MongoDB`, the bot enforces safe trading environments while giving admins ultimate control over their server's aesthetics.

---

## ✦ Core Features & Commands

<table>
<tr>
<td width="50%">

**🛍️ Seller & Marketplace System**
- **`/completedeal`**: The flagship command for sellers to finalize a ticket. Automatically prompts the buyer for a rating, calculates middleman involvement, and adds Shiba vouches to the seller's profile.
- **`/seller`**: View or manage seller profiles, trust ratings, and vouch counts.
- **`/forcevouch`**: Admin command to manually adjust a seller's vouches if required.
- **`/tos`**: Displays the server's strictly enforced Terms of Service using beautifully integrated custom emojis.
- **Middleman (MM) Enforcement**: Built-in rules requiring buyers and sellers to accept MMs for safe transactions.

</td>
<td width="50%">

**🎫 Advanced Ticket System**
- **`/ticketpanel`** *(Slash & Prefix)*: Deploys a fully interactive UI panel for users to open specific tickets (Nitro, Decorations, Server Boosts, Exchanges, Reports).
- **Ticket Controls**: Inside every ticket, users and staff get access to Dropdown (StringSelectMenu) interfaces to easily:
  - Select Payment Methods (Crypto, PayPal, etc.)
  - Set Order Quantities
  - Claim / Unclaim / Close tickets
  - Request a Middleman (MM)
  - Add / Remove users from the ticket channel
  - Save full transcripts of the trade

</td>
</tr>
<tr>
<td>

**🎨 CV2 Interactive Embed Builder**
- **`/embed`**: Launches a live, interactive workspace to build Discord v10 (CV2) embeds natively in chat.
- **Dropdown Interface**: Edit the title, description, colors, footers, and author fields entirely via `StringSelectMenus` (no command spam needed).
- **Live Preview**: See exactly how your embed looks as you build it.
- **Channel Selector**: Dispatch your finished creation directly to any channel in the server.

</td>
<td>

**⚙️ Utilities & Backend**
- **Auto-Sync Emojis**: Scripted fallback logic to perfectly mirror custom emojis (Shibas, Warnings, Ticks, Crypto logos) across multiple backend servers.
- **Clean Architecture**: 100% comment-free "raw" source code design.
- **`/feedback`**: Interactive modal for users to submit server feedback and suggestions.
- **`!remind`**: Utility prefix command for reminders.

</td>
</tr>
</table>

---

## ✦ Prerequisites

| Requirement | Version / Notes |
|---|---|
| Node.js | v18.0.0 or higher |
| MongoDB Cluster | A free MongoDB Atlas URI for saving tickets/vouches |
| Discord Bot Token | Enabled `Message Content`, `Server Members`, and `Presence` intents |

---

## ✦ Setup & Installation

**1 — Clone the repository**

```bash
git clone https://github.com/ShadowZ001/Kimaoy-Bot.git
cd Kimaoy-Bot
```

**2 — Install dependencies**

```bash
npm install
```

**3 — Configure Environment**
Create a `.env` file in the root directory and configure it:
```env
TOKEN=your_bot_token_here
CLIENT_ID=your_bot_client_id_here
MONGODB_URI=mongodb+srv://...
```

**4 — Start the bot**
```bash
node index.js
```

---

<div align="center">

## ✦ Kimaoy Devs

*Built for marketplace protection. Designed for ultimate CV2 styling.*

<a href="https://discord.gg/your-invite-here"><img src="https://invidget.switchblade.xyz/your-invite-here" alt="Discord Server"/></a>
<br/>

<a href="https://discord.gg/your-invite-here"><img src="https://img.shields.io/badge/Discord-Join_Server-5865F2?style=for-the-badge&logo=discord&logoColor=white"/></a>
<a href="https://github.com/ShadowZ001"><img src="https://img.shields.io/badge/GitHub-ShadowZ001-181717?style=for-the-badge&logo=github&logoColor=white"/></a>
<a href="https://nexiohost.in"><img src="https://img.shields.io/badge/⭐%20PREMIUM%20HOSTING-NexioHost-FFD700?style=for-the-badge&labelColor=1a1a2e&color=FFD700&logoColor=FFD700"/></a>

<br/>
<br/>

© 2026 Kimaoy Devs — MIT License

</div>