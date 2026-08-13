const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

const CONTENT_DIR = path.join(__dirname, '../src/assets/content');
const ROUTES_FILE = path.join(__dirname, '../prerender-routes.txt');

function generateIndexForFolder(folderName) {
  const folderPath = path.join(CONTENT_DIR, folderName);
  
  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));
  const indexData = [];
  const prerenderRoutes = [];

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter
    const parsed = fm(fileContent);
    const slug = file.replace('.md', '');
    
    indexData.push({
      slug,
      title: parsed.attributes.title || slug,
      description: parsed.attributes.description || '',
      date: parsed.attributes.date || '',
      tags: parsed.attributes.tags || [],
      coverImage: parsed.attributes.coverImage || ''
    });

    // Add route for prerendering
    prerenderRoutes.push(`/${folderName}/${slug}`);
  });

  // Sort by date descending
  indexData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Write index.json
  fs.writeFileSync(
    path.join(folderPath, 'index.json'),
    JSON.stringify(indexData, null, 2)
  );

  console.log(`✅ Generated index.json for ${folderName} (${indexData.length} entries)`);
  return prerenderRoutes;
}

// Generate for both folders
const blogRoutes = generateIndexForFolder('blog');
const notasRoutes = generateIndexForFolder('notas');

// Also need the list routes
const staticRoutes = [
  '/',
  '/blog',
  '/notas-tecnicas'
];

const allRoutes = [...staticRoutes, ...blogRoutes, ...notasRoutes];

// Write prerender-routes.txt
fs.writeFileSync(ROUTES_FILE, allRoutes.join('\n'));
console.log(`✅ Generated prerender-routes.txt with ${allRoutes.length} routes.`);
