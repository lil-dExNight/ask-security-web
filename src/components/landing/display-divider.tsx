import { Reveal } from "./reveal";

export function DisplayDivider() {
  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-(--dk-line) bg-(--dk-abyss)"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <div>
            <p className="font-mono flex justify-between text-[12px] text-(--dk-mist)">
              <span>fig. 01</span>
              <span>the name</span>
            </p>
            <p className="mt-6 whitespace-nowrap text-[clamp(52px,12.5vw,180px)] font-bold leading-[0.95] tracking-[-0.03em]">
              ASK <span className="text-outline">SECURITY</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
