import Button from '../../components/Button';
import heroImage from '../../assets/images/hero.png';
import feature1 from '../../assets/images/feature1.png';
import feature2 from '../../assets/images/feature2.png';
import feature3 from '../../assets/images/feature3.png';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
         <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
  Welcome
</p>

<h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
  FFP Concept Planning Solutions Corporation — Building Ideas into Reality
</h1>

<p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
  We provide professional engineering, planning, and construction services focused on delivering high-quality design and build solutions. From concept development to project completion, we turn ideas into reliable and sustainable structures.
</p>

            <div className="mt-3 flex ml-55">
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
  Company Overview
</p>
<h2 className="mt-2 text-2xl font-semibold text-zinc-900">
  Our Purpose, Mission & Vision
</h2>
</div>

<div className="grid gap-4 md:grid-cols-3">

  {/* Purpose */}
  <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
    <h3 className="text-lg font-semibold text-zinc-900">
      Our Purpose
    </h3>
    <p className="mt-3 text-sm leading-6 text-zinc-600">
      To be known in the construction industry as a straight forward company that exhibits the correlation of service quality to a client's 
      commitment to the project by providing realistic outputs, concepts or solutions to all 
      kinds of engineering, design problems, and challenges</p>
  </div>

  {/* Mission */}
  <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
    <h3 className="text-lg font-semibold text-zinc-900">
      Our Mission
    </h3>
    <p className="mt-3 text-sm leading-6 text-zinc-600">
      To be a substantial part of nation building by using the construction industry as platform of propagating possibilities
      of employment and encouraging professional development and positive engagement to challenges by executing quality services
      to our valued clients.
    </p>
  </div>

  {/* Vision */}
  <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
    <h3 className="text-lg font-semibold text-zinc-900">
      Our Vision
    </h3>
    <p className="mt-3 text-sm leading-6 text-zinc-600">
      <b>FFP Concept Planning Solutions Corporation</b> is a company that remains grounded in terms of employment attainability and
      providing continuous access on professional pursuit for construction inclined professionals while soaring hign and being a part
      of future methods of constructions by coping with world wide construction revolutions.   </p>
  </div>

</div>
      
      </section>

      {/* Feature Cards */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  <div className="mb-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
      Our Services
    </p>
    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
      What We Offer
    </h2>
  </div>

  <div className="grid gap-4 md:grid-cols-3">
    
    {/* Card 1 */}
    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
      <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] overflow-hidden">
        <img src={feature1} alt="Engineering Design" className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-900">
        Engineering & Design
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Providing detailed engineering, planning, and design solutions tailored for residential, commercial, and industrial projects.
      </p>
      <Button className="mt-4" variant="primary">
        Learn More
      </Button>
    </article>

    {/* Card 2 */}
    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
      <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] overflow-hidden">
        <img src={feature2} alt="Construction Services" className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-900">
        Construction & Development
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Execution of high-quality construction projects including buildings, roads, and infrastructure development.
      </p>
      <Button className="mt-4" variant="primary">
        Learn More
      </Button>
    </article>

    {/* Card 3 */}
    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
      <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] overflow-hidden">
        <img src={feature3} alt="Project Management" className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-900">
        Project Management
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        End-to-end project supervision including scheduling, quality assurance, and efficient project execution.
      </p>
      <Button className="mt-4" variant="primary">
        Learn More
      </Button>
    </article>

  </div>
</section>
    </div>
  );
};

export default HomePage;