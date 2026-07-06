const assert = require("assert");
const fs = require("fs");

const page = fs.readFileSync("pages/index.jsx", "utf8");

assert.ok(page.includes("getServerSideProps"), "SSR page must export getServerSideProps");
assert.ok(page.includes("createServerClient"), "SSR page must create a Supabase server client");
assert.ok(page.includes("createBrowserClient"), "SSR page must create a Supabase browser client");
assert.ok(page.includes("initialState"), "SSR page must pass initialState to the client");
assert.ok(page.includes("__CODECALENDAR_INITIAL_STATE__"), "Client must receive initial auth state");
