/**
 * Work history and awards.
 *
 * CONFIDENTIALITY: the Mastercard entry carries title, company, dates and
 * location only, plus one neutral sentence. No technologies, no metrics, no
 * architecture, no domain. Do not add a `stack` array to it. The hackathon
 * award is title only, with no description.
 */

export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  /** Narrative bullets. Empty for entries under confidentiality. */
  points: string[];
  /** Technologies, omitted where restricted. */
  stack?: string[];
  /** De-emphasised in the timeline (diploma-era work). */
  muted?: boolean;
  /** Slug of a case study that evidences this role, if any. */
  evidence?: string;
};

export const experience: Role[] = [
  {
    company: "Mastercard",
    title: "Software Engineer Intern",
    start: "May 2026",
    end: "Jul 2026",
    location: "Vadodara, India",
    // Locked. This single line is the entire permitted description.
    points: ["Backend infrastructure work covered by confidentiality."],
  },
  {
    company: "Emerging Five",
    title: "Software Engineer Intern",
    start: "Jun 2025",
    end: "Jul 2025",
    location: "Ahmedabad, India",
    points: [
      "Built 25+ secure REST APIs in Spring Boot and PostgreSQL for an enterprise product and category management module.",
      "Implemented stateless JWT authentication across every protected route.",
      "Structured the module on a layered controller–service–repository architecture and shipped the full CRUD interface against it.",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT", "jQuery", "Bootstrap"],
  },
  {
    company: "Saath Charitable Trust",
    title: "Data Analyst Intern",
    start: "May 2025",
    end: "May 2025",
    location: "Ahmedabad, India",
    points: [
      "Built a data analysis platform visualising complex multi-sheet Excel datasets in React and Plotly.js.",
      "Integrated DeepSeek to enable natural-language queries over raw programme data.",
      "Automated PDF and Excel reporting with jsPDF and XLSX.js, cutting manual analysis time 60%.",
    ],
    stack: ["React", "Plotly.js", "DeepSeek", "jsPDF", "XLSX.js"],
  },
  {
    company: "InfoLabz",
    title: "Mobile Application Developer Intern",
    start: "Jul 2023",
    end: "Aug 2023",
    location: "Ahmedabad, India",
    muted: true,
    points: [
      "Built a real-time news application in Flutter with live API integration.",
      "Co-built an Arduino auto-irrigation system, syncing live soil humidity and temperature readings to the app via a hosted database.",
    ],
    stack: ["Flutter", "Dart", "Arduino"],
  },
];

export const activities: Role[] = [
  {
    company: "ACES — Association of Computer Engineering Students",
    title: "Executive Committee Member",
    start: "Jan 2025",
    end: "Dec 2025",
    location: "Nirma University",
    points: [
      "Organised Insignia, a multi-round DSA competition: problem set, round structure and live operations.",
    ],
  },
];

export type Award = {
  title: string;
  detail: string | null;
  /** Month and year, so awards read consistently with every other dated row. */
  date: string;
};

export const awards: Award[] = [
  {
    title: "HACKaMINED 2026 — Winner, CricHeroes Track",
    detail: "National-level hackathon, with team Tensor Titans.",
    date: "Mar 2026",
  },
  {
    // Title only, deliberately. Do not add a description here.
    title: "Mastercard Global Internal Hackathon — Finalist",
    detail: null,
    date: "Jul 2026",
  },
];
