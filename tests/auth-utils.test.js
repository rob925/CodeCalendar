const assert = require("assert");
const { validateAuthPassword, generatePassword } = require("../app.js");

assert.strictEqual(validateAuthPassword("abc12"), "authPasswordTooShort");
assert.strictEqual(validateAuthPassword("abcdef"), "");
assert.strictEqual(validateAuthPassword("пароль12"), "authPasswordCyrillic");

const generated = generatePassword();
assert.strictEqual(generated.length, 8);
assert.strictEqual(/[А-Яа-яЁё]/.test(generated), false);
assert.strictEqual(validateAuthPassword(generated), "");
