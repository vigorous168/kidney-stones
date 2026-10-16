export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  cover?: string | undefined;
  tags: string[];
  order: number;
}

export interface Article extends ArticleMeta {
  content: string;
}

interface ParsedArticle {
  article: Article;
  draft: boolean;
}

const context = require.context('../content/articles', false, /\.md$/);

const FRONTMATTER_PATTERN = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const match = FRONTMATTER_PATTERN.exec(text);
  const header = match?.[1];
  const body = match?.[2];

  if (header === undefined || body === undefined) {
    return { data: {}, content: text };
  }

  const data: Record<string, string> = {};
  for (const line of header.split('\n')) {
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    data[key] = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
  }
  return { data, content: body };
}

function toRaw(mod: unknown): string {
  if (typeof mod === 'string') return mod;
  return (mod as { default: string }).default;
}

function toParsedArticle(key: string): ParsedArticle {
  const slug = key.replace(/^\.\//, '').replace(/\.md$/, '');
  const { data, content } = parseFrontmatter(toRaw(context(key)));

  const cover = data.cover?.trim();
  const tags = (data.tags ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const article: Article = {
    slug,
    title: data.title || slug,
    summary: data.summary ?? '',
    date: data.date ?? '',
    tags,
    order: Number(data.order) || 999,
    content,
    ...(cover ? { cover } : {}),
  };

  return { article, draft: data.draft === 'true' };
}

const articles: Article[] = context
  .keys()
  .map(toParsedArticle)
  .filter((parsed) => !parsed.draft)
  .map((parsed) => parsed.article)
  .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date));

export function getArticles(): ArticleMeta[] {
  return articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    summary: a.summary,
    date: a.date,
    cover: a.cover,
    tags: a.tags,
    order: a.order,
  }));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
