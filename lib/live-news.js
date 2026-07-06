const LIVE_NEWS_LIMIT = 8;
const NEWS_COLORS = ["#0f766e", "#2563eb", "#be123c", "#c2410c", "#7c3aed", "#9333ea", "#0e7490", "#a16207"];

const SOURCE_CONFIG = {
  physics: {
    arxivQuery:
      "cat:physics* OR cat:astro-ph* OR cat:quant-ph OR cat:hep-th OR cat:hep-ex OR cat:gr-qc OR cat:cond-mat*",
    nasaFeeds: ["https://www.nasa.gov/rss/dyn/breaking_news.rss"]
  },
  math: {
    arxivQuery: "cat:math*"
  }
};

function decodeXml(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function textBetween(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function allBlocks(xml, tag) {
  return [...xml.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))].map((match) => match[1]);
}

function httpsUrl(url) {
  return decodeXml(url).replace(/^http:\/\//i, "https://");
}

function slugId(value) {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

function parseArxivEntries(xml) {
  return allBlocks(xml, "entry").map((entry) => {
    const alternateLink = entry.match(/<link\b[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*>/i);
    const firstLink = entry.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
    const category = entry.match(/<category\b[^>]*term=["']([^"']+)["'][^>]*>/i);
    return {
      id: httpsUrl(textBetween(entry, "id")),
      title: textBetween(entry, "title"),
      summary: textBetween(entry, "summary"),
      updated: textBetween(entry, "updated") || textBetween(entry, "published"),
      url: httpsUrl(alternateLink?.[1] || firstLink?.[1] || textBetween(entry, "id")),
      category: decodeXml(category?.[1] || "")
    };
  });
}

function parseRssItems(xml) {
  return allBlocks(xml, "item").map((item) => ({
    title: textBetween(item, "title"),
    summary: textBetween(item, "description"),
    date: textBetween(item, "pubDate") || textBetween(item, "dc:date"),
    url: httpsUrl(textBetween(item, "link"))
  }));
}

function summaryText(text, maxLength = 170) {
  const clean = decodeXml(text.replace(/<[^>]+>/g, ""));
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}...`;
}

function arxivCopy(title, summary, subject) {
  const label = subject === "math" ? "mathematics" : "physics";
  return {
    ru: {
      title,
      summary: `${summaryText(summary)} Источник: arXiv.`,
      tag: `arXiv ${label}`,
      source: "arXiv"
    },
    en: {
      title,
      summary: `${summaryText(summary)} Source: arXiv.`,
      tag: `arXiv ${label}`,
      source: "arXiv"
    }
  };
}

function nasaCopy(title, summary) {
  return {
    ru: {
      title,
      summary: `${summaryText(summary)} Источник: NASA.`,
      tag: "Space",
      source: "NASA"
    },
    en: {
      title,
      summary: `${summaryText(summary)} Source: NASA.`,
      tag: "Space",
      source: "NASA"
    }
  };
}

function arxivPaperId(entry) {
  return (entry.id || entry.url).split("/abs/").at(-1).replace(/v\d+$/i, "");
}

function mapArxivEntries(entries, subject) {
  return entries
    .filter((entry) => entry.title && entry.url)
    .map((entry, index) => {
      const paperId = arxivPaperId(entry);
      return {
        id: `${subject}-arxiv-${paperId}`,
        live: true,
        date: parseDate(entry.updated),
        color: NEWS_COLORS[index % NEWS_COLORS.length],
        url: entry.url,
        copy: arxivCopy(entry.title, entry.summary, subject)
      };
    });
}

function mapNasaItems(items) {
  return items
    .filter((item) => item.title && item.url)
    .map((item, index) => ({
      id: `physics-nasa-${slugId(item.url)}`,
      live: true,
      date: parseDate(item.date),
      color: NEWS_COLORS[(index + 3) % NEWS_COLORS.length],
      url: item.url,
      copy: nasaCopy(item.title, item.summary)
    }));
}

function mergeNewsItems(items, limit = LIVE_NEWS_LIMIT) {
  const seen = new Set();
  return items
    .filter((item) => {
      const key = item.copy.en.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

async function fetchText(url, fetchImpl) {
  const response = await fetchImpl(url, {
    headers: {
      "User-Agent": "CodeCalendar/1.0 (educational event calendar)"
    }
  });
  if (!response.ok) throw new Error(`News source failed: ${response.status} ${url}`);
  return response.text();
}

function arxivUrl(subject) {
  const query = encodeURIComponent(SOURCE_CONFIG[subject].arxivQuery);
  return `https://export.arxiv.org/api/query?search_query=${query}&sortBy=submittedDate&sortOrder=descending&start=0&max_results=8`;
}

async function fetchLiveNews(subject, options = {}) {
  const config = SOURCE_CONFIG[subject];
  if (!config) throw new Error(`Unsupported news subject: ${subject}`);

  const fetchImpl = options.fetchImpl || fetch;
  const arxivXml = await fetchText(arxivUrl(subject), fetchImpl);
  const arxivItems = mapArxivEntries(parseArxivEntries(arxivXml), subject);
  const sourceItems = [...arxivItems];

  for (const feedUrl of config.nasaFeeds || []) {
    const rssXml = await fetchText(feedUrl, fetchImpl);
    sourceItems.push(...mapNasaItems(parseRssItems(rssXml)));
  }

  const items = mergeNewsItems(sourceItems);
  if (items.length < 2) throw new Error(`Not enough ${subject} live news items`);
  return {
    subject,
    updatedAt: new Date().toISOString(),
    items
  };
}

module.exports = {
  fetchLiveNews,
  mapArxivEntries,
  mapNasaItems,
  mergeNewsItems,
  parseArxivEntries,
  parseRssItems
};
