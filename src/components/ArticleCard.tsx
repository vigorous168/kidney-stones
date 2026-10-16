import { Link } from 'react-router-dom';
import type { ArticleMeta } from '../lib/articles';

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <li className="card">
      <Link to={`/articles/${article.slug}`} className="card__link">
        {article.cover && <img className="card__cover" src={article.cover} alt="" loading="lazy" />}
        <div className="card__body">
          <h3 className="card__title">{article.title}</h3>
          <p className="card__summary">{article.summary}</p>
          <p className="card__meta">
            {article.date}
            {article.tags.length > 0 && ` · ${article.tags.join(' / ')}`}
          </p>
        </div>
      </Link>
    </li>
  );
}
