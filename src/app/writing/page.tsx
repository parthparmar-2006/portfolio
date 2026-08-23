import Link from "next/link";
import { getMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/writing/PostCard";

export const metadata = buildMetadata({
  title: "Writing",
  description:
    "Essays on sandboxing untrusted code, debugging reinforcement learning, and the diploma-to-B.Tech lateral entry route.",
  path: "/writing",
});

/**
 * Deliberately the same shape as /work: eyebrow, title, standfirst, then a
 * feature followed by a grid.
 *
 * An earlier pass gave every page its own opening to fix "eight pages open
 * identically" — but /work and /writing are the same *kind* of page, an index
 * of long-form content, so making them differ was difference for its own sake.
 * The pages that genuinely do a different job (/uses, /links, /contact) keep
 * their own shapes.
 */
export default function WritingPage() {
  const posts = getMeta("writing");
  const [latest, ...rest] = posts;

  return (
    <Canvas className="pb-24 pt-16 sm:pt-20">
      <Zone zone="wide">
        <Eyebrow>Writing</Eyebrow>
        <h1 className="mt-5 max-w-[18ch] font-display text-title">
          Notes from the things that broke
        </h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-muted">
          Mostly post-mortems. What I expected, what actually happened, and the part where the
          diagnosis turned out to be somewhere I was not looking.
        </p>

        <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
          {posts.length} {posts.length === 1 ? "piece" : "pieces"} ·{" "}
          <Link href="/rss.xml" className="link-draw">
            RSS
          </Link>
        </p>
      </Zone>

      {latest ? (
        <Zone zone="wide" className="mt-12">
          <Reveal>
            <PostCard post={latest} index={0} featured />
          </Reveal>
        </Zone>
      ) : null}

      {rest.length > 0 ? (
        <Zone zone="wide" className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06} className="h-full">
              <PostCard post={post} index={index + 1} />
            </Reveal>
          ))}
        </Zone>
      ) : null}
    </Canvas>
  );
}
