import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  commandCount: number;
}

export const Hero = ({ searchQuery, onSearchChange, commandCount }: HeroProps) => {
  return (
    <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-card">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            {commandCount}+ Developer Commands & Resources
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl animate-slide-up">
            Your Ultimate
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Developer Resource Hub
            </span>
          </h1>
          
          <p className="mb-10 text-lg text-muted-foreground md:text-xl animate-slide-up">
            Quick access to deployment guides, database setup, server configuration, and essential developer commands.
          </p>
          
          <div className="relative mx-auto max-w-2xl animate-slide-up">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search commands, guides, or technologies..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-14 pl-12 pr-4 text-base bg-card border-border shadow-lg focus:shadow-glow transition-shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


