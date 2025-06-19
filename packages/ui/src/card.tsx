import { type JSX } from "react";

export function Card({
  className,
  title,
  children
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </div>
  );
}
