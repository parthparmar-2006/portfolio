/**
 * Everything I work with, grouped by what it is for.
 *
 * This replaced the old `/uses` page. A tools list is easy to pad and hard to
 * trust, so every entry carries a one-line note saying what it is actually for
 * here. The note is the honesty mechanism: if something is coursework rather
 * than shipped, the line says so, and nothing is listed that has no line.
 *
 * Deliberately no proficiency bars, star ratings or "expert/intermediate"
 * labels. Those are self-assessed and mean nothing to a reader.
 */

export type StackItem = {
  name: string;
  /** What it is for, in this person's work. Keep it to one clause. */
  note: string;
};

export type StackGroup = {
  title: string;
  blurb: string;
  accent: "rust" | "blue" | "moss" | "amber";
  items: StackItem[];
};

export const stack: StackGroup[] = [
  {
    title: "Languages",
    blurb: "What I reach for, and why each one is still on the list.",
    accent: "rust",
    items: [
      { name: "C++", note: "Competitive programming. Fast to write once the patterns are in your hands." },
      { name: "Java", note: "Backend services. Spring Boot is verbose and I would still pick it for an API." },
      { name: "Python", note: "Anything with data or a model in it — the drone agent, the cricket metric." },
      { name: "TypeScript", note: "Frontend and Node services. Worth it for refactor safety alone." },
      { name: "JavaScript", note: "Where a build step would cost more than it returns." },
      { name: "Go", note: "Learning it for concurrent services — the model is the appeal, not the syntax." },
      { name: "SQL", note: "Schema design and the queries behind every backend I have shipped." },
    ],
  },
  {
    title: "Backend",
    blurb: "The layer I care most about getting right.",
    accent: "blue",
    items: [
      { name: "Spring Boot", note: "25+ REST APIs at Emerging Five, and the online judge." },
      { name: "REST API design", note: "Resource modelling, status codes that mean something, versioning." },
      { name: "JWT / auth", note: "Stateless authentication across protected routes." },
      { name: "Node.js · Express", note: "The serverless API behind the analysis tool." },
      { name: "Spring Security", note: "Filter chains and role-based access, rather than hand-rolled checks." },
    ],
  },
  {
    title: "Data & machine learning",
    blurb: "Used in anger on the drone controller and the cricket metric.",
    accent: "moss",
    items: [
      { name: "PyTorch", note: "The RDDPG agent — actor, critic, CNN encoder and GRU." },
      { name: "scikit-learn", note: "The win-probability model behind the impact metric." },
      { name: "TensorFlow", note: "Earlier deep learning coursework, before I moved to PyTorch." },
      { name: "Gymnasium", note: "The custom environment wrapping Unreal Engine via Colosseum." },
      { name: "pandas · NumPy", note: "Ball-by-ball cricket data, and every analysis before it." },
      { name: "Plotly · Matplotlib", note: "Charts that end up in a dashboard or a report." },
    ],
  },
  {
    title: "Big data",
    blurb: "The distributed side — where the interesting problems are next.",
    accent: "amber",
    items: [
      { name: "Kafka", note: "Event streaming and log-structured pipelines." },
      { name: "Spark", note: "Distributed processing when the dataset stops fitting in memory." },
      { name: "Hadoop · HDFS", note: "The storage and MapReduce model everything else reacted to." },
      { name: "Hive", note: "SQL over data that is far too large for a database to hold." },
    ],
  },
  {
    title: "Databases",
    blurb: "Chosen deliberately, not by habit.",
    accent: "rust",
    items: [
      { name: "PostgreSQL", note: "Default. I reach for something else only with a reason." },
      { name: "MySQL", note: "Coursework and earlier projects." },
      { name: "MongoDB", note: "When the shape of the document really is the unit of work." },
      { name: "Redis", note: "Caching and ephemeral state that does not deserve a table." },
    ],
  },
  {
    title: "Infrastructure & cloud",
    blurb: "Enough to ship and run the thing, not just build it.",
    accent: "blue",
    items: [
      { name: "Docker", note: "The isolation boundary in the judge, and the reason it is safe to run." },
      { name: "AWS", note: "Compute, storage and the managed services around them." },
      { name: "Git", note: "CLI only. GUIs hide exactly the state I need to see." },
      { name: "Vercel", note: "This site. Zero-config for a Next.js app is the right trade here." },
      { name: "GitHub Actions", note: "CI on the analysis tool — typecheck and tests before merge." },
    ],
  },
  {
    title: "Frontend",
    blurb: "Enough to build the interface a backend needs to be useful.",
    accent: "moss",
    items: [
      { name: "React", note: "The analysis tool, the Saath dashboard, most things with a screen." },
      { name: "Next.js", note: "App Router and server components. This site is built on it." },
      { name: "Tailwind CSS", note: "Design tokens in one file rather than a stylesheet per component." },
      { name: "Unreal Engine", note: "Not frontend, but the rendering environment the drone trains in." },
    ],
  },
  {
    title: "Editor & environment",
    blurb: "The boring layer that decides how fast everything else goes.",
    accent: "amber",
    items: [
      { name: "VS Code", note: "Default for everything. Vim keybindings, no theme worth mentioning." },
      { name: "IntelliJ IDEA", note: "For Spring Boot specifically — the refactoring tools earn it." },
      { name: "Windows Terminal + WSL", note: "Linux where it matters, Windows for everything else." },
      { name: "Notebook, paper", note: "Every non-trivial design starts here. Nothing digital has replaced it." },
    ],
  },
];
