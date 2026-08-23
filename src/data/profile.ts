/**
 * Single source of truth for biographical facts.
 *
 * Nothing here may be duplicated in a page or component. If a number appears on
 * screen, it is read from this file. Resume wins over LinkedIn on conflicts.
 */

/** Deployment origin. Domain is deferred; changing this one constant is all a
 *  custom domain needs (metadata, sitemap, RSS and OG images all read it). */
export const siteUrl = "https://parthparmar.vercel.app";

export const profile = {
  name: "Parth Parmar",
  firstName: "Parth",
  /** Used as the <title> suffix and in structured data. */
  role: "Backend & Systems Engineer",
  /** The positioning line. One sentence, used in metadata and the hero. */
  tagline: "Backend and systems engineer who also builds AI.",
  location: "Ahmedabad, Gujarat, India",
  email: "parthbparmar2006@gmail.com",
  pronouns: "he/him",

  /** Short bio — cards, OG images, footer. */
  bioShort:
    "Computer science undergraduate at Nirma University building backend systems with real constraints — sandboxed execution, concurrency, and control under partial observability.",

  /** Longer bio — the narrative section on the home page. Kept free of any
   *  Mastercard specifics. */
  bioLong: [
    "I build backend systems where the hard part is the algorithm, not the CRUD. An online judge that runs untrusted code inside resource-capped containers. A reinforcement-learning controller that has to fly a quadcopter through a 3D environment it can only partially observe. A cricket metric that weights a performance by the pressure it was made under.",
    "The common thread is algorithmic depth applied inside a real system — the part where a clean idea meets isolation boundaries, latency budgets, and inputs that do not cooperate.",
    "I got here sideways: a GTU diploma in IT, then lateral entry into B.Tech CSE at Nirma University. That route means four years of writing code before most of my cohort started, and it shows up in how I debug.",
  ],
} as const;

export const education = [
  {
    institution: "Nirma University",
    location: "Ahmedabad, India",
    degree: "B.Tech in Computer Science and Engineering",
    grade: "CGPA 9.49",
    start: "Jun 2024",
    end: "Jun 2027",
    note: "Lateral entry from a GTU diploma. Coursework includes reinforcement learning and federated learning.",
  },
  {
    institution: "Government Polytechnic (GTU)",
    location: "Ahmedabad, India",
    degree: "Diploma in Information Technology",
    grade: "CGPA 9.63",
    start: "Jul 2021",
    end: "May 2024",
    note: null,
  },
] as const;

/** Headline numbers. Every one of these is defensible and conservative. */
export const stats = [
  { value: 9.49, suffix: "", label: "CGPA", detail: "B.Tech CSE, Nirma University" },
  { value: 1700, suffix: "+", label: "LeetCode", detail: "problem solving under time limits" },
  { value: 1315, suffix: "+", label: "Codeforces", detail: "Pupil, and still climbing" },
  { value: 4, suffix: "", label: "Internships", detail: "Mastercard, Emerging Five, Saath, InfoLabz" },
] as const;

export const socials = [
  {
    label: "GitHub",
    handle: "parthparmar-2006",
    href: "https://github.com/parthparmar-2006",
    primary: true,
  },
  {
    label: "LinkedIn",
    handle: "parthparmar06",
    href: "https://linkedin.com/in/parthparmar06",
    primary: true,
  },
  {
    label: "LeetCode",
    handle: "parthparmar_06",
    href: "https://leetcode.com/parthparmar_06",
    primary: true,
  },
  {
    label: "Codeforces",
    handle: "parth-parmar",
    href: "https://codeforces.com/profile/parth-parmar",
    primary: true,
  },
  {
    label: "X",
    handle: "@ParthParmar2006",
    href: "https://x.com/ParthParmar2006",
    primary: false,
  },
] as const;

/** Competitive-programming standing, shown on /links. */
export const competitive = {
  codeforces: "Pupil (1315+)",
  leetcode: "1700+",
} as const;

export type Social = (typeof socials)[number];
export type Education = (typeof education)[number];
export type Stat = (typeof stats)[number];
