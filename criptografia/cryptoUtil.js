const crypto = require("crypto");

const salt = "354254";

function encryptField(field) {
  const key = crypto.pbkdf2Sync(field, salt, 10000, 64, "sha512");
  return key.toString("base64");
}

function decryptField(encryptField) {
  const keyBuffer = Buffer.from(encryptField, "base64");
  const key = crypto.pbkdf2Sync(keyBuffer, salt, 10000, 64, "sha512");
  return key.toString("utf8");
}

module.exports = { encryptField, decryptField };
