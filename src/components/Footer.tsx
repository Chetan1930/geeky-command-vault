import { Github, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Built with <Heart className="inline h-4 w-4 text-destructive" /> for developers
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Open source • Community driven • Always free
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rajsolodev/GeekyShowsNotes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>Contribute on GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DevCommands Hub. All commands and guides are provided as-is.
          </p>
        </div>
      </div>
    </footer>
  );
};
