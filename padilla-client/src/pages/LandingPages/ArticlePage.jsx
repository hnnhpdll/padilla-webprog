import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import articles from '../../assets/article-content.js';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">

      {/* Header Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {article.name
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {/* Article Image */}
          {article.image && (
            <div className="mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[300px] object-cover rounded-2xl border-2 border-zinc-900"
              />
            </div>
          )}

          {/* Article content */}
          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {article.content.map((paragraph, index) => {
              const isCode = /function|const|let|var|<|useEffect/.test(paragraph);

              return isCode ? (
                <pre
                  key={index}
                  className="bg-zinc-100 p-4 rounded-md overflow-x-auto text-sm"
                >
                  <code>{paragraph}</code>
                </pre>
              ) : (
                <p key={index} className="text-base leading-7 whitespace-pre-wrap">
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="mt-8 border-t-2 border-zinc-900 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ArticlePage;