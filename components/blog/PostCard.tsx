import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/Icons";
import { formatLongDate } from "@/lib/posts";
import type { Post } from "@/lib/posts";

function cleanTitle(title: string) {
  return title.replace(/^\[Case Study\]\s*/i, "");
}

export function PostCardFeatured({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block relative rounded-2xl border border-border bg-surface/60 overflow-hidden hover:border-border-strong transition-colors"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-surface-2">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.imageAlt ?? post.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-surface to-surface-2 flex items-center justify-center font-display text-6xl text-text-muted">
              {post.title.slice(0, 1)}
            </div>
          )}
          <div className="absolute top-5 left-5 text-[10px] font-mono uppercase tracking-widest text-text bg-bg/70 backdrop-blur border border-border-strong rounded-full px-2.5 py-1">
            Featured · {post.tag ?? "Story"}
          </div>
        </div>
        <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col">
          <div className="text-xs font-mono uppercase tracking-widest text-text-subtle">
            {formatLongDate(post.date)} · {post.readingLabel}
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] tracking-tight group-hover:text-accent transition-colors">
            {cleanTitle(post.title)}
          </h2>
          {post.description ? (
            <p className="mt-5 text-text-muted leading-relaxed line-clamp-4">
              {post.description}
            </p>
          ) : null}
          <div className="mt-auto pt-8 inline-flex items-center gap-1.5 text-sm text-text-muted group-hover:text-accent transition-colors">
            Read story
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block relative rounded-xl border border-border bg-surface/60 overflow-hidden hover:border-border-strong transition-colors flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-surface to-surface-2 flex items-center justify-center font-display text-4xl text-text-muted">
            {post.title.slice(0, 1)}
          </div>
        )}
        {post.tag ? (
          <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-text bg-bg/70 backdrop-blur border border-border-strong rounded-full px-2.5 py-1">
            {post.tag}
          </div>
        ) : null}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-xs font-mono uppercase tracking-widest text-text-subtle">
          {formatLongDate(post.date)}
        </div>
        <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight group-hover:text-accent transition-colors">
          {cleanTitle(post.title)}
        </h3>
        {post.description ? (
          <p className="mt-3 text-sm text-text-muted leading-relaxed line-clamp-2">
            {post.description}
          </p>
        ) : null}
        <div className="mt-auto pt-6 flex items-center justify-between text-xs text-text-subtle">
          <span className="font-mono">{post.readingLabel}</span>
          <span className="inline-flex items-center gap-1 text-text-muted group-hover:text-accent transition-colors">
            Read
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
