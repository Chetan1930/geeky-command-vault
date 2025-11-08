# Adding New Commands - Template Guide

## Quick Format

To add a new command/guide to DevCommands Hub, add this object to the `commands` array in `src/data/commands.ts`:

```typescript
{
  id: "unique-id-here",                    // Use kebab-case, e.g., "docker-compose-setup"
  title: "Your Command Title",             // Clear, descriptive title
  description: "Brief description",        // One-line summary (under 100 chars)
  category: "Category Name",               // Must match one from categories array
  tags: ["tag1", "tag2", "tag3"],         // Lowercase, searchable keywords
  content: `# Your Guide Title

## Step/Section 1: Description
\`\`\`bash
your command here
\`\`\`

## Step/Section 2: Description
\`\`\`language
your code here
\`\`\`

Additional explanatory text...`
}
```

## Available Categories

Choose from these existing categories (defined in `src/data/commands.ts`):
- **Deployment** - Deploying applications to servers
- **Database** - Database setup, configuration, management
- **Server Setup** - Server installation and configuration
- **Security** - Security configurations, SSL, firewalls
- **Tools** - Development tools installation
- **Configuration** - System and application configuration

*Want a new category? Add it to the `categories` array first!*

## Example: Adding a Docker Command

```typescript
{
  id: "docker-compose-basic",
  title: "Docker Compose Setup",
  description: "Create and run multi-container Docker applications",
  category: "Tools",
  tags: ["docker", "compose", "container", "devops"],
  content: `# Docker Compose Setup

## Step 1: Install Docker Compose
\`\`\`bash
sudo apt update
sudo apt install docker-compose
\`\`\`

## Step 2: Create docker-compose.yml
\`\`\`yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
\`\`\`

## Step 3: Run Compose
\`\`\`bash
docker-compose up -d
\`\`\``
}
```

## Tips

1. **ID**: Use descriptive kebab-case (all lowercase with hyphens)
2. **Tags**: Include technology names, use cases, and related terms
3. **Content**: Use markdown with proper code blocks and language identifiers
4. **Code Blocks**: Specify language (bash, sql, python, yaml, etc.) for syntax highlighting
5. **Steps**: Number steps clearly for easy following

## Common Code Block Languages

- `bash` - Shell commands
- `sql` - SQL queries
- `python` - Python code
- `javascript` / `typescript` - JS/TS code
- `yaml` - YAML config files
- `json` - JSON data
- `nginx` / `apache` - Web server configs
- `dockerfile` - Docker files

## Need Help?

Just paste your command/guide in this format and I'll add it for you!
