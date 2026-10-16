import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarkdownView from '../components/MarkdownView';
import { getArticle } from '../lib/articles';
import NotFound from './NotFound';

export default function ArticlePage() {
  const { slug = '' } = useParams();
  const article = getArticle(slug);

  useEffect(() => {
    document.title = article ? `${article.title}｜腎結石衛教` : '腎結石衛教';
  }, [article]);

  if (!article) return <NotFound />;

  return (
    <article className="prose">
      <p>
        <Link to="/articles">← 返回文章列表</Link>
      </p>
      <h1>{article.title}</h1>
      <p className="prose__meta">
        {article.date}
        {article.tags.length > 0 && ` · ${article.tags.join(' / ')}`}
      </p>
      <MarkdownView source={article.content} />
    </article>
  );
}
