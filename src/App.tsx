import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ArticleList from './pages/ArticleList';
import ArticlePage from './pages/ArticlePage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
