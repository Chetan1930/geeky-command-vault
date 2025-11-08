import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Send } from "lucide-react";
import { toast } from "sonner";

export const RequestCommandForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technology: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    toast.success("Request submitted! We'll review it soon.");
    setFormData({ title: "", description: "", technology: "" });
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5 text-primary" />
          Request a Command or Guide
        </CardTitle>
        <CardDescription>
          Can't find what you're looking for? Request a new command or guide and we'll add it to our collection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Command/Guide Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Deploy Laravel with Nginx"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="technology">Technology/Stack *</Label>
            <Input
              id="technology"
              placeholder="e.g., Laravel, Nginx, Ubuntu 22.04"
              value={formData.technology}
              onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you need help with..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Submit Request
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
