const assert = require("assert");
const fs = require("fs");
const { shouldRestoreAuthSession } = require("../app.js");

assert.strictEqual(shouldRestoreAuthSession("1"), true);
assert.strictEqual(shouldRestoreAuthSession(null), true);
assert.strictEqual(shouldRestoreAuthSession(""), true);
assert.strictEqual(shouldRestoreAuthSession("true"), true);
assert.strictEqual(shouldRestoreAuthSession("0"), false);

const src = fs.readFileSync("app.js", "utf8");
const refreshBody = src.slice(src.indexOf("async function refreshAuthSession"), src.indexOf("function renderEmailSuggestions"));
const authenticatedRefresh = refreshBody.slice(refreshBody.indexOf("if (state.authUser)"), refreshBody.indexOf("} else {"));
assert.ok(
  authenticatedRefresh.indexOf("render();") > -1 &&
    authenticatedRefresh.indexOf("render();") < authenticatedRefresh.indexOf("uploadLocalRegisteredEvents"),
  "refreshAuthSession should render the restored user before slow event sync"
);
