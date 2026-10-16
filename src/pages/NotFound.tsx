import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="prose">
      <h1>找不到頁面</h1>
      <p>
        請回到 <Link to="/">首頁</Link>。
      </p>
    </section>
  );
}
