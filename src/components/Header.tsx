import { Code2, Terminal } from "lucide-react";

interface HeaderProps {
  commandCount?: number;
}

export const Header = ({ commandCount = 0 }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Terminal className="h-8 w-8 text-primary" />
              <Code2 className="absolute -right-1 -top-1 h-4 w-4 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                DevCommands <span className="text-primary">Hub</span>
              </h1>
              <p className="text-xs text-muted-foreground">All resources for developers</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-card border border-border">
              {commandCount}+ Commands
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
