const assert = require("assert");

const calendarData = require("../data/calendar-data.js");

const subjects = ["it", "physics", "math"];
const languages = ["ru", "en"];
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const allEventIds = [];

assert.ok(calendarData.translations, "translations must be exported");
assert.ok(calendarData.categoriesBySubject, "categoriesBySubject must be exported");
assert.ok(calendarData.eventsBySubject, "eventsBySubject must be exported");
assert.ok(calendarData.newsItemsBySubject, "newsItemsBySubject must be exported");

for (const lang of languages) {
  assert.ok(calendarData.translations[lang], `${lang} translations must exist`);
  assert.ok(calendarData.translations[lang].events, `${lang} event translations must exist`);
  assert.ok(calendarData.translations[lang].news, `${lang} news translations must exist`);
}

for (const subject of subjects) {
  const categories = calendarData.categoriesBySubject[subject];
  const events = calendarData.eventsBySubject[subject];
  const newsItems = calendarData.newsItemsBySubject[subject];

  assert.ok(Array.isArray(categories), `${subject} categories must be an array`);
  assert.ok(Array.isArray(events), `${subject} events must be an array`);
  assert.ok(Array.isArray(newsItems), `${subject} news items must be an array`);
  assert.ok(categories.length > 0, `${subject} must have categories`);
  assert.ok(events.length > 0, `${subject} must have events`);
  assert.ok(newsItems.length > 0, `${subject} must have news items`);

  const categoryIds = new Set(categories.map((category) => category.id));

  for (const event of events) {
    allEventIds.push(event.id);
    assert.ok(categoryIds.has(event.category), `${event.id} uses unknown ${subject} category ${event.category}`);
    assert.ok(datePattern.test(event.date), `${event.id} date must use YYYY-MM-DD`);
    assert.ok(event.url.startsWith("https://"), `${event.id} url must use https`);

    for (const lang of languages) {
      assert.ok(calendarData.translations[lang].events[event.id], `${event.id} missing ${lang} translation`);
    }
  }

  for (const item of newsItems) {
    assert.ok(datePattern.test(item.date), `${item.id} news date must use YYYY-MM-DD`);
    assert.ok(item.url.startsWith("https://"), `${item.id} news url must use https`);

    for (const lang of languages) {
      assert.ok(calendarData.translations[lang].news[item.id], `${item.id} missing ${lang} news translation`);
    }
  }
}

const duplicateIds = allEventIds.filter((id, index) => allEventIds.indexOf(id) !== index);
assert.deepStrictEqual([...new Set(duplicateIds)], [], "event ids must be unique across subjects");
