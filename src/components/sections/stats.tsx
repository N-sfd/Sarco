import { stats } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

export function Stats() {
  return (
    <section className="relative z-10 mx-auto -mb-14 max-w-6xl translate-y-14 px-5 sm:px-6 lg:px-12">
      <StaggerGroup className="grid grid-cols-2 gap-4 rounded-[2rem] border border-navy/8 bg-white p-6 shadow-lift sm:p-8 lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-royal/12 to-navy/8 text-royal">
                <s.icon className="h-6 w-6" />
              </span>
              <span className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
              </span>
              <span className="text-sm font-medium text-ink/55">{s.label}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
