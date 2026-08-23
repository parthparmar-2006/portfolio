import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import { mdxComponents } from "./mdx-components";

/**
 * Compiles MDX on the server at build time. Nothing about this ships to the
 * browser: `MDXRemote` from `next-mdx-remote/rsc` renders as a server
 * component, so posts cost zero client JavaScript unless the MDX itself pulls
 * in an interactive component.
 *
 * Syntax highlighting uses Shiki through rehype-pretty-code with two themes at
 * once. The light theme's colours land inline and the dark theme's land in a
 * `--shiki-dark` custom property, which globals.css swaps in — so code blocks
 * follow the theme with no runtime highlighting and no flash.
 */
const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  defaultLang: "text",
  keepBackground: false,
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        parseFrontmatter: false,
        // next-mdx-remote v6 strips JavaScript expressions from MDX by default,
        // because its usual use case is rendering untrusted, user-submitted
        // content. Ours is first-party MDX committed to this repo, and the
        // default silently drops expression props like `steps={[...]}` — the
        // component renders with the prop undefined rather than erroring.
        // `blockDangerousJS` stays on, so eval/require-style calls are still
        // rejected.
        blockJS: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
