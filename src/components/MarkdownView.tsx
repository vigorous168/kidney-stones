import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownView({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading="lazy" />,
        a: ({ href, children }) => {
          const external = href ? /^https?:\/\//.test(href) : false;
          return external ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ) : (
            <a href={href}>{children}</a>
          );
        },
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
