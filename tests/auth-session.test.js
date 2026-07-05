const assert = require("assert");
const { shouldRestoreAuthSession } = require("../app.js");

assert.strictEqual(shouldRestoreAuthSession("1"), true);
assert.strictEqual(shouldRestoreAuthSession(null), false);
assert.strictEqual(shouldRestoreAuthSession(""), false);
assert.strictEqual(shouldRestoreAuthSession("true"), false);
