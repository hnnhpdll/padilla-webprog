import Button from '../components/Button';

// ✅ Import images
import project1 from '../assets/images/project1.jpeg';
import project2 from '../assets/images/project2.jpg';
import project3 from '../assets/images/project3.jpg';
import project4 from '../assets/images/project4.jpg';

const ArticlePage = () => {
  // ✅ Dynamic content (clean + scalable)
  const articles = [
    {
      image: project1,
      title: "Portfolio Website",
      description: "A personal portfolio built using React and Tailwind CSS, showcasing my projects, skills, and responsive design approach."
    },
    {
      image: project2,
      title: "Task Management App",
      description: "A productivity application that allows users to organize tasks, track progress, and improve daily workflow efficiency."
    },
    {
      image: project3,
      title: "E-commerce UI Design",
      description: "A modern shopping interface featuring product grids, clean layouts, and responsive components for better user experience."
    },
    {
      image: project4,
      title: "Dashboard Interface",
      description: "A data visualization dashboard displaying analytics, charts, and key metrics with a clean and structured layout."
    }
  ];

  return (
    <div className="flex w-full flex-col gap-6">

      {/* Header Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Projects
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          A collection of my recent work and projects
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          These projects highlight my skills in frontend development, UI/UX design, and building responsive applications. Each project focuses on usability, clean design, and real-world functionality.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Projects
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Project showcase
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {articles.map((article, i) => (
            <article
              key={i}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition hover:shadow-lg"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-[1.25rem]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[140px] object-cover"
                />
              </div>

              {/* Label */}
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Project {String(i + 1).padStart(2, '0')}
              </p>

              {/* Title */}
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                {article.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {article.description}
              </p>

              {/* Button */}
              <Button className="mt-4 w-full">
                View Project
              </Button>
            </article>
          ))}

        </div>
      </section>

    </div>
  );
};

export default ArticlePage;