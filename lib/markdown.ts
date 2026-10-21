import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import type { Element, Root } from "hast";

function stripHeadingIds(markdown: string): string {
  return markdown.replace(/^(#{1,6} .+?)\s+\{#[^}]+\}$/gm, "$1");
}

/**
 * `**Question?**` followed by a newline and the answer is a common FAQ pattern.
 * Markdown treats that newline as a space, which runs Q and A together, so a
 * paragraph that opens with bold text and then a line break gets a real <br>.
 */
function rehypeBoldLeadBreak() {
  return (tree: Root) => {
    const visit = (node: Root | Element) => {
      for (const child of node.children) {
        if (child.type !== "element") continue;
        if (child.tagName === "p") {
          const [first, second] = child.children;
          if (
            first?.type === "element" &&
            first.tagName === "strong" &&
            second?.type === "text" &&
            second.value.startsWith("\n")
          ) {
            second.value = second.value.slice(1);
            child.children.splice(1, 0, {
              type: "element",
              tagName: "br",
              properties: {},
              children: [],
            });
          }
        } else {
          visit(child);
        }
      }
    };
    visit(tree);
  };
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeBoldLeadBreak)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(stripHeadingIds(markdown));
  return String(file);
}
