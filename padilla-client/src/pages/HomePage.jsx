import Button from '../components/Button';
import heroImage from '../assets/images/hero.jpg';
import feature1 from '../assets/images/feature1.jpeg';
import feature2 from '../assets/images/feature2.jpg';
import feature3 from '../assets/images/feature3.jpg';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Hero Section
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Hi, I'm Hannah — Crafting Creative Digital Experiences
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I specialize in creating clean and modern designs for web and mobile applications. Explore my projects, articles, and portfolio highlights below.
            </p>

            <div className="mt-2 flex justify-start">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6 overflow-hidden">
            <img
              src={heroImage}
              alt="Hero"
              className="h-full w-full object-cover rounded-[1.25rem]"
            />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick Overview
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Projects Completed
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-2xl font-bold text-zinc-900">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Clients Worked With
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-2xl font-bold text-zinc-900">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Screens Designed
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-2xl font-bold text-zinc-900">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Years Experience
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Cards
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Portfolio Highlights
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img src={feature1} alt="Project One" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Creative Web Design
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A modern website design focused on clean layout, usability, and aesthetics.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img src={feature2} alt="Project Two" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Mobile App Interface
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              User-friendly interface design for a productivity mobile app.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img src={feature3} alt="Project Three" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Branding & Illustration
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Visual branding and illustration work for modern startups.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

        </div>
      </section>

    </div>
  );
};

export default HomePage;