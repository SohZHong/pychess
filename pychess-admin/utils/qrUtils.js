const QRCODE = require('qrcode');

const generateQRCode = async (item) => {
    return await QRCODE.toDataURL(JSON.stringify(item))
}

module.exports = { generateQRCode };