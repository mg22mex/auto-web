import { cn } from "@/lib/cn";

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  /** Full headline text */
  text: string;
  /** Exactly one high-impact word to paint Azul Autosell */
  highlight: string;
  className?: string;
};

/**
 * Brand rule: exactly one blue word per major heading.
 */
export function Heading({
  as: Tag = "h2",
  text,
  highlight,
  className,
}: HeadingProps) {
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());

  if (idx === -1) {
    return (
      <Tag className={cn("font-extrabold tracking-tight text-white", className)}>
        {text}
      </Tag>
    );
  }

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + highlight.length);
  const after = text.slice(idx + highlight.length);

  return (
    <Tag className={cn("font-extrabold tracking-tight text-white", className)}>
      {before}
      <span className="text-brand-accent">{match}</span>
      {after}
    </Tag>
  );
}
