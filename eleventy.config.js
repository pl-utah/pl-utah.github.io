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

module.exports = async function (eleventyConfig) {
  const { RenderPlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(RenderPlugin);

  eleventyConfig.addDataExtension("yaml,yml", contents => {
    const data = yaml.load(contents);
    if (Array.isArray(data)) {
      return [...data].sort((a, b) => lastName(a).localeCompare(lastName(b)));
    }
    return data;
  });
  eleventyConfig.addPassthroughCopy("assets");
};
