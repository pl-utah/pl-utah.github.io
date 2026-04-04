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

module.exports = async function (eleventyConfig) {
  const { RenderPlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(RenderPlugin);

  // Keep repository docs from being emitted as site pages.
  eleventyConfig.ignores.add(".context/**");
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

  eleventyConfig.addDataExtension("yaml,yml", contents => {
    const data = yaml.load(contents);
    if (Array.isArray(data)) {
      return [...data].sort((a, b) => lastName(a).localeCompare(lastName(b)));
    }
    return data;
  });
  eleventyConfig.addPassthroughCopy("assets");
};
