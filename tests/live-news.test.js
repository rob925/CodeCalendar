const assert = require("assert");

const {
  fetchLiveNews,
  mapArxivEntries,
  mapNasaItems,
  mergeNewsItems,
  parseArxivEntries,
  parseRssItems
} = require("../lib/live-news.js");

const arxivXml = `<?xml version="1.0"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>http://arxiv.org/abs/2607.12345v1</id>
    <updated>2026-07-04T10:00:00Z</updated>
    <title>Quantum fields near black holes</title>
    <summary>We study field theory effects near compact objects.</summary>
    <link href="http://arxiv.org/abs/2607.12345v1" rel="alternate" type="text/html"/>
    <category term="hep-th"/>
  </entry>
  <entry>
    <id>http://arxiv.org/abs/2607.67890v1</id>
    <updated>2026-07-03T08:00:00Z</updated>
    <title>New bounds in additive combinatorics</title>
    <summary>A short note on additive structures.</summary>
    <link href="http://arxiv.org/abs/2607.67890v1" rel="alternate" type="text/html"/>
    <category term="math.CO"/>
  </entry>
</feed>`;

const nasaXml = `<?xml version="1.0"?>
<rss><channel>
  <item>
    <title>NASA telescope maps high-energy sky</title>
    <link>https://www.nasa.gov/news/telescope-map/</link>
    <pubDate>Fri, 03 Jul 2026 12:00:00 GMT</pubDate>
    <description>Mission teams released a new view of energetic sources.</description>
  </item>
</channel></rss>`;

const arxivEntries = parseArxivEntries(arxivXml);
assert.strictEqual(arxivEntries.length, 2);
assert.strictEqual(arxivEntries[0].title, "Quantum fields near black holes");
assert.strictEqual(arxivEntries[0].url, "https://arxiv.org/abs/2607.12345v1");

const physicsItems = mapArxivEntries(arxivEntries, "physics");
assert.strictEqual(physicsItems[0].id, "physics-arxiv-2607.12345");
assert.strictEqual(physicsItems[0].live, true);
assert.strictEqual(physicsItems[0].date, "2026-07-04");
assert.strictEqual(physicsItems[0].copy.ru.tag, "arXiv physics");
assert.ok(physicsItems[0].copy.en.summary.includes("Source: arXiv."));

const nasaItems = mapNasaItems(parseRssItems(nasaXml));
assert.strictEqual(nasaItems[0].id, "physics-nasa-www-nasa-gov-news-telescope-map");
assert.strictEqual(nasaItems[0].copy.ru.source, "NASA");
assert.strictEqual(nasaItems[0].url, "https://www.nasa.gov/news/telescope-map/");

const merged = mergeNewsItems([
  physicsItems[0],
  { ...physicsItems[0], id: "duplicate-title" },
  nasaItems[0]
]);
assert.strictEqual(merged.length, 2);

async function runFetchTests() {
  const urls = [];
  const fakeFetch = async (url) => {
    urls.push(url);
    return {
      ok: true,
      text: async () => (url.includes("nasa.gov") ? nasaXml : arxivXml)
    };
  };

  const physics = await fetchLiveNews("physics", { fetchImpl: fakeFetch });
  assert.ok(urls.some((url) => url.includes("export.arxiv.org/api/query")));
  assert.ok(urls.some((url) => url.includes("nasa.gov/rss")));
  assert.ok(physics.items.length >= 2);
  assert.strictEqual(physics.subject, "physics");
  assert.strictEqual(physics.items[0].live, true);

  const math = await fetchLiveNews("math", { fetchImpl: fakeFetch });
  assert.ok(math.items.every((item) => item.id.startsWith("math-")));

  await assert.rejects(() => fetchLiveNews("it", { fetchImpl: fakeFetch }), /Unsupported news subject/);
}

runFetchTests().catch((error) => {
  console.error(error);
  process.exit(1);
});
