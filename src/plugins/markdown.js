import matter from 'gray-matter';
import fs from 'fs';

export default function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    enforce: 'pre',
    
    // Handle .md file loading
    load(id) {
      if (!id.endsWith('.md')) return null;
      
      try {
        // Read file content
        const fileContent = fs.readFileSync(id, 'utf-8');
        const { data: frontmatter, content } = matter(fileContent);
        
        // Return as ES module
        const moduleCode = `
export const frontmatter = ${JSON.stringify(frontmatter)};
export default ${JSON.stringify(content)};
`;
        return moduleCode;
      } catch (error) {
        console.error('Error loading markdown:', id, error);
        return null;
      }
    },
    
    // Handle hot module replacement
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.md')) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    }
  };
}
