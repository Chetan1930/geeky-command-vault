import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { CommandCard } from "@/components/CommandCard";

import { UploadCommandForm } from "@/components/UploadCommandForm";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch commands from database
  const { data: commands = [], isLoading } = useQuery({
    queryKey: ['commands'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('commands')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform database data to match Command interface
      return data.map(cmd => ({
        id: cmd.command_id,
        title: cmd.title,
        description: cmd.description,
        category: cmd.category,
        tags: cmd.tags,
        content: cmd.content
      }));
    }
  });

  // Generate dynamic categories from commands
  const categories = useMemo(() => {
    if (!commands || commands.length === 0) {
      return ["All"];
    }
    const uniqueCategories = new Set(commands.map(cmd => cmd.category));
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [commands]);

  const filteredCommands = useMemo(() => {
    return commands.filter((command) => {
      const matchesSearch =
        searchQuery === "" ||
        command.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        command.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        command.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        command.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || command.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, commands]);

  return (
    <div className="min-h-screen bg-background">
      <Header commandCount={commands.length} />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} commandCount={commands.length} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="container mx-auto px-4 py-12">
        {/* Commands Grid */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredCommands.length} {filteredCommands.length === 1 ? "Result" : "Results"}
              {searchQuery && ` for "${searchQuery}"`}
            </h2>
            <p className="text-muted-foreground mt-1">
              {selectedCategory !== "All" && `Filtered by ${selectedCategory}`}
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Loading commands...</p>
            </div>
          ) : filteredCommands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No commands found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try a different search term or category
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCommands.map((command) => (
                <CommandCard key={command.id} command={command} />
              ))}
            </div>
          )}
        </section>

        {/* Upload Form */}
        <section className="max-w-2xl mx-auto mb-12">
          <UploadCommandForm />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
