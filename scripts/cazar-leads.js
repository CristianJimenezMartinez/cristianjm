#!/usr/bin/env node
/**
 * ============================================================================
 * CristianJM — Motor Profesional de Prospección y Cribado B2B por Zonas
 * ============================================================================
 * Uso por Zona y Sector (Búsqueda Automática + Auditoría + Dossiers):
 *   node scripts/cazar-leads.js --zona "Alicante" --sector "suministros industriales"
 *   node scripts/cazar-leads.js --zona "Elche" --sector "distribuciones"
 *   node scripts/cazar-leads.js --zona "Valencia" --sector "ferreteria industrial"
 *   node scripts/cazar-leads.js --zona "Alicante" --sector "mantenimiento informatico" --modo partner
 *
 * Uso con lista directa de dominios:
 *   node scripts/cazar-leads.js --dominios "empresa1.es,empresa2.com,empresa3.es"
 * ============================================================================
 */

const https = require('https');
const http = require('http');
const tls = require('tls');
const crypto = require('crypto');
const dns = require('dns').promises;
const fs = require('fs');
const path = require('path');

const BLOCKED_DOMAINS = [
  'google.', 'bing.', 'duckduckgo.', 'yahoo.', 'yandex.', 'msn.com', 'microsoft.com',
  'paginasamarillas.es', 'empresite.eleconomista.es', 'einforma.com', 'infocif.es',
  'axesor.es', 'iberinform.es', 'expansion.com', 'cincodias.elpais.com', 'datoscif.es',
  'linkedin.com', 'facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'youtube.com', 'tiktok.com',
  'amazon.', 'ebay.', 'aliexpress.', 'wallapop.', 'milanuncios.com', 'leroymerlin.', 'bricomart.', 'obramat.',
  'infojobs.net', 'indeed.com', 'glassdoor.', 'habitissimo.es', 'cronoshare.com', 'Milanuncios.',
  'wikipedia.org', 'boe.es', 'agenciatributaria.', 'seg-social.', 'gva.es', 'ayto-', 'diputacion',
  'tripadvisor.', 'trustpilot.', 'yelp.', 'foursquare.', 'cylex.', 'hotfrog.', 'europages.',
  'kompass.com', 'vulka.es', 'guias11811.es', '11870.com', 'qdq.com', 'citiservi.es', 'empresite.',
  'cristianjm.com', 'w3.org', 'schema.org', 'cloudflare.com', 'wordpress.org', 'wordpress.com',
  'claude.ai', 'openai.com', 'informa.es', 'definicion.de', 'rae.es', 'gestorias.es', 'engranollers.com',
  'ufd.es', 'edistribucion.com', 'naturgy.', 'endesa.', 'iberdrola.'
];

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    zona: 'Alicante',
    sector: 'suministros industriales',
    modo: 'cliente', // 'cliente' | 'partner'
    dominios: [],
    limit: 12
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--zona' && args[i + 1]) config.zona = args[++i];
    else if (arg === '--sector' && args[i + 1]) config.sector = args[++i];
    else if (arg === '--modo' && args[i + 1]) config.modo = args[++i].toLowerCase();
    else if (arg === '--limit' && args[i + 1]) config.limit = parseInt(args[++i], 10) || 12;
    else if (arg === '--dominios' && args[i + 1]) {
      config.dominios = args[++i].split(',').map((d) => cleanDomain(d)).filter(Boolean);
    }
  }
  return config;
}

function cleanDomain(input) {
  if (!input) return null;
  let d = input.trim().toLowerCase().replace(/^https?:\/\//i, '').split('/')[0].split('?')[0].split('#')[0].replace(/:\d+$/, '');
  d = d.replace(/^www\./, '');
  if (!d || d.length < 4 || !d.includes('.')) return null;
  if (BLOCKED_DOMAINS.some((b) => d === b || d.includes(b))) return null;
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,16}$/i.test(d)) return null;
  return d;
}

