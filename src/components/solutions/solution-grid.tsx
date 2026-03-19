import type { Solution } from "@/types/solution";
import { SolutionCard } from "./solution-card";

export function SolutionGrid({ solutions }: { solutions: Solution[] }) {
  if (solutions.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">
          조건에 맞는 솔루션이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution) => (
        <SolutionCard key={solution.id} solution={solution} />
      ))}
    </div>
  );
}
