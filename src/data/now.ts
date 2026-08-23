/**
 * /now — what I am actually doing at the moment.
 *
 * Update `updated` whenever this changes. A stale /now page is worse than no
 * /now page, because it is dated in public.
 */

export const now = {
  updated: "2026-08-22",
  intro:
    "Final year of B.Tech CSE at Nirma University. The next stretch is about depth rather than breadth — taking one system further than a portfolio project needs to go, and writing down what breaks on the way.",
  sections: [
    {
      title: "Building",
      accent: "rust" as const,
      items: [
        "Taking Algorithmic Arena past portfolio scope — a distributed worker pool, a durable submission queue, real observability, and benchmarks I can actually publish.",
        "An adversarial submission suite that runs in CI, so the isolation guarantees stay true as the code changes rather than being true once.",
      ],
    },
    {
      title: "Learning",
      accent: "blue" as const,
      items: [
        "Closing the probability and linear algebra gap properly, rather than the just-in-time version I have been getting away with.",
        "Reading about queueing behaviour and backpressure — mostly because building the judge made it obvious how little I knew.",
      ],
    },
    {
      title: "Writing",
      accent: "amber" as const,
      items: [
        "Post-mortems from the drone RL work, one failure mode at a time.",
        "A longer piece on why determinism is a security property in a judge, not a nice-to-have.",
      ],
    },
    {
      title: "Competing",
      accent: "moss" as const,
      items: [
        "Codeforces, steadily. Currently Pupil, and I would like that to say something else by the end of the year.",
      ],
    },
  ],
};
