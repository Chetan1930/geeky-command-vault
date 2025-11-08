import { useState } from "react";
import { Command } from "@/data/commands";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface CommandCardProps {
  command: Command;
}

export const CommandCard = ({ command }: CommandCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command.content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="group h-full transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {command.title}
            </CardTitle>
            <CardDescription className="mt-2">{command.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {command.category}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {command.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1">
                View Guide
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{command.title}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="ml-4"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="ml-2">{copied ? "Copied!" : "Copy All"}</span>
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      code: ({ node, inline, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline ? (
                          <div className="relative group">
                            <pre className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                navigator.clipboard.writeText(String(children));
                                toast.success("Code copied!");
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm border border-code-border" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {command.content}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
