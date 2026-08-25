const { createCanvas, loadImage } = require('canvas');
function drawRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}
async function generateFeedbackBanner(clientUser, sellerUser, stars, product) {
    const canvas = createCanvas(800, 240);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0F1010';
    ctx.fillRect(0, 0, 800, 240);
    const gradient = ctx.createRadialGradient(400, 120, 0, 400, 120, 600);
    gradient.addColorStop(0, '#151716');
    gradient.addColorStop(1, '#0F1010');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 240);
    ctx.strokeStyle = '#1E211F';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 798, 238);
    ctx.strokeStyle = '#1E211F';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.lineTo(800, 40);
    ctx.moveTo(0, 200);
    ctx.lineTo(800, 200);
    ctx.moveTo(40, 0);
    ctx.lineTo(40, 240);
    ctx.moveTo(760, 0);
    ctx.lineTo(760, 240);
    ctx.stroke();
    ctx.fillStyle = '#1A3324';
    drawRoundRect(ctx, 40, 30, 180, 30, 15);
    ctx.fill();
    ctx.fillStyle = '#39E07E';
    ctx.font = 'bold 13px Arial';
    ctx.fillText('KIMAOYMART TICKETS', 55, 50);
    ctx.fillStyle = '#131514';
    drawRoundRect(ctx, 230, 30, 120, 30, 15);
    ctx.fill();
    ctx.strokeStyle = '#1E211F';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#78827C';
    ctx.font = 'bold 13px Arial';
    ctx.fillText('⭐ NEW FEEDBACK', 245, 50);
    let starStr = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`Rating: ${stars}.0/5`, 60, 110);
    ctx.fillText(starStr, 60, 155);
    ctx.fillStyle = '#78827C';
    ctx.font = '14px Arial';
    ctx.fillText(`Client: ${clientUser.username}`, 60, 225);
    try {
        const avatarUrl = clientUser.displayAvatarURL({ extension: 'png', size: 128 });
        const avatar = await loadImage(avatarUrl);
        ctx.save();
        ctx.beginPath();
        ctx.arc(710, 60, 40, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 670, 20, 80, 80);
        ctx.restore();
    } catch (err) {
        console.error('Could not load client avatar for feedback canvas', err);
    }
    return canvas.toBuffer();
}
module.exports = {
    generateFeedbackBanner
};
