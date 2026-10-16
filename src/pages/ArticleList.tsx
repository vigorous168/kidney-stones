import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../lib/articles';

export default function ArticleList() {
  const articles = getArticles();
  return (
    <section>
      <h1>衛教文章</h1>
      <ul className="card-list">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </ul>
    </section>
  );
}
