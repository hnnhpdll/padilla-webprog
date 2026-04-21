import Button from '../../components/Button.jsx';
import { Link } from 'react-router-dom';
import articles from '../../assets/article-content.js'; // Articles for full pages
import project1 from '../../assets/images/project1.png';
import project2 from '../../assets/images/project2.png';
import project3 from '../../assets/images/project3.png';
import project4 from '../../assets/images/project4.png';

const ArticleListPage = () => {
  const projects = [
    { image: project1, title: "SBMA Subic Bay Leisure & Playzone" },
    { image: project2, title: "SBMA Corporate" },
    { image: project3, title: "SBMA Subic Luxe Residences I" },
    { image: project4, title: "Subic Bay International Airport" },
  ];

  return (
    <div className="flex w-full flex-col gap-6">

      {/* Header Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="w-full text-center">
        
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
  Architecture and Urban Planning Projects
</h1>

<p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
  These works showcase planning concepts in architecture, engineering design, and urban development.
  Each project explores functionality, spatial planning, and sustainable construction principles
  aimed at improving modern living environments and infrastructure systems.
</p>
          <div className="mt-6 flex justify-center">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Projects
          </h2>
          
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, i) => (
            <article
              key={i}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition hover:shadow-lg"
            >
              <div className="overflow-hidden rounded-[1.25rem]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[140px] object-cover"
                />
              </div>

             

              <h3 className="mt-2 text-lg font-semibold text-zinc-900">{project.title}</h3>
              <Button className="mt-4 w-full">View Project</Button>
            </article>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h2 className="text-2xl font-bold text-zinc-900 mb-10">Articles</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.name}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
            >
              {article.image && (
                <div className="overflow-hidden rounded-[1.25rem] mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[140px] object-cover"
                  />
                </div>
              )}
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {article.content[0].substring(0, 150)}...
              </p>
              <Link to={`/articles/${article.name}`}>
                <Button className="mt-4 w-full">Read More</Button>
              </Link>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ArticleListPage;