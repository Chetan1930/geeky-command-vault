import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileCheck } from "lucide-react";
import { categories } from "@/data/commands";
import { supabase } from "@/integrations/supabase/client";

interface ParsedCommand {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
}

export const UploadCommandForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const parseMarkdownFile = (content: string): ParsedCommand | null => {
    try {
      // Extract frontmatter (metadata between --- markers)
      const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
      const match = content.match(frontmatterRegex);

      if (!match) {
        throw new Error("Invalid format: Missing frontmatter section (--- metadata ---)");
      }

      const [, frontmatter, markdownContent] = match;
      
      // Parse frontmatter
      const metadata: Record<string, string> = {};
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          metadata[key.trim()] = valueParts.join(':').trim();
        }
      });

      // Validate required fields
      const requiredFields = ['id', 'title', 'description', 'category', 'tags'];
      const missingFields = requiredFields.filter(field => !metadata[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Category validation removed - accepting any category now

      // Parse tags (comma-separated)
      const tags = metadata.tags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0);
      
      if (tags.length === 0) {
        throw new Error("At least one tag is required");
      }

      // Validate ID format (kebab-case)
      const idRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
      if (!idRegex.test(metadata.id)) {
        throw new Error("ID must be in kebab-case format (e.g., 'docker-basics')");
      }

      return {
        id: metadata.id,
        title: metadata.title,
        description: metadata.description,
        category: metadata.category,
        tags,
        content: markdownContent.trim()
      };
    } catch (error) {
      throw error;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.md')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a .md (Markdown) file",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a markdown file to upload",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const content = await file.text();
      const parsedCommand = parseMarkdownFile(content);

      if (parsedCommand) {
        // Save to database
        const { error } = await supabase
          .from('commands')
          .insert({
            command_id: parsedCommand.id,
            title: parsedCommand.title,
            description: parsedCommand.description,
            category: parsedCommand.category,
            tags: parsedCommand.tags,
            content: parsedCommand.content
          });

        if (error) {
          // Check if it's a duplicate error
          if (error.code === '23505') {
            throw new Error(`Command with ID "${parsedCommand.id}" already exists`);
          }
          throw error;
        }
        
        toast({
          title: "✅ Command Uploaded Successfully!",
          description: `"${parsedCommand.title}" has been added to ${parsedCommand.category} category`,
        });

        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        // Refresh the page after a short delay to show the new command
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to parse the file",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSample = () => {
    const link = document.createElement('a');
    link.href = '/sample-command-template.md';
    link.download = 'sample-command-template.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Sample Downloaded",
      description: "Check your downloads folder for the template file",
    });
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Command File
        </CardTitle>
        <CardDescription>
          Upload a markdown file with command documentation. Need help?{" "}
          <button
            onClick={downloadSample}
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Download sample file
          </button>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Input
              id="file-upload"
              type="file"
              accept=".md"
              onChange={handleFileChange}
              className="flex-1"
            />
            <Button
              onClick={handleUpload}
              disabled={!file || isProcessing}
              className="whitespace-nowrap"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              {isProcessing ? "Processing..." : "Ingest File"}
            </Button>
          </div>
          
          {file && (
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
              <strong>Selected file:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-4">
          <p className="font-semibold">Required format:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Frontmatter section with metadata (between --- markers)</li>
            <li>Required fields: id, title, description, category, tags</li>
            <li>ID must be in kebab-case (e.g., docker-basics)</li>
            <li>Category can be any value (new categories accepted)</li>
            <li>Tags should be comma-separated</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
