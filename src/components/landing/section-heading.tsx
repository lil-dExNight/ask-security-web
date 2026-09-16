import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div>
      <Reveal>
        <p className="pd-mono flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-(--dk-acid)">
          <span className="inline-block h-px w-8 bg-(--dk-acid)/60" />
          {`// ${index} — ${eyebrow}`}
        </p>
      </Reveal>
      <div className="mt-5 flex flex-col gap-6 border-b border-(--dk-line) pb-8 md:flex-row md:items-end md:justify-between">
        <Reveal delay={0.08}>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance text-(--dk-ink) sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.16}>
            <p className="max-w-md text-base leading-relaxed text-(--dk-mist)">{description}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