function fetchUrl(urlStr, timeoutMs = 6500, redirectsLeft = 3) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(urlStr);
    } catch (e) {
      return reject(e);
    }
    const isHttps = parsed.protocol === 'https:';
    const client = isHttps ? https : http;
    const start = Date.now();

    const req = client.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: isHttps ? 443 : 80,
        path: parsed.pathname + parsed.search,
        method: 'GET',
        timeout: timeoutMs,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
        }
      },
      (res) => {
        const ttfbMs = Math.max(1, Date.now() - start);
        let tlsProtocol = null;
        let sslDaysRemaining = null;

        if (isHttps && res.socket instanceof tls.TLSSocket) {
          tlsProtocol = res.socket.getProtocol() || null;
          try {
            const cert = res.socket.getPeerCertificate();
            if (cert && cert.valid_to) {
              sslDaysRemaining = Math.floor((new Date(cert.valid_to).getTime() - Date.now()) / 86400000);
            }
          } catch {}
        }

        const status = res.statusCode || 0;
        if (status >= 300 && status < 400 && res.headers.location && redirectsLeft > 0) {
          res.destroy();
          try {
            const nextUrl = new URL(res.headers.location, urlStr).toString();
            fetchUrl(nextUrl, timeoutMs, redirectsLeft - 1).then(resolve).catch(reject);
            return;
          } catch {}
        }

        const chunks = [];
        let totalBytes = 0;
        const maxBytes = 240 * 1024;

        res.on('data', (chunk) => {
          totalBytes += chunk.length;
          if (totalBytes <= maxBytes) chunks.push(chunk);
          else res.destroy();
        });

        const finish = () => {
          const body = Buffer.concat(chunks).toString('utf8');
          resolve({
            finalUrl: urlStr,
            statusCode: status,
            headers: res.headers,
            ttfbMs,
            tlsProtocol,
            sslDaysRemaining,
            body
          });
        };

        res.on('end', finish);
        res.on('close', finish);
        res.on('error', () => finish());
      }
    );

    req.on('timeout', () => req.destroy(new Error('Timeout')));
    req.on('error', reject);
    req.end();
  });
}

async function discoverDomainsByZoneAndSector(zona, sector, limit) {
  const queries = [
    `${sector} ${zona} contacto`,
    `${sector} ${zona} S.L.`,
    `empresas de ${sector} en ${zona}`
  ];

  const found = new Set();

  for (const q of queries) {
    if (found.size >= limit) break;

    // Motor 1: Bing HTML Search
    try {
      const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(q)}&setlang=es-ES&cc=ES`;
      const res = await fetchUrl(bingUrl, 7000, 2);
      const html = res.body || '';
      for (const m of html.matchAll(/<a[^>]+href=["'](https?:\/\/[^"']+)["']/gi)) {
        const dom = cleanDomain(m[1]);
        if (dom) found.add(dom);
        if (found.size >= limit) break;
      }
      for (const m of html.matchAll(/<cite[^>]*>(?:https?:\/\/)?([a-z0-9.-]+\.[a-z]{2,10})/gi)) {
        const dom = cleanDomain(m[1]);
        if (dom) found.add(dom);
        if (found.size >= limit) break;
      }
    } catch {}

    if (found.size >= limit) break;

    // Motor 2: DuckDuckGo HTML Fallback
    try {
      const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}&kl=es-es`;
      const res = await fetchUrl(ddgUrl, 7000, 2);
      const html = res.body || '';
      for (const m of html.matchAll(/uddg=([^&"'>]+)/g)) {
        try {
          const dom = cleanDomain(decodeURIComponent(m[1]));
          if (dom) found.add(dom);
        } catch {}
        if (found.size >= limit) break;
      }
    } catch {}
  }

  return Array.from(found).slice(0, limit);
}

function extractContactsAndLegal(htmlText) {
  const cleanText = htmlText
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ');

  // 1. Emails
  const emailSet = new Set();
  for (const m of htmlText.matchAll(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12})/gi)) {
    emailSet.add(m[1].toLowerCase());
  }
  for (const m of cleanText.matchAll(/\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12})\b/g)) {
    const em = m[1].toLowerCase();
    if (!/\.(png|jpg|jpeg|webp|svg|gif|css|js|woff|ttf)$/i.test(em) && !em.includes('sentry') && !em.includes('example')) {
      emailSet.add(em);
    }
  }

  const emails = Array.from(emailSet).sort((a, b) => {
    const scoreEmail = (e) => {
      if (/^(gerencia|direccion|administracion|ceo|compras|ventas)/.test(e)) return 1;
      if (!/^(info|contacto|contact|admin|web|hola|clientes|atencion)/.test(e)) return 2;
      return 3;
    };
    return scoreEmail(a) - scoreEmail(b);
  });

  // 2. Phones (Spanish mobile 6xx/7xx and landline 9xx/8xx)
  const mobiles = new Set();
  const landlines = new Set();

  for (const m of htmlText.matchAll(/href=["']tel:([^"']+)["']/gi)) {
    const digits = m[1].replace(/\D/g, '').replace(/^34/, '');
    if (/^[67]\d{8}$/.test(digits)) mobiles.add(formatPhone(digits));
    else if (/^[89]\d{8}$/.test(digits)) landlines.add(formatPhone(digits));
  }

  const phoneRegex = /(?:\+34[\s.-]?)?\b([6789]\d{2}[\s.-]?\d{2,3}[\s.-]?\d{2,3}(?:[\s.-]?\d{2})?)\b/g;
  for (const m of cleanText.matchAll(phoneRegex)) {
    const digits = m[1].replace(/\D/g, '');
    if (digits.length === 9) {
      if (/^[67]/.test(digits)) mobiles.add(formatPhone(digits));
      else if (/^[89]/.test(digits)) landlines.add(formatPhone(digits));
    }
  }

  // 3. CIF / NIF Empresarial
  let cif = null;
  const cifMatch = cleanText.match(/\b([ABJUV][-\s]?\d{8})\b/);
  if (cifMatch) cif = cifMatch[1].replace(/[-\s]+/g, '');

  // 4. Razón Social
  let razonSocial = null;
  const rsMatch = cleanText.match(/\b([A-ZÁÉÍÓÚÑ][A-Za-záéíóúñÁÉÍÓÚÑ0-9\s,&.-]{2,45}?\s(?:S\.L\.U\.|S\.L\.|S\.A\.|S\.L\.L\.|SLU|SL|SA))\b/);
  if (rsMatch) {
    razonSocial = rsMatch[1]
      .replace(/^(?:Somos|Bienvenido a|Sobre|Empresa|Ferretería en [A-Za-zÁÉÍÓÚáéíóúñÑ]+\s+)/i, '')
      .trim()
      .replace(/\s{2,}/g, ' ');
  }

  return {
    emails: emails.slice(0, 4),
    mobiles: Array.from(mobiles).slice(0, 3),
    landlines: Array.from(landlines).slice(0, 3),
    cif,
    razonSocial
  };
}

