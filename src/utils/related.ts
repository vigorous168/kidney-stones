import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

export function getRelated(currentArticle: Article, allArticles: Article[], autoLimit = 3) {
  const byId = new Map(allArticles.map((article) => [article.id, article]));

  const manual = currentArticle.data.related.map((id) => {
    const found = byId.get(id);

    if (!found) {
      throw new Error(`[${currentArticle.id}] related Cannot find article：${id}`);
    }

    return found;
  });

  const usedArticles = new Set([
    currentArticle.id,
    ...manual.map((article: Article) => article.id),
  ]);
  const tags = new Set(currentArticle.data.tags);

  const auto = allArticles
    .filter((article) => !usedArticles.has(article.id))
    .map((article) => ({ article, score: article.data.tags.filter((tag) => tags.has(tag)).length }))
    .filter((x) => x.score > 0)
    .sort((x, y) => {
      const xPublishedDate = x.article.data.updated?.valueOf() ?? x.article.data.date.valueOf();
      const yPublishedDate = y.article.data.updated?.valueOf() ?? y.article.data.date.valueOf();

      return y.score - x.score || yPublishedDate - xPublishedDate;
    })
    .slice(0, autoLimit)
    .map((x) => x.article);

  return { manual, auto };
}
