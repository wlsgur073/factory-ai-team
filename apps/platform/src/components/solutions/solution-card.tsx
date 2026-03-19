import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@nexus/ui";
import { DynamicIcon, getCategoryById } from "@nexus/config";
import type { Solution } from "@nexus/types";

const statusLabel: Record<string, string> = {
  active: "활성",
  beta: "베타",
  "coming-soon": "준비 중",
};

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  active: "default",
  beta: "secondary",
  "coming-soon": "outline",
};

export function SolutionCard({ solution }: { solution: Solution }) {
  const category = getCategoryById(solution.category);

  return (
    <Link href={solution.route}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <DynamicIcon
              name={solution.icon}
              className="h-5 w-5 text-primary"
            />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-base">{solution.name}</CardTitle>
            {category && (
              <p className="text-xs text-muted-foreground">{category.name}</p>
            )}
          </div>
          <Badge variant={statusVariant[solution.status]}>
            {statusLabel[solution.status]}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {solution.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
