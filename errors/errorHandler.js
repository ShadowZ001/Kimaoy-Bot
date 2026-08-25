const fs = require('fs');
const path = require('path');
function logError(error, context = 'Unknown Context') {
    console.error(`[Error in ${context}]:`, error);
    const errorLogsDir = path.join(__dirname);
    if (!fs.existsSync(errorLogsDir)) {
        fs.mkdirSync(errorLogsDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFilePath = path.join(errorLogsDir, `error-${timestamp}.log`);
    const logContent = `Timestamp: ${new Date().toISOString()}
Context: ${context}
Error Name: ${error.name}
Error Message: ${error.message}
Stack Trace:
${error.stack}
`;
    fs.writeFile(logFilePath, logContent, (err) => {
        if (err) console.error('Failed to save error log:', err);
    });
}
function setupProcessErrorHandlers() {
    process.on('unhandledRejection', (reason, promise) => {
        logError(reason instanceof Error ? reason : new Error(String(reason)), 'Unhandled Rejection');
    });
    process.on('uncaughtException', (error) => {
        logError(error, 'Uncaught Exception');
    });
}
module.exports = { logError, setupProcessErrorHandlers };
