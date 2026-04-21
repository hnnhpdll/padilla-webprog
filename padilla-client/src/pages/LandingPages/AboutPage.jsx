import Button from '../../components/Button';
import profile from '../../assets/images/profile.png';
import project1 from '../../assets/images/project1.png';
import project2 from '../../assets/images/project2.png';
import project3 from '../../assets/images/project3.png';
import project4 from '../../assets/images/project4.png';

const AboutPage = () => {
  const projects = [project1, project2, project3, project4];

  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

    {/* Image */}
    <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6 overflow-hidden">
                <img
                  src={profile}
                  alt="Hero"
                  className="h-full w-full object-cover rounded-[1.25rem]"
                />
              </div>

    {/* Text */}
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        About the Company
      </p>

      <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
        We deliver innovative engineering and construction solutions with quality and reliability.
      </h1>

      <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
        FFP Concept Planning Solutions Corporation is a professional engineering, design, and construction company established in 2012. We specialize in planning, development, and execution of residential, commercial, and industrial projects while ensuring quality, efficiency, and client satisfaction.
      </p>

      <div className="mt-6 flex gap-5">
        <Button to="/">Back Home</Button>
        <Button to="/projects">View Projects</Button>
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
  Experience & Capabilities
</h2>
</div>

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

  <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
    <p className="text-2xl font-bold text-zinc-900">10+</p>
    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
      Years Experience
    </p>
  </div>

  <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
    <p className="text-2xl font-bold text-zinc-900">50+</p>
    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
      Completed Projects
    </p>
  </div>

  <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
    <p className="text-2xl font-bold text-zinc-900">8+</p>
    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
      Engineering Services
    </p>
  </div>

  <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
    <p className="text-2xl font-bold text-zinc-900">Multi</p>
    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
      Project Types
    </p>
  </div>


        </div>
      </section>

      {/* Content Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  {/* Projects Container full-width */}
  <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 w-full">
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500 text-center">
      Projects Preview
    </p>

    <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
      {projects.map((img, i) => (
        <div
          key={i}
          className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-3 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md"
        >
          <img
            src={img}
            alt={`Project ${i + 1}`}
            className="w-full h-[140px] object-cover rounded-xl"
          />
        </div>
      ))}
    </div>

    {/* Button */}
    <div className="mt-6 flex justify-center">
      <Button className="w-full sm:w-auto" to="/articles">
        View Projects
      </Button>
    </div>
  </div>
</section>
    </div>
  );
};

export default AboutPage;