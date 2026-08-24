import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { profile, education, socials } from "@/data/profile";
import { experience, activities, awards } from "@/data/experience";
import { resumeSkillGroups } from "@/data/skills";
import { getMeta } from "@/lib/content";
import { publicFileExists } from "@/lib/covers";
import { Canvas, Zone } from "@/components/ui/Canvas";

export const metadata = buildMetadata({
  title: "Résumé",
  description: `Résumé for ${profile.name} — ${profile.role}. Backend systems, distributed execution, and applied reinforcement learning.`,
  path: "/resume",
});

/**
 * The scannable document — the single place the facts live.
 *
 * Everything here is generated from `src/data/*` and the work MDX, so it cannot
 * drift from the rest of the site. Projects in particular are derived from the
 * case studies rather than retyped — adding project #5 updates the résumé too.
 *
 * Skills lead, because for a backend role that is the filter a reader applies
 * first, and everything below is the evidence for it.
 *
 * On screen it is a sticky identity rail beside the document. On paper the
 * `@media print` block flattens `.canvas` to a single column and the same
 * markup sets as a one-page document.
 */
export default function ResumePage() {
  const projects = getMeta("work");
  const hasPdf = publicFileExists("/resume.pdf");

  return (
    <Canvas className="pb-16 pt-10 sm:pb-24 sm:pt-16">
      <Zone zone="wide">
        <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-x-14">
          {/* ---- Identity rail ---- */}
          <aside className="resume-rail lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <h1 className="font-display text-[2.2rem] leading-none">{profile.name}</h1>
            <p className="mt-2 text-ink-muted">{profile.role}</p>

            <dl className="mt-6 space-y-3 text-[0.9rem]">
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">
                  Email
                </dt>
                <dd className="mt-0.5 break-all font-mono">{profile.email}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">
                  Location
                </dt>
                <dd className="mt-0.5">{profile.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">
                  Profiles
                </dt>
                <dd className="mt-0.5 space-y-0.5 font-mono text-[0.82rem] text-ink-muted">
                  {socials
                    .filter((social) => social.primary)
                    .map((social) => (
                      <span key={social.label} className="block">
                        {social.label.toLowerCase()}/{social.handle}
                      </span>
                    ))}
                </dd>
              </div>
            </dl>

            <div className="no-print mt-8 space-y-4 border-t border-rule pt-5">
              {/* The short PDF appears on its own once public/resume.pdf exists,
                  so there is never a link here that 404s. The print hint is
                  always shown — it prints this page, which is the long version
                  and always current. */}
              {hasPdf ? (
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-between gap-3 rounded-lg border border-rule-strong px-4 py-3 transition-colors hover:border-accent hover:text-accent"
                >
                  <span>
                    <span className="block text-[0.9rem] font-medium">Short résumé</span>
                    <span className="mt-0.5 block font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-faint">
                      One page · PDF
                    </span>
                  </span>
                  <span aria-hidden className="font-mono text-accent">
                    ↓
                  </span>
                </a>
              ) : null}

              <p className="font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.12em] text-ink-faint">
                Ctrl / ⌘ + P to save this page
              </p>

              <Link href="/work" className="block font-mono text-[0.78rem] text-accent link-draw">
                See the work →
              </Link>
            </div>
          </aside>

          {/* ---- Document ---- */}
          <article className="resume mt-14 max-w-[46rem] lg:mt-0">
            <ResumeSection title="Skills">
              <dl className="space-y-2">
                {resumeSkillGroups.map((group) => (
                  <div key={group.label} className="grid gap-x-4 sm:grid-cols-[9.5rem_1fr]">
                    <dt className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink-faint sm:pt-[0.2rem]">
                      {group.label}
                    </dt>
                    <dd className="text-[0.95rem] leading-relaxed">{group.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </ResumeSection>

            <ResumeSection title="Experience">
              {experience.map((role) => (
                <Entry
                  key={`${role.company}-${role.start}`}
                  title={`${role.title}, ${role.company}`}
                  meta={`${role.start} — ${role.end}`}
                  subtitle={role.location}
                  points={role.points}
                  tags={role.stack}
                />
              ))}
            </ResumeSection>

            <ResumeSection title="Projects">
              {projects.map((project) => (
                <Entry
                  key={project.slug}
                  title={project.title}
                  meta={project.period ?? project.year}
                  points={project.highlights ?? [project.summary]}
                  tags={project.stack}
                />
              ))}
            </ResumeSection>

            <ResumeSection title="Education">
              {education.map((item) => (
                <Entry
                  key={item.institution}
                  title={item.institution}
                  meta={`${item.start} — ${item.end}`}
                  subtitle={`${item.degree} · CGPA ${item.grade.replace("CGPA ", "")}`}
                  detail={item.location}
                />
              ))}
            </ResumeSection>

            <ResumeSection title="Awards">
              {awards.map((award) => (
                <Entry
                  key={award.title}
                  title={award.title}
                  meta={award.date}
                  subtitle={award.detail ?? undefined}
                />
              ))}
            </ResumeSection>

            <ResumeSection title="Activities">
              {activities.map((role) => (
                <Entry
                  key={role.company}
                  title={`${role.title}, ${role.company}`}
                  meta={`${role.start} — ${role.end}`}
                  subtitle={role.location}
                  points={role.points}
                />
              ))}
            </ResumeSection>
          </article>
        </div>
      </Zone>
    </Canvas>
  );
}

/**
 * A section of the document.
 *
 * The separation comes from the margin above, not from a heavy rule — a 2px
 * ink line drew more attention than the content under it. A hairline plus real
 * space reads as structure without competing. The first section takes no rule
 * at all: there is nothing above it to be separated from.
 */
function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mt-12 border-t border-rule pt-4 first:mt-0 first:border-t-0 first:pt-0">
      <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">{title}</h2>
      <div className="mt-5 space-y-6">{children}</div>
    </section>
  );
}

/** One row of the document. Every section uses it, so the rhythm is identical
 *  whether you are reading a job, a project or a degree. */
function Entry({
  title,
  meta,
  subtitle,
  detail,
  points,
  tags,
}: {
  title: string;
  meta?: string;
  subtitle?: string;
  /** Muted third line — location on education rows. */
  detail?: string;
  points?: readonly string[];
  tags?: readonly string[];
}) {
  return (
    <div className="resume-entry">
      {/* `ml-auto` rather than `justify-between`: with a long title the date
          wraps onto its own line, and justify-between then leaves it hanging on
          the left while every other row has it on the right. This keeps it
          right-aligned whether it wraps or not. */}
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-0.5">
        <h3 className="font-semibold leading-snug">{title}</h3>
        {meta ? (
          <span className="ml-auto font-mono text-[0.74rem] text-ink-faint">{meta}</span>
        ) : null}
      </div>

      {subtitle ? (
        <p className="mt-0.5 text-[0.9rem] leading-snug text-ink-muted">{subtitle}</p>
      ) : null}

      {detail ? (
        <p className="mt-0.5 font-mono text-[0.74rem] leading-snug text-ink-faint">{detail}</p>
      ) : null}

      {/* Three bullets, enforced here rather than trusted to the data. A
          fourth is almost always the weakest one, and on a résumé it costs a
          line every reader has to scan past. */}
      {points?.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-ink-faint">
          {points.slice(0, 3).map((point) => (
            <li key={point.slice(0, 24)} className="text-[0.95rem] leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      ) : null}

      {tags?.length ? (
        <p className="mt-2 font-mono text-[0.74rem] text-ink-faint">{tags.join(" · ")}</p>
      ) : null}
    </div>
  );
}
