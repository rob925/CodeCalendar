const assert = require("assert");
const { validateAuthEmail, emailSuggestions, emailGhostSuggestion } = require("../app.js");

assert.strictEqual(validateAuthEmail("a@b.co"), "");
assert.strictEqual(validateAuthEmail("aa@b.c"), "authEmailDomainInvalid");
assert.strictEqual(validateAuthEmail("abc"), "authEmailTooShort");
assert.strictEqual(validateAuthEmail("abcdef"), "authEmailAtMissing");
assert.strictEqual(validateAuthEmail("name@domain"), "authEmailDomainInvalid");

assert.deepStrictEqual(emailSuggestions("maksim@").slice(0, 3), [
  "maksim@gmail.com",
  "maksim@mail.ru",
  "maksim@yandex.ru"
]);

assert.ok(emailSuggestions("maksim@gm").includes("maksim@gmail.com"));
assert.ok(emailSuggestions("maksim@gmail.").includes("maksim@gmail.com"));
assert.ok(emailSuggestions("maksimgmail").includes("maksim@gmail.com"));
assert.deepStrictEqual(emailSuggestions("maksim@gmail.com"), []);
assert.strictEqual(emailGhostSuggestion("maksim@gm"), "maksim@gmail.com");
assert.strictEqual(emailGhostSuggestion("maksim@gmail.com"), "");
