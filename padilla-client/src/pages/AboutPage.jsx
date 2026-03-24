import Button from '../components/Button';
import profile from '../assets/images/profile.jpg';
import project1 from '../assets/images/project1.jpeg';
import project2 from '../assets/images/project2.jpg';
import project3 from '../assets/images/project3.jpg';
import project4 from '../assets/images/project4.jpg';

const AboutPage = () => {
  const projects = [project1, project2, project3, project4];

  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* ✅ FIXED IMAGE SECTION */}
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6 flex items-center justify-center">
            <img
              src={profile}
              alt="Profile"
              className="h-56 w-44 rounded-2xl object-cover shadow-xl bg-white transition hover:scale-105"
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Me
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              I create clean, modern, and user-focused web experiences.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I'm a developer passionate about building responsive and functional
              applications. I enjoy turning ideas into real products that are both
              visually appealing and easy to use.
            </p>

            <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I continuously improve my skills, explore new technologies, and
              work on projects that challenge me to grow.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/">Back Home</Button>
              <Button to="/articles">View Projects</Button>
            </div>
          </div>

        </div>
      </section>

      {/* KPI Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Experience & Highlights
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">2+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Years
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">10+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Projects
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">5+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Tools
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">3</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Skills
            </p>
          </div>

        </div>
      </section>

      {/* Content Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Skills
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              What I Do
            </h2>

            <div className="mt-6 space-y-4">

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Frontend Development</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Building responsive and modern interfaces using React and Tailwind CSS.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">UI/UX Design</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Designing clean, intuitive, and user-centered experiences.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Problem Solving</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Turning complex ideas into simple and efficient solutions.
                </p>
              </article>

            </div>
          </div>

          {/* Right */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Projects Preview
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              {projects.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border bg-white transition hover:scale-[1.03] hover:shadow-md"
                >
                  <img
                    src={img}
                    alt={`Project ${i + 1}`}
                    className="w-full h-[140px] object-cover"
                  />
                </div>
              ))}

            </div>

            <Button className="mt-6 w-full sm:w-auto" to="/articles">
              View Projects
            </Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;