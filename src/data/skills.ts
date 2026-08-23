/**
 * Skills as a résumé lists them: concrete nouns, grouped by kind.
 *
 * No self-assessed labels, no ratings, no catch-all bucket. Every entry is
 * something a job description can name and a reader can verify against the
 * experience and projects below it. Tools that only appear in one place —
 * Flutter, jQuery, Bootstrap — are left to that role's stack line rather than
 * padding this list.
 */
export type ResumeSkillGroup = { label: string; items: string[] };

export const resumeSkillGroups: ResumeSkillGroup[] = [
  { label: "Languages", items: ["Java", "C++", "Python", "TypeScript", "JavaScript", "SQL"] },
  {
    label: "Backend",
    items: ["Spring Boot", "REST APIs", "JWT authentication", "Node.js", "Express"],
  },
  {
    label: "Machine learning",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "Gymnasium", "RDDPG", "CNN", "GRU", "Prioritised Experience Replay"],
  },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { label: "Data", items: ["NumPy", "Pandas", "Plotly.js"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Tools", items: ["Docker", "Git", "Unreal Engine", "Colosseum"] },
];
