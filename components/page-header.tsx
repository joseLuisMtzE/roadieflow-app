type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="space-y-2 px-[var(--spacing-margin-mobile)] pt-8">
      <h1 className="text-headline-mobile editorial-offset tracking-tight">
        {title}
      </h1>
      {description ? (
        <p className="text-body-md editorial-offset text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
