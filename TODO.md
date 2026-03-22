# TODO

- Improve `ul.photo-list` responsive layout so rows use a clean number of cards at different screen widths with no awkward whitespace.
- Try a shrink-to-fit card approach (cards can get smaller on narrow screens, but avoid odd gaps).
- Evaluate whether rows should be centered vs left-aligned once responsive behavior is finalized.

## Markdown-in-Liquid notes

- `markdownify` is not a built-in Liquid filter in this Eleventy setup.
- Markdown rendering in Liquid is enabled via Eleventy's Render plugin in `eleventy.config.js`:
  - `const { RenderPlugin } = await import("@11ty/eleventy");`
  - `eleventyConfig.addPlugin(RenderPlugin);`
- To render a markdown string inside Liquid, use:
  - `{% raw %}{{ some_string | renderContent: "md" }}{% endraw %}`
- Example:
  - `{% raw %}{% assign item = "Read the [paper](https://example.com)." %}{% endraw %}`
  - `{% raw %}{{ item | renderContent: "md" }}{% endraw %}`
- `renderContent: "md"` outputs HTML (typically wrapped in `<p>...</p>` for plain paragraph markdown).
