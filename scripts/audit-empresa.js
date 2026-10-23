#!/usr/bin/env node
/**
 * CristianJM — Generador de Dossier de Auditoría B2B de Seguridad y Servidor
 * Uso: node scripts/audit-empresa.js <dominio-o-url>
 * Ejemplo: node scripts/audit-empresa.js www.empresa.com
 */

const https = require('https');
const http = require('http');
const tls = require('tls');
const dns = require('dns');
const fs = require('fs');
const path = require('path');

function cleanDomain(input) {
  if (!input) return null;
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//i, '')
    .split('/')[0]
    .split('?')[0]
    .replace(/:\d+$/, '');
}

function probeUrl(urlStr, redirectsLeft = 3) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
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
        timeout: 7000,
        headers: {
          'User-Agent': 'CristianJM-B2B-SecurityAudit/1.0 (+https://cristianjm.com)',
          'Accept': 'text/html,*/*;q=0.8',
        },
      },
      (res) => {
        const ttfbMs = Math.max(1, Date.now() - start);
        let tlsProtocol = null;
        let sslIssuer = null;
        let sslDaysRemaining = null;

        if (isHttps && res.socket instanceof tls.TLSSocket) {
          tlsProtocol = res.socket.getProtocol() || null;
          try {
            const cert = res.socket.getPeerCertificate();
            if (cert) {
              sslIssuer = cert.issuer ? cert.issuer.O || cert.issuer.CN : null;
              if (cert.valid_to) {
                sslDaysRemaining = Math.floor((new Date(cert.valid_to).getTime() - Date.now()) / 86400000);
              }
            }
          } catch {}
        }

        res.destroy();
        const status = res.statusCode || 0;
        if (status >= 300 && status < 400 && res.headers.location && redirectsLeft > 0) {
          const nextUrl = new URL(res.headers.location, urlStr).toString();
          probeUrl(nextUrl, redirectsLeft - 1).then(resolve).catch(reject);
          return;
        }

        resolve({
          finalUrl: urlStr,
          statusCode: status,
          headers: res.headers,
          ttfbMs,
          tlsProtocol,
          sslIssuer,
          sslDaysRemaining,
        });
      }
    );

    req.on('timeout', () => req.destroy(new Error('Timeout (>7s) al conectar con el servidor.')));
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const rawInput = process.argv[2];
  const domain = cleanDomain(rawInput);

  if (!domain) {
    console.log('\nUso: node scripts/audit-empresa.js <dominio>');
    console.log('Ejemplo: node scripts/audit-empresa.js skinfit.pro\n');
    process.exit(1);
  }

  console.log(`\n===================================================================`);
  console.log(` AUDITORÍA TÉCNICA B2B — CRISTIAN JIMÉNEZ MARTÍNEZ (cristianjm.com)`);
  console.log(` Analizando objetivo: ${domain} ...`);
  console.log(`===================================================================\n`);

  let ips = [];
  try {
    const records = await dns.promises.lookup(domain, { all: true });
    ips = records.map((r) => r.address);
  } catch (err) {
    console.error(`[ERROR DNS] No se pudo resolver ${domain}: ${err.message}`);
    process.exit(1);
  }

  let probe;
  try {
    probe = await probeUrl(`https://${domain}/`);
  } catch {
    probe = await probeUrl(`http://${domain}/`);
  }

  const h = probe.headers;
  const hsts = h['strict-transport-security'] || null;
  const csp = h['content-security-policy'] || null;
  const xfo = h['x-frame-options'] || null;
  const xcto = h['x-content-type-options'] || null;
  const refPol = h['referrer-policy'] || null;
  const permPol = h['permissions-policy'] || null;
  const server = h['server'] || null;
  const poweredBy = h['x-powered-by'] || null;

  let score = 100;
  const findings = [];

  if (!probe.finalUrl.startsWith('https://')) {
    score -= 30;
    findings.push(['CRÍTICO', 'Sin cifrado HTTPS activo', 'Activar TLS 1.3 en servidor y forzar redirección 301.']);
  } else if (probe.tlsProtocol !== 'TLSv1.3') {
    score -= 8;
    findings.push(['MEDIO', `Protocolo ${probe.tlsProtocol || 'TLS 1.2'} en lugar de TLS 1.3`, 'Habilitar TLSv1.3 en la configuración de Nginx/Apache.']);
  }

  if (!hsts) {
    score -= 18;
    findings.push(['ALTO', 'Cabecera Strict-Transport-Security (HSTS) ausente', 'El dominio es vulnerable a ataques de degradación SSL (SSL Stripping).']);
  }

  if (!csp) {
    score -= 20;
    findings.push(['ALTO', 'Sin política Content-Security-Policy (CSP)', 'Superficie expuesta a inyección de scripts cruzados (XSS) y robo de sesión.']);
  }

  if ((server && /\d/.test(server)) || poweredBy) {
    score -= 16;
    findings.push(['ALTO', `Fuga de huella digital: ${[server, poweredBy].filter(Boolean).join(' / ')}`, 'Ocultar server_tokens y X-Powered-By para evitar escaneos automatizados de CVEs.']);
  }

  if (!xfo || !xcto) {
    score -= 14;
    findings.push(['MEDIO', `Faltan cabeceras de aislamiento (X-Frame-Options: ${xfo || 'NO'} / nosniff: ${xcto || 'NO'})`, 'Proteger frente a Clickjacking (iframe oculto) y MIME Sniffing.']);
  }

  if (probe.ttfbMs > 700) {
    score -= 10;
    findings.push(['MEDIO', `Tiempo de respuesta de servidor lento (TTFB: ${probe.ttfbMs} ms)`, 'Optimizar servidor central, compresión Brotli/Gzip y caché perimetral.']);
  }

  score = Math.max(12, Math.min(100, score));
  const risk = score < 45 ? 'CRÍTICO' : score < 70 ? 'ALTO' : score < 88 ? 'MODERADO' : 'BAJO';

  console.log(`- URL Final:          ${probe.finalUrl} (HTTP ${probe.statusCode})`);
  console.log(`- IPs Resueltas:      ${ips.join(', ')}`);
  console.log(`- Latencia TTFB:      ${probe.ttfbMs} ms`);
  console.log(`- Cifrado TLS:        ${probe.tlsProtocol || 'N/A'} (Validez SSL: ${probe.sslDaysRemaining ?? '?'} días — Emisor: ${probe.sslIssuer || 'N/A'})`);
  console.log(`- Servidor Expuesto:  ${server || 'Oculto'} / X-Powered-By: ${poweredBy || 'Oculto'}`);
  console.log(`- NOTA DE SEGURIDAD:  ${score} / 100 (Nivel de Exposición: ${risk})\n`);

  console.log(`Hallazgos detectados (${findings.length}):`);
  findings.forEach(([sev, title, desc], idx) => {
    console.log(`  ${idx + 1}. [${sev}] ${title}\n     -> ${desc}`);
  });

  const outDir = path.join(__dirname, '..', 'auditorias');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const safeFile = domain.replace(/[^a-z0-9.-]/gi, '_');
  const reportPath = path.join(outDir, `auditoria-${safeFile}.md`);

  const md = `# Informe Ejecutivo de Seguridad, Servidor y Rendimiento Web
**Empresa / Dominio Analizado:** \`${domain}\` (${probe.finalUrl})
**Fecha de Inspección:** ${new Date().toLocaleDateString('es-ES')}
**Auditor:** Cristian Jiménez Martínez — Arquitecto de Software, Ciberseguridad & ERP ([cristianjm.com](https://cristianjm.com))

---

## 1. Resumen Ejecutivo de Exposición
* **Puntuación Global de Blindaje:** **${score} / 100** (Nivel de Exposición: **${risk}**)
* **Tiempo de Respuesta del Servidor (TTFB):** \`${probe.ttfbMs} ms\` ${probe.ttfbMs > 600 ? '(Lento — penaliza conversión y SEO)' : '(Correcto)'}
* **Protocolo Criptográfico:** \`${probe.tlsProtocol || 'Sin TLS'}\` (Validez del certificado: \`${probe.sslDaysRemaining ?? 'N/A'} días\`)
* **Huella de Servidor Detectada:** \`Server: ${server || 'Oculto'}\` · \`X-Powered-By: ${poweredBy || 'Oculto'}\`
* **Estado de Cabeceras OWASP:**
  - \`Strict-Transport-Security (HSTS)\`: ${hsts ? '✅ Activa' : '❌ **NO CONFIGURADA**'}
  - \`Content-Security-Policy (CSP)\`: ${csp ? '✅ Activa' : '❌ **NO CONFIGURADA**'}
  - \`X-Frame-Options (Anti-Clickjacking)\`: ${xfo ? `✅ Activa (${xfo})` : '❌ **NO CONFIGURADA**'}
  - \`X-Content-Type-Options (nosniff)\`: ${xcto ? '✅ Activa' : '❌ **NO CONFIGURADA**'}
  - \`Referrer-Policy\`: ${refPol ? `✅ Activa (${refPol})` : '⚠️ No configurada'}
  - \`Permissions-Policy\`: ${permPol ? '✅ Activa' : '⚠️ No configurada'}

---

## 2. Vulnerabilidades y Puntos de Mejora Detectados
${findings.length === 0 ? '- No se han detectado vulnerabilidades pasivas en las cabeceras públicas.' : findings.map(([sev, title, desc], i) => `${i + 1}. **[${sev}] ${title}**\n   - *Acción requerida:* ${desc}`).join('\n\n')}

---

## 3. Propuesta de Solución Llave en Mano (Sin Permanencia)
Para corregir todos los puntos anteriores, blindar el servidor frente a vulnerabilidades CVE y mantener la plataforma bajo control de versiones profesional en GitHub con copias de seguridad diarias:

* **Plan Blindaje Cloud & DevSecOps (200 €/mes + IVA):**
  - Migración o endurecimiento de servidor (Nginx Hardened + TLS 1.3 + todas las cabeceras OWASP 100/100).
  - Repositorio privado en GitHub con despliegues automáticos CI/CD sin caídas.
  - Parcheo activo de seguridad en Node.js, PHP, librerías y base de datos.
  - Copias de seguridad diarias cifradas y monitorización 24/7.
* **Plan Operativa Total & ERP 24/7 (350 €/mes + IVA):**
  - Todo lo anterior + sincronización en tiempo real con **Factusol ERP / WooCommerce / PrestaShop** (stock disponible real \`DISSTO\`, tarifas 1–5 e inyección automática de pedidos) y hasta 3h/mes de soporte evolutivo.

---
**Contacto Directo:**
* **Cristian Jiménez Martínez**
* **Teléfono / WhatsApp Empresas:** +34 617 205 053
* **Email:** cristian@cristianjm.com
* **Web Oficial:** https://cristianjm.com/#planes-empresas
`;

  fs.writeFileSync(reportPath, md, 'utf8');
  console.log(`\n[OK] Informe ejecutivo guardado en: ${reportPath}\n`);
}

run().catch((err) => {
  console.error(`\n[ERROR] No se pudo completar la auditoría: ${err.message}\n`);
  process.exit(1);
});
