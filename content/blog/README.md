# Blog Authoring

Add new posts as Markdown files in this folder.

The setup supports both:

- standard Markdown posts
- HTML-backed posts stored in `.md` files with `format: html`

That means you can keep older imported posts as HTML for now, while writing new posts in Markdown.

Required frontmatter:

```md
---
title: Your Post Title
slug: your-post-slug
description: One-sentence SEO description
excerpt: Short card summary
date: 2026-04-21
updated: 2026-04-21
image: /assets/images/your-cover-image.png
imageAlt: Accessible description of the cover image
tag: ENS
---
```

Optional frontmatter:

```md
format: markdown
```

Use `format: html` only when the post body already contains raw HTML and you want the generator to keep it as-is.

Then run:

```sh
npm run generate:blog
```

The generator will:

- create `blog/<slug>.html`
- update `blog.html`
- update the homepage blog section in `index.html`

Notes:

- `slug` must be unique across all posts.
- `date` and `updated` should use `YYYY-MM-DD`.
- `image` should be a site path like `/assets/images/cover.png`.
- If `excerpt`, `updated`, `imageAlt`, or `tag` are omitted, the generator falls back to sensible defaults.
