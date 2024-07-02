const QRCODE = require('qrcode');

// Convert items in array to QR Code
const generateQRCodes = async (items) => {
    const qrCodes = [];
    for (var item in items) {
        // convert JSON to string
        const data = await QRCODE.toDataURL(JSON.stringify(item));
        qrCodes.push({
            ...item,
            data,
        });
    }
    return qrCodes;
}

module.exports = { generateQRCodes };