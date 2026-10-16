import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../lib/articles';

export default function Home() {
  const latest = getArticles().slice(0, 3);
  return (
    <>
      <section className="prose">
        <h1>認識腎結石</h1>
        <p>提供腎結石的成因、症狀、治療與日常預防的衛教資訊。</p>
      </section>
      <section>
        <h2>最新文章</h2>
        <ul className="card-list">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </ul>
        <p>
          <Link to="/articles">查看全部文章 →</Link>
        </p>
      </section>
    </>
  );
}
