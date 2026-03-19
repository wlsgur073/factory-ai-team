"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/lib/icons";
import { categories } from "@/config/solutions";

type CategoryFilterProps = {
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
};

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect(null)}
      >
        전체
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selected === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(category.id)}
          className={cn("gap-1.5")}
        >
          <DynamicIcon name={category.icon} className="h-3.5 w-3.5" />
          {category.name}
        </Button>
      ))}
    </div>
  );
}
