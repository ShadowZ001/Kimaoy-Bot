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
async function generateTicketBanner(user, options) {
    const { payDisplay, qtyDisplay, typeName, amountDisplay = 'Discuss' } = options;
    const canvas = createCanvas(800, 240);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0F1A14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2A5D37';
    ctx.lineWidth = 8;
    drawRoundRect(ctx, 4, 4, canvas.width - 8, canvas.height - 8, 20);
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
    ctx.fillStyle = '#6F7170';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(options.typeName.toUpperCase(), 245, 50);
    ctx.fillStyle = '#131514';
    drawRoundRect(ctx, 650, 30, 110, 30, 15);
    ctx.fill();
    ctx.fillStyle = '#39E07E';
    ctx.beginPath();
    ctx.arc(665, 45, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('CLAIM...', 678, 50);
    try {
        const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 256 });
        const avatar = await loadImage(avatarUrl);
        ctx.save();
        ctx.beginPath();
        ctx.arc(95, 125, 55, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 40, 70, 110, 110);
        ctx.restore();
        ctx.beginPath();
        ctx.arc(95, 125, 55, 0, Math.PI * 2);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#39E07E';
        ctx.stroke();
    } catch (e) {
        console.error("Failed to load avatar for canvas", e);
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px Arial';
    ctx.fillText(user.username.toUpperCase(), 170, 105);
    ctx.fillStyle = '#5A5F5B';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(user.id, 170, 125);
    const cols = [];
    if (payDisplay) cols.push({ label: 'METHOD', value: payDisplay });
    if (qtyDisplay) cols.push({ label: 'QUANTITY', value: qtyDisplay });
    cols.push({ label: 'PRODUCT', value: typeName });
    cols.push({ label: 'AMOUNT', value: amountDisplay });
    let startX = 170;
    for (const col of cols) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(col.value, startX, 170);
        ctx.fillStyle = '#5A5F5B';
        ctx.font = 'bold 11px Arial';
        ctx.fillText(col.label, startX, 185);
        startX += 140;
    }
    return canvas.toBuffer('image/png');
}
module.exports = { generateTicketBanner };
