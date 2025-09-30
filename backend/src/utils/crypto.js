import crypto from "crypto";

const ALGO = "aes-256-gcm";
const IV_BYTES = 12;
const SALT_BYTES = 16;
const KEY_LEN = 32;

// ⚠️ Store securely in .env
const PASSPHRASE = process.env.ENCRYPTION_PASSPHRASE || "change-me";

function deriveKey(passphrase, salt) {
  return crypto.scryptSync(passphrase, salt, KEY_LEN);
}

// Encrypt function
export function encrypt(plainText) {
  const salt = crypto.randomBytes(SALT_BYTES);
  const key = deriveKey(PASSPHRASE, salt);
  const iv = crypto.randomBytes(IV_BYTES);

  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    salt: salt.toString("hex"),
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    ciphertext: encrypted.toString("hex"),
  };
}

// Decrypt function
// For now, included for demo purposes
export function decrypt(encryptedObj) {
  if (
    !encryptedObj ||
    !encryptedObj.salt ||
    !encryptedObj.iv ||
    !encryptedObj.tag ||
    !encryptedObj.ciphertext
  ) {
    throw new Error("Invalid encrypted object. Missing required fields.");
  }

  const { salt, iv, tag, ciphertext } = encryptedObj;

  const key = deriveKey(PASSPHRASE, Buffer.from(salt, "hex"));
  const decipher = crypto.createDecipheriv(ALGO, key, Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(tag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