function formatPhone(digits9) {
  return `${digits9.slice(0, 3)} ${digits9.slice(3, 6)} ${digits9.slice(6, 9)}`;
}

function detectTechStack(html, headers) {
  const stack = [];
  const lower = html.toLowerCase();
  const powered = String(headers['x-powered-by'] || '');
  const srv = String(headers['server'] || '');

  if (lower.includes('woocommerce') || lower.includes('wc-ajax')) stack.push('WooCommerce');
  if (lower.includes('prestashop') || lower.includes('modules/ps_')) stack.push('PrestaShop');
  if (lower.includes('shopify')) stack.push('Shopify');
  if (lower.includes('wp-content') || lower.includes('wp-includes')) stack.push('WordPress');
  if (lower.includes('ng-version') || lower.includes('app-root')) stack.push('Angular');
  if (lower.includes('__next') || lower.includes('_next/static')) stack.push('Next.js/React');
  if (lower.includes('kit digital') || lower.includes('nextgenerationeu')) stack.push('Kit Digital');
  if (powered) stack.push(powered);
  if (srv) stack.push(`Server:${srv}`);

  return stack.length ? stack : ['Web Corporativa'];
}

function findInternalLinks(html, baseUrl) {
  const contactUrls = new Set();
  const legalUrls = new Set();

  for (const m of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
    const href = m[1].trim();
    if (/^(mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      const resolved = new URL(href, baseUrl);
      if (resolved.hostname.replace(/^www\./, '') !== new URL(baseUrl).hostname.replace(/^www\./, '')) continue;
      const p = resolved.pathname.toLowerCase();
      if (/(contacto|contactar|contact|donde-estamos)/.test(p)) contactUrls.add(resolved.toString());
      if (/(aviso-legal|legal|privacidad|privacy|condiciones|terminos)/.test(p)) legalUrls.add(resolved.toString());
    } catch {}
  }

  return {
    contactUrl: Array.from(contactUrls)[0] || null,
    legalUrl: Array.from(legalUrls)[0] || null
  };
}

function writeIndividualDossier(dossierDir, item) {
  if (!fs.existsSync(dossierDir)) fs.mkdirSync(dossierDir, { recursive: true });
  const filePath = path.join(dossierDir, `dossier-${item.domain}.md`);
  const md = `# Diagnóstico Técnico de Seguridad, Servidor, Correo y Rendimiento Web
**Empresa:** ${item.companyDisplayName} (\`${item.domain}\`)
**Fecha:** ${new Date().toLocaleDateString('es-ES')}
**Auditor:** Cristian Jiménez Martínez — Arquitecto de Software, Ciberseguridad & ERP ([cristianjm.com](https://cristianjm.com))

---

## 1. Radiografía Real del Servidor, Red y Correo Corporativo
* **Puntuación de Seguridad Perimetral:** **${item.score} / 100** (Nivel de Exposición: **${item.risk}**)
* **Servidor Físico / Hosting Detectado:** \`${item.serverHost}\` (IP: \`${item.ip}\`)
* **Tiempo de Respuesta del Servidor (TTFB):** \`${item.ttfbMs} ms\` ${item.ttfbMs > 600 ? '(Lento — penaliza posicionamiento SEO y experiencia de compra)' : '(Correcto)'}
* **Pasarela de Correo (\`MX\`):** \`${item.mx}\`
* **Blindaje Anti-Suplantación de Facturas (\`DMARC\`):** **${item.dmarcStatus}**
* **Tecnologías Detectadas:** \`${item.stack.join(' · ')}\`
${item.wpExposedAdmins.length ? `* **⚠️ Fuga de Usuarios Administradores WordPress (\`/wp-json/wp/v2/users\`):** \`${item.wpExposedAdmins.join(', ')}\`` : ''}

## 2. Puntos Críticos Detectados en \`${item.domain}\`
${item.issues.map((iss, idx) => `${idx + 1}. **${iss}**`).join('\n')}

## 3. Solución Propuesta ( Servidor Dedicado / Cloud Blindado + ERP · Sin Permanencia)
Sin necesidad de rehacer ni cambiar el diseño de vuestra web actual, nos encargamos de blindar toda la infraestructura:
* **${item.recommendedPlan}:**
  - **Migración transparente a Servidor Cloud de Alto Rendimiento (o endurecimiento de vuestro servidor actual):** Bajada de tiempos de carga de \`${item.ttfbMs} ms\` a \`< 150 ms\`, TLS 1.3 y cabeceras OWASP (HSTS, CSP, X-Frame-Options) al **100/100**.
  - **Blindaje de Correo Corporativo (\`SPF + DKIM + DMARC estricto\`):** Impedimos que terceros suplanten vuestro dominio (\`@${item.domain}\`) para enviar facturas falsas con cambios de IBAN a vuestros clientes.
  - **Control de versiones en repositorio privado de GitHub** y copias de seguridad diarias externas.
  - ${item.hasEcommerce ? 'Sincronización automática en tiempo real de stock, tarifas y pedidos con vuestro ERP (Factusol / Sage / SimplyGest).' : 'Bloqueo de enumeración de usuarios administradores y soporte técnico directo.'}

---
**Contacto Directo:**
* **Cristian Jiménez Martínez** · Teléfono / WhatsApp Directo: **+34 617 205 053**
* **Email:** cristian@cristianjm.com · **Web:** https://cristianjm.com/#planes-empresas
`;
  fs.writeFileSync(filePath, md, 'utf8');
  return filePath;
}

async function deepServerAndMailAudit(domain, finalUrl, isWordPress, discoveredEmails = []) {
  const info = {
    ip: 'N/D',
    serverHost: 'N/D',
    mx: 'N/D',
    dmarcStatus: 'N/D',
    dmarcVulnerable: false,
    wpExposedAdmins: [],
    xmlRpcOpen: false
  };

  const cleanDom = domain.replace(/^www\./, '');

  // 1. DNS A + Reverse PTR (Hosting / Máquina real)
  try {
    const ips = await dns.resolve4(cleanDom);
    if (ips && ips[0]) {
      info.ip = ips[0];
      try {
        const ptr = await dns.reverse(info.ip);
        info.serverHost = ptr[0] || info.ip;
      } catch {
        info.serverHost = info.ip;
      }
    }
  } catch {}

  // 2. DNS MX (Servidor de correo)
  try {
    const mx = await dns.resolveMx(cleanDom);
    if (mx && mx.length) {
      info.mx = mx.sort((a, b) => a.priority - b.priority).map((m) => m.exchange).slice(0, 2).join(', ');
    }
  } catch {}

  // 3. DNS DMARC (Protección contra suplantación de facturas por email)
  try {
    const dmarcTxt = await dns.resolveTxt(`_dmarc.${cleanDom}`);
    const flat = dmarcTxt.map((t) => t.join(''));
    const rec = flat.find((t) => t.toLowerCase().startsWith('v=dmarc1'));
    if (!rec) {
      info.dmarcStatus = 'SIN DMARC (Vulnerable a suplantación de email/facturas)';
      info.dmarcVulnerable = true;
    } else if (/p\s*=\s*none/i.test(rec)) {
      info.dmarcStatus = 'DMARC en modo p=none (No bloquea suplantación de identidad/facturas)';
      info.dmarcVulnerable = true;
    } else {
      info.dmarcStatus = `Protegido (${rec.slice(0, 38)})`;
    }
  } catch {
    info.dmarcStatus = 'SIN DMARC (Vulnerable a suplantación de email/facturas)';
    info.dmarcVulnerable = true;
  }

  // 4. Sonda pasiva WordPress (/wp-json/wp/v2/users + /xmlrpc.php)
  if (isWordPress) {
    try {
      const origin = new URL(finalUrl).origin;
      const wpRes = await fetchUrl(`${origin}/wp-json/wp/v2/users`, 4000, 1);
      if (wpRes.statusCode === 200 && wpRes.body.trim().startsWith('[')) {
        const parsed = JSON.parse(wpRes.body);
        if (Array.isArray(parsed)) {
          const candidateEmails = new Set(discoveredEmails.map((e) => e.toLowerCase().trim()));
          for (const pref of ['info', 'administracion', 'gerencia', 'direccion', 'admin', 'web', 'contacto', 'ventas', 'pedidos', 'soporte']) {
            candidateEmails.add(`${pref}@${cleanDom}`);
          }
          for (const u of parsed) {
            if (u.slug) candidateEmails.add(`${String(u.slug).toLowerCase()}@${cleanDom}`);
            if (u.name) candidateEmails.add(`${String(u.name).toLowerCase().replace(/\s+/g, '')}@${cleanDom}`);
          }

          const md5Map = new Map();
          for (const em of candidateEmails) {
            md5Map.set(crypto.createHash('md5').update(em).digest('hex'), em);
          }

          info.wpExposedAdmins = parsed
            .slice(0, 4)
            .map((u) => {
              const avatarStr = JSON.stringify(u.avatar_urls || {});
              const hashMatch = avatarStr.match(/\/avatar\/([a-f0-9]{32})/i);
              const matchedEmail = hashMatch ? md5Map.get(hashMatch[1].toLowerCase()) : null;
              return `${u.name || u.slug} (login: ${u.slug}${matchedEmail ? ` · email MD5: ${matchedEmail}` : ''})`;
            })
            .filter(Boolean);
        }
      }
    } catch {}

    try {
      const origin = new URL(finalUrl).origin;
      const xmlRes = await fetchUrl(`${origin}/xmlrpc.php`, 3500, 1);
      if (xmlRes.statusCode === 405 || xmlRes.statusCode === 200) {
        info.xmlRpcOpen = true;
      }
    } catch {}
  }

  return info;
}

async function auditAndCrawlCompany(domain, modo, dossierDir) {
  let probe;
  try {
    probe = await fetchUrl(`https://${domain}/`);
  } catch {
    try {
      probe = await fetchUrl(`https://www.${domain}/`);
    } catch {
      probe = await fetchUrl(`http://${domain}/`);
    }
  }

  const h = probe.headers;
  const hsts = h['strict-transport-security'] || null;
  const csp = h['content-security-policy'] || null;
  const xfo = h['x-frame-options'] || null;
  const xcto = h['x-content-type-options'] || null;
  const server = h['server'] || null;
  const poweredBy = h['x-powered-by'] || null;

  let score = 100;
  const issues = [];

  if (!probe.finalUrl.startsWith('https://')) {
    score -= 30;
    issues.push('Sin cifrado HTTPS activo');
  } else if (probe.tlsProtocol !== 'TLSv1.3') {
    score -= 8;
    issues.push(`Cifrado ${probe.tlsProtocol || 'TLS 1.2'} (sin TLS 1.3)`);
  }
  if (!hsts) {
    score -= 18;
    issues.push('Sin cabecera HSTS (vulnerable a degradación SSL)');
  }
  if (!csp) {
    score -= 20;
    issues.push('Sin política Content-Security-Policy (expuesto a inyección XSS)');
  }
  if ((server && /\d/.test(server)) || poweredBy) {
    score -= 16;
    issues.push(`Fuga pública de versión de servidor (${[server, poweredBy].filter(Boolean).join(' / ')})`);
  }
  if (!xfo || !xcto) {
    score -= 14;
    issues.push('Sin cabeceras Anti-Clickjacking (X-Frame-Options) / nosniff');
  }
  if (probe.ttfbMs > 700) {
    score -= 10;
    issues.push(`Respuesta de servidor lenta (TTFB: ${probe.ttfbMs} ms)`);
  }

  score = Math.max(12, Math.min(100, score));
  const risk = score < 45 ? 'CRÍTICO' : score < 70 ? 'ALTO' : score < 88 ? 'MODERADO' : 'BAJO';

  const titleMatch = probe.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim().slice(0, 65) : domain;

  const { contactUrl, legalUrl } = findInternalLinks(probe.body, probe.finalUrl);
  const extraPages = await Promise.allSettled([
    contactUrl ? fetchUrl(contactUrl, 5000, 1) : Promise.resolve(null),
    legalUrl ? fetchUrl(legalUrl, 5000, 1) : Promise.resolve(null)
  ]);

  let combinedHtml = probe.body;
  for (const p of extraPages) {
    if (p.status === 'fulfilled' && p.value && p.value.body) {
      combinedHtml += '\n' + p.value.body;
    }
  }

  const contacts = extractContactsAndLegal(combinedHtml);
  const stack = detectTechStack(combinedHtml, h);
  const hasEcommerce = stack.some((s) => /WooCommerce|PrestaShop|Shopify/i.test(s));
  const isWordPress = stack.some((s) => /WordPress|WooCommerce/i.test(s));

  const serverInfo = await deepServerAndMailAudit(domain, probe.finalUrl, isWordPress, contacts.emails);

  if (serverInfo.dmarcVulnerable) {
    score = Math.max(12, score - 8);
    issues.push(`Correo corporativo desprotegido (${serverInfo.dmarcStatus})`);
  }
  if (serverInfo.wpExposedAdmins.length) {
    score = Math.max(12, score - 10);
    issues.push(`Fuga pública de administradores WordPress (/wp-json/wp/v2/users): ${serverInfo.wpExposedAdmins.join(', ')}`);
  }
  if (serverInfo.xmlRpcOpen) {
    issues.push('Pasarela /xmlrpc.php abierta a ataques de fuerza bruta');
  }

  // Detector de Solapamiento / Competencia en modo Partner
  const textBodyLower = combinedHtml
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .toLowerCase();

  const overlapKeywords = [];
  if (/(desarrollo de software a medida|software a medida)/.test(textBodyLower)) overlapKeywords.push('Software a Medida');
  if (/(desarrollo ia|inteligencia artificial para empresas)/.test(textBodyLower)) overlapKeywords.push('Desarrollo IA');
  if (/(diseño web|diseñamos.*web|creacion de paginas web|creación de páginas web|agencia de marketing|seo\s*&\s*ads)/.test(textBodyLower)) overlapKeywords.push('Diseño Web / Agencia SEO');

  const isCompetitorInPartnerMode = modo === 'partner' && overlapKeywords.length > 0;
  const partnerFitBadge = modo === 'partner'
    ? (isCompetitorInPartnerMode
        ? `⚠️ SOLAPAMIENTO (${overlapKeywords.join(' + ')}) — NO LLAMAR`
        : `✅ PARTNER PURO (Solo Hardware / Redes / Soporte IT)`)
    : '🎯 CLIENTE FINAL B2B';

  let recommendedPlan = 'Plan 200 €/mes (Blindaje Cloud, GitHub CI/CD & Ciberseguridad)';
  if (modo === 'partner') {
    recommendedPlan = isCompetitorInPartnerMode
      ? 'DESCARTAR COMO PARTNER (Solapamiento de servicios web/software)'
      : 'Alianza Partner B2B (20–25% comisión recurrente — Ellos llevan PCs/Redes, tú Web/ERP/IA)';
  } else if (hasEcommerce) {
    recommendedPlan = 'Plan 350 €/mes (Operativa Total: Cloud Blindado + E-Commerce + ERP 24/7)';
  }

  const companyDisplayName = contacts.razonSocial || pageTitle.split(/[-|–]/)[0].trim() || domain;
  const topIssue = issues[0] || 'ausencia de cabeceras de blindaje OWASP';

  const pitchMessage = modo === 'partner'
    ? `Hola, buenas tardes. Soy Cristian Jiménez, Arquitecto de Software y creador de Bentian ERP Bridge (cristianjm.com). Contactaba con vosotros (${companyDisplayName}) porque colaboramos con empresas de informática y asesorías en la zona: cuando un cliente vuestro necesita conectar su Factusol/Sage/SimplyGest con su tienda online (WooCommerce/PrestaShop), adaptar Veri*Factu o blindar servidores en Node.js/PHP/Angular, nosotros hacemos toda la ingeniería compleja y os damos un 25% recurrente respetando el 100% de vuestro mantenimiento local. ¿Con quién podría hablar 5 minutos por teléfono esta semana?`
    : `Hola, buenas tardes. Soy Cristian Jiménez, Arquitecto de Software (cristianjm.com). Revisando la web de ${companyDisplayName} (${domain}) he visto dos detalles técnicos importantes: ahora mismo el servidor tiene una puntuación de blindaje de ${score}/100 (${topIssue}) y un tiempo de respuesta inicial de ${probe.ttfbMs} ms${hasEcommerce ? ', además de cómo gestiona la tienda online' : ''}. He sacado un informe técnico de 1 página con los puntos exactos para que lo tengáis controlado. ¿Te parece bien que te lo pase por aquí sin ningún compromiso?`;

  const item = {
    domain,
    companyDisplayName,
    razonSocial: contacts.razonSocial || 'No especificada en web',
    cif: contacts.cif || 'N/D',
    mobiles: contacts.mobiles,
    landlines: contacts.landlines,
    emails: contacts.emails,
    stack,
    hasEcommerce,
    isCompetitorInPartnerMode,
    partnerFitBadge,
    ip: serverInfo.ip,
    serverHost: serverInfo.serverHost,
    mx: serverInfo.mx,
    dmarcStatus: serverInfo.dmarcStatus,
    wpExposedAdmins: serverInfo.wpExposedAdmins,
    score,
    risk,
    ttfbMs: probe.ttfbMs,
    issues,
    recommendedPlan,
    pitchMessage,
    dossierPath: ''
  };

  item.dossierPath = writeIndividualDossier(dossierDir, item);
  return item;
}

async function main() {
  const cfg = parseArgs();
  console.log(`\n========================================================================`);
  console.log(` MOTOR B2B DE PROSPECCIÓN POR ZONAS — CRISTIAN JIMÉNEZ (cristianjm.com)`);
  console.log(` Zona: ${cfg.zona} | Sector: ${cfg.sector} | Modo: ${cfg.modo.toUpperCase()}`);
  console.log(`========================================================================\n`);

  let domains = cfg.dominios;
  if (!domains.length) {
    console.log(`>>> [1/3] Buscando empresas reales en "${cfg.zona}" del sector "${cfg.sector}"...`);
    domains = await discoverDomainsByZoneAndSector(cfg.zona, cfg.sector, cfg.limit);
  }

  if (!domains.length) {
    console.log(`[!] No se encontraron dominios automáticamente. Puedes pasar --dominios "web1.es,web2.com".`);
    process.exit(0);
  }

  console.log(`    ✓ ${domains.length} dominios empresariales localizados: ${domains.join(', ')}\n`);
  console.log(`>>> [2/3] Escaneando seguridad, stack, /contacto y /aviso-legal de cada empresa...\n`);

  const outDir = path.join(__dirname, '..', 'auditorias');
  const dossierDir = path.join(outDir, 'dossiers');
  const results = [];

  for (const dom of domains) {
    try {
      process.stdout.write(`  • Analizando ${dom.padEnd(32, ' ')} ... `);
      const res = await auditAndCrawlCompany(dom, cfg.modo, dossierDir);
      results.push(res);
      const phonePreview = res.mobiles[0] || res.landlines[0] || 'Sin tel';
      const emailPreview = res.emails[0] || 'Sin email';
      console.log(`[Nota: ${res.score}/100 | ${res.ttfbMs}ms] -> Tel: ${phonePreview} | Email: ${emailPreview}`);
    } catch (err) {
      console.log(`[Omitido: ${err.message}]`);
    }
  }

  results.sort((a, b) => {
    if (a.isCompetitorInPartnerMode !== b.isCompetitorInPartnerMode) {
      return a.isCompetitorInPartnerMode ? 1 : -1;
    }
    const aHasContact = a.mobiles.length || a.landlines.length || a.emails.length ? 0 : 1;
    const bHasContact = b.mobiles.length || b.landlines.length || b.emails.length ? 0 : 1;
    if (aHasContact !== bHasContact) return aHasContact - bHasContact;
    return a.score - b.score;
  });

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const slug = `${cfg.zona}-${cfg.sector}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const mdFile = path.join(outDir, `leads-${slug}.md`);

  const mdContent = `# Hoja de Ruta de Prospección B2B — ${cfg.sector.toUpperCase()} (${cfg.zona.toUpperCase()})
**Fecha:** ${new Date().toLocaleDateString('es-ES')} · **Total Empresas Cribadas:** ${results.length}

---

## 1. Tabla Resumen de Leads Cualificados (Ordenados por Oportunidad)

| # | Empresa / Razón Social | Dominio | Clasificación / Encaje | Nota Seguridad | Móvil / WhatsApp | Teléfono Fijo | Email Directo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${results.map((r, i) => `| **${i + 1}** | **${r.companyDisplayName}**<br><small>CIF: ${r.cif}</small> | \`${r.domain}\` | **${r.partnerFitBadge}**<br><small>${r.stack.join(', ')}</small> | **${r.score}/100** (${r.risk})<br><small>${r.ttfbMs} ms</small> | ${r.mobiles.join('<br>') || '—'} | ${r.landlines.join('<br>') || '—'} | ${r.emails.join('<br>') || '—'} |`).join('\n')}

---

## 2. Fichas de Ataque Comercial y Guiones Listos para Enviar

${results.map((r, i) => `### Lead #${i + 1}: ${r.companyDisplayName} (\`${r.domain}\`) — ${r.partnerFitBadge}
* **Razón Social (Aviso Legal):** ${r.razonSocial} (CIF: \`${r.cif}\`)
* **Teléfonos Móviles / WhatsApp:** ${r.mobiles.length ? r.mobiles.map((m) => `\`+34 ${m}\``).join(' · ') : 'No publicado'}
* **Teléfonos Fijos:** ${r.landlines.length ? r.landlines.map((l) => `\`+34 ${l}\``).join(' · ') : 'No publicado'}
* **Correos Electrónicos:** ${r.emails.length ? r.emails.map((e) => `\`${e}\``).join(' · ') : 'No publicado'}
* **Tecnología Detectada:** ${r.stack.join(' · ')}
* **Servidor Físico / Hosting Real:** \`${r.serverHost}\` (IP: \`${r.ip}\`)
* **Correo Corporativo y Facturas (\`MX\` / \`DMARC\`):** \`${r.mx}\` → **${r.dmarcStatus}**
${r.wpExposedAdmins.length ? `* **⚠️ Administradores WordPress Expuestos (\`/wp-json/wp/v2/users\`):** \`${r.wpExposedAdmins.join(', ')}\`\n` : ''}* **Estado del Servidor:** **${r.score}/100 (Riesgo ${r.risk})** · Latencia TTFB: \`${r.ttfbMs} ms\`
* **Fallos Técnicos Detectados:**
${r.issues.map((iss) => `  - ❌ ${iss}`).join('\n')}
* **Dossier Individual Generado:** \`${r.dossierPath}\`
* **Servicio Recomendado:** **${r.recommendedPlan}**
* **Guion Exacto (Copiar y pegar en WhatsApp / Email / LinkedIn):**
> ${r.pitchMessage}
`).join('\n---\n\n')}
`;

  fs.writeFileSync(mdFile, mdContent, 'utf8');
  console.log(`\n>>> [3/3] ¡Prospección completada!`);
  console.log(`    • Hoja de ruta: ${mdFile}`);
  console.log(`    • Dossiers individuales (${results.length}): ${dossierDir}\n`);
}

main().catch((err) => {
  console.error('\n[ERROR]', err.message);
  process.exit(1);
});
