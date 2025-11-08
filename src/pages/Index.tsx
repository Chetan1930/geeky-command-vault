import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { CommandCard } from "@/components/CommandCard";
import { RequestCommandForm } from "@/components/RequestCommandForm";
import { Footer } from "@/components/Footer";
import { commands } from "@/data/commands";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryFilter
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

          {filteredCommands.length === 0 ? (
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

        {/* Request Form */}
        <section className="max-w-2xl mx-auto">
          <RequestCommandForm />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
