const assert = require("assert");
const { validateAuthPassword } = require("../app.js");

assert.strictEqual(validateAuthPassword("abc12"), "authPasswordTooShort");
assert.strictEqual(validateAuthPassword("abcdef"), "");
assert.strictEqual(validateAuthPassword("пароль12"), "authPasswordCyrillic");
