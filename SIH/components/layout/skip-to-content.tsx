export function SkipToContentLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-accent/30 focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-soft"
    >
      Skip to main content
    </a>
  );
}
