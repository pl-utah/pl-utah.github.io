const yaml = require("js-yaml");

function lastName(value) {
  if (typeof value === "string") {
    return value.trim().split(/\s+/).pop().toLowerCase();
  }
  if (value && typeof value.name === "string") {
    return value.name.trim().split(/\s+/).pop().toLowerCase();
  }
  return "";
}

function alumniYear(person) {
  const rawYear = person?.year ?? person?.grad_year ?? person?.graduated ?? person?.date;
  const year = Number.parseInt(rawYear, 10);
  return Number.isFinite(year) ? year : 0;
}

function semesterSortValue(semester) {
  const match = /^(Spring|Summer|Fall)\s+(\d{4})$/i.exec(semester ?? "");
  if (!match) return 0;
  const season = { spring: 1, summer: 2, fall: 3 }[match[1].toLowerCase()];
  return Number(match[2]) * 10 + season;
}

function formatScheduleDate(value) {
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year.slice(-2)}`;
}

module.exports = async function (eleventyConfig) {
  const { RenderPlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(RenderPlugin);

  // Keep repository docs from being emitted as site pages.
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("TODO.md");

  eleventyConfig.addFilter("sortByDateDesc", (items, key = "date") => {
    if (!Array.isArray(items)) return items;
    return [...items].sort((a, b) => {
      const aTs = Date.parse(a?.[key]);
      const bTs = Date.parse(b?.[key]);
      const aValid = Number.isFinite(aTs);
      const bValid = Number.isFinite(bTs);
      if (aValid && bValid) return bTs - aTs;
      if (aValid) return -1;
      if (bValid) return 1;
      return 0;
    });
  });

  eleventyConfig.addFilter("sortAlumni", items => {
    if (!Array.isArray(items)) return items;
    return [...items].sort((a, b) => {
      const yearDiff = alumniYear(b) - alumniYear(a);
      if (yearDiff !== 0) return yearDiff;
      return lastName(a).localeCompare(lastName(b));
    });
  });

  eleventyConfig.addFilter("sortSemestersDesc", schedules => {
    if (!schedules || typeof schedules !== "object") return schedules;
    return Object.values(schedules).sort(
      (a, b) => semesterSortValue(b.semester) - semesterSortValue(a.semester),
    );
  });

  eleventyConfig.addFilter("formatScheduleDate", formatScheduleDate);

  eleventyConfig.addDataExtension("yaml,yml", contents => {
    const data = yaml.load(contents);
    if (Array.isArray(data)) {
      return [...data].sort((a, b) => lastName(a).localeCompare(lastName(b)));
    }
    return data;
  });
  eleventyConfig.addPassthroughCopy("assets");
};
