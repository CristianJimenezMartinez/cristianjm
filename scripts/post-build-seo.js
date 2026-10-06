/**
 * Post-build SEO and Canonical Normalizer for cristianjm.com
 * Ensures that every pre-rendered static HTML page has:
 *  1. An exact, unique <link rel="canonical" href="..."> pointing to its own canonical route.
 *  2. An exact <meta property="og:url" content="...">.
 *  3. Injected JSON-LD BreadcrumbList structured data for rich snippet search results.
 */

const fs = require('fs');
const path = require('path');

const DIST_BROWSER = path.resolve(__dirname, '../dist/cristian-jimenez/browser');
const BASE_URL = 'https://cristianjm.com';

if (!fs.existsSync(DIST_BROWSER)) {
  console.error(`[post-build-seo] Dist directory not found at: ${DIST_BROWSER}`);
  process.exit(1);
}

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file === 'index.html') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(DIST_BROWSER);
console.log(`[post-build-seo] Found ${htmlFiles.length} pre-rendered HTML files to process.`);

let processedCount = 0;

for (const filePath of htmlFiles) {
  const relativeDir = path.relative(DIST_BROWSER, path.dirname(filePath)).replace(/\\/g, '/');
  const route = relativeDir === '' ? '/' : `/${relativeDir}`;
  const canonicalUrl = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}`;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Normalize Canonical Link
  const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i;
  const newCanonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
  if (canonicalRegex.test(content)) {
    content = content.replace(canonicalRegex, newCanonicalTag);
  } else {
    content = content.replace('</head>', `  ${newCanonicalTag}\n</head>`);
  }

  // 2. Normalize og:url
  const ogUrlRegex = /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i;
  const newOgUrlTag = `<meta property="og:url" content="${canonicalUrl}">`;
  if (ogUrlRegex.test(content)) {
    content = content.replace(ogUrlRegex, newOgUrlTag);
  } else {
    content = content.replace('</head>', `  ${newOgUrlTag}\n</head>`);
  }

  // 3. Inject BreadcrumbList JSON-LD if not present
  if (!content.includes('"@type": "BreadcrumbList"')) {
    let breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": `${BASE_URL}/`
      }
    ];

    if (route.startsWith('/proyectos/')) {
      const slug = route.replace('/proyectos/', '');
      const projectName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Proyectos",
        "item": `${BASE_URL}/#proyectos`
      });
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 3,
        "name": projectName,
        "item": canonicalUrl
      });
    } else if (route.startsWith('/servicios/')) {
      const serviceSlug = route.replace('/servicios/', '');
      const serviceName = serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Servicios",
        "item": `${BASE_URL}/#servicios`
      });
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 3,
        "name": serviceName,
        "item": canonicalUrl
      });
    } else if (route === '/sobre-mi') {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Sobre Mí",
        "item": canonicalUrl
      });
    }

    if (breadcrumbItems.length > 1) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      };
      const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(breadcrumbSchema, null, 2)}\n  </script>`;
      content = content.replace('</head>', `${schemaScript}\n</head>`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  processedCount++;
  console.log(`  ✓ [SEO OK] ${route} -> ${canonicalUrl}`);
}

console.log(`[post-build-seo] Successfully normalized ${processedCount} static HTML pages.`);
