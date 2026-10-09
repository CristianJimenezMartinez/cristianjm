/**
 * Plan de Choque B2B — Campaña para Distribuidores Oficiales de Software DELSOL / Factusol
 * Emisor: Cristian Jiménez <cristian@cristianjm.com>
 * Enfoque: Alianza Partner Tecnológico + Clave Beta para pruebas en laboratorio
 */

const fs = require('fs');
const path = require('path');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER = 'Cristian Jiménez <cristian@cristianjm.com>';

const DISTRIBUIDORES_FILE = path.join(__dirname, 'distribuidores-delsol.json');
const CRM_FILE = path.join(__dirname, 'crm-outreach.json');

function cargarDistribuidores() {
  const data = JSON.parse(fs.readFileSync(DISTRIBUIDORES_FILE, 'utf8'));
  return data.distribuidores;
}

function generarContenido(distribuidor) {
  const subject = `Alianza técnica: Conector WooCommerce para vuestros clientes de Factusol en ${distribuidor.nombre}`;

  const text = `Hola equipo de ${distribuidor.nombre},

Os escribo de forma muy directa porque sé que como distribuidores especializados en Software DELSOL os encontráis a menudo con clientes que os piden conectar Factusol con tiendas online WooCommerce.

${distribuidor.gancho}

Como sabéis bien, DELSOL no ofrece un conector nativo propio para WooCommerce, y derivar a vuestros clientes a agencias externas o desarrollos a medida suele traer dos problemas: o se vuelve un infierno de soporte técnico que os salpica a vosotros, o la agencia externa intenta cambiar al cliente de ERP, con el riesgo de perder vuestra cuota de mantenimiento de Factusol.

Soy Cristian Jiménez, desarrollador de software y creador de Bentian ERP Bridge (https://bridge.cristianjm.com).

Hemos desarrollado un conector local para Windows con arquitectura tolerante a caídas de red que sincroniza en tiempo real catálogo, variantes, tarifas, stock y pedidos de Factusol con WooCommerce directamente contra la base de datos local, sin traslados a la nube ni intermediarios lentos. Ya opera a diario en clientes de producción con miles de referencias (como Suministros Rubio: https://tienda.suministrosrubio.com/articulos).

¿Qué os proponemos como Partner Tecnológico?
1. Blindáis a vuestro cliente de Factusol: Le dais solución directa a su venta online y podéis paquetizar la puesta en marcha con vuestro propio margen comercial o cuota de mantenimiento.
2. Cero horas de programación: Nosotros os facilitamos el instalador empaquetado para Windows y el soporte técnico especializado de nivel 3.
3. Clave Beta sin coste para pruebas: Os facilitamos una clave de licencia Beta completa y gratuita para que vuestros técnicos puedan instalarla, testearla a fondo en vuestro laboratorio o entorno de pruebas con Factusol y comprobar su estabilidad sin ningún compromiso.

¿Tenéis actualmente algún cliente de Factusol que necesite conectar su tienda WooCommerce?

Si es así, ¿os encaja que lo comentemos brevemente o que os pase la clave Beta para que la trasteéis?

Un saludo cordial,

Cristian Jiménez Martínez
Desarrollador de software | Bentian ERP Bridge
cristian@cristianjm.com
Producto: https://bridge.cristianjm.com · Web personal: https://cristianjm.com · LinkedIn: https://linkedin.com/in/cristian-jimenez-martinez/`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14.5px; line-height: 1.65; color: #1f2937; max-width: 620px; margin: 0; padding: 12px;">
  <p>Hola equipo de <strong>${distribuidor.nombre}</strong>,</p>

  <p>Os escribo de forma muy directa porque sé que como distribuidores especializados en <strong>Software DELSOL</strong> os encontráis a menudo con clientes que os piden conectar Factusol con tiendas online WooCommerce.</p>

  <p>${distribuidor.gancho}</p>

  <p>Como sabéis bien, DELSOL no ofrece un conector nativo propio para WooCommerce, y derivar a vuestros clientes a agencias externas o desarrollos a medida suele traer dos problemas: o se vuelve un foco de problemas de soporte técnico que os salpica a vosotros, o la agencia externa intenta cambiar al cliente de ERP, con el riesgo de perder vuestra cuota de mantenimiento de Factusol.</p>

  <p>Soy Cristian Jiménez, desarrollador de software y creador de <strong>Bentian ERP Bridge</strong> (<a href="https://bridge.cristianjm.com" style="color: #4f46e5; text-decoration: underline;">bridge.cristianjm.com</a>).</p>

  <p>Hemos desarrollado un conector local para Windows con arquitectura tolerante a caídas de red que sincroniza en tiempo real catálogo, variantes, tarifas, stock y pedidos de Factusol con WooCommerce directamente contra la base de datos local, sin traslados a la nube ni intermediarios lentos. Ya opera a diario en clientes de producción con miles de referencias (como <a href="https://tienda.suministrosrubio.com/articulos" style="color: #4f46e5; text-decoration: underline;">Suministros Rubio</a>).</p>

  <div style="background-color: #f8fafc; border-left: 3px solid #4f46e5; padding: 12px 16px; margin: 18px 0; border-radius: 0 6px 6px 0;">
    <p style="margin: 0 0 8px 0; font-weight: 600; color: #0f172a;">¿Qué os proponemos como Partner Tecnológico?</p>
    <ul style="margin: 0; padding-left: 18px; color: #334155; font-size: 14px;">
      <li style="margin-bottom: 6px;"><strong>Blindáis a vuestro cliente de Factusol:</strong> Le dais solución directa a su venta online y podéis paquetizar la puesta en marcha con vuestro propio margen comercial o cuota de mantenimiento.</li>
      <li style="margin-bottom: 6px;"><strong>Cero horas de programación:</strong> Nosotros os facilitamos el instalador empaquetado para Windows y el soporte técnico especializado de nivel 3.</li>
      <li><strong>Clave Beta sin coste para pruebas:</strong> Os facilitamos una clave de licencia Beta completa y gratuita para que vuestros técnicos puedan instalarla, testearla a fondo en vuestro laboratorio o entorno de pruebas con Factusol y comprobar su estabilidad sin ningún compromiso.</li>
    </ul>
  </div>

  <p style="background-color: #f1f5f9; border-left: 3px solid #4f46e5; padding: 12px 14px; margin: 18px 0; border-radius: 0 4px 4px 0; font-weight: 500; color: #0f172a;">
    ¿Tenéis actualmente algún cliente de Factusol que necesite conectar su tienda WooCommerce?<br>
    <span style="font-weight: normal; color: #475569; font-size: 13.5px; display: inline-block; margin-top: 4px;">Si es así, ¿os encaja que lo comentemos brevemente o que os pase la clave Beta para que la trasteéis?</span>
  </p>

  <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13.5px; color: #475569; line-height: 1.5;">
    <strong style="color: #0f172a; font-size: 14.5px;">Cristian Jiménez Martínez</strong><br>
    <span>Desarrollador de software | <strong>Bentian ERP Bridge</strong></span><br>
    <div style="margin-top: 6px; font-size: 12.5px;">
      <a href="mailto:cristian@cristianjm.com" style="color: #4f46e5; text-decoration: none;">cristian@cristianjm.com</a><br>
      <a href="https://bridge.cristianjm.com" style="color: #4f46e5; text-decoration: none;">Producto</a> · 
      <a href="https://cristianjm.com" style="color: #4f46e5; text-decoration: none;">Web personal</a> · 
      <a href="https://linkedin.com/in/cristian-jimenez-martinez/" style="color: #4f46e5; text-decoration: none;">LinkedIn</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

async function enviarEmail(to, subject, html, text) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: SENDER,
      to: [to],
      subject,
      html,
      text
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Error Resend (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

function registrarEnvio(distribuidor, resendId, subject) {
  try {
    const rawD = JSON.parse(fs.readFileSync(DISTRIBUIDORES_FILE, 'utf8'));
    const target = rawD.distribuidores.find((x) => x.id === distribuidor.id);
    if (target) {
      target.estado = 'ENVIADO';
      target.fecha_envio = new Date().toISOString();
      target.resend_id = resendId;
    }
    fs.writeFileSync(DISTRIBUIDORES_FILE, JSON.stringify(rawD, null, 2), 'utf8');

    if (fs.existsSync(CRM_FILE)) {
      const rawCrm = JSON.parse(fs.readFileSync(CRM_FILE, 'utf8'));
      rawCrm.historico_enviados = rawCrm.historico_enviados || [];
      rawCrm.historico_enviados.push({
        id: distribuidor.id,
        destinatario: distribuidor.nombre,
        contacto: `Equipo de ${distribuidor.nombre}`,
        zona: distribuidor.zona,
        fecha_envio: new Date().toISOString().split('T')[0],
        email: distribuidor.email,
        asunto: subject,
        resend_id: resendId,
        tipo: 'DISTRIBUIDOR_DELSOL',
        estado: 'Enviado - Pendiente respuesta'
      });
      fs.writeFileSync(CRM_FILE, JSON.stringify(rawCrm, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('⚠️ Error al registrar en CRM:', err.message);
  }
}

async function run() {
  const arg = process.argv[2] || '--dry-run';
  const distribuidores = cargarDistribuidores();

  console.log('====================================================');
  console.log(' 🤝 CAMPAÑA DISTRIBUIDORES DELSOL — BENTIAN ERP BRIDGE');
  console.log(` Emisor: ${SENDER}`);
  console.log(` Total distribuidores cualificados: ${distribuidores.length}`);
  console.log(` Modo:   ${arg}`);
  console.log('====================================================\n');

  if (arg === '--dry-run') {
    distribuidores.forEach((d) => {
      console.log(`[${d.id}] ${d.nombre.padEnd(24)} | ${d.zona.padEnd(20)} | ${d.email.padEnd(32)} | ${d.categoria}`);
    });
    console.log('\nUso:');
    console.log('  node scripts/outreach-distribuidores-delsol.js --dry-run');
    console.log('  node scripts/outreach-distribuidores-delsol.js --test');
    console.log('  node scripts/outreach-distribuidores-delsol.js --send-all 30');
    console.log('  node scripts/outreach-distribuidores-delsol.js --send-one DELSOL-01');
    return;
  }

  if (arg === '--test') {
    const testTarget = 'cristianjimeneztrabajo@gmail.com';
    console.log(`📬 Enviando email de prueba a ${testTarget} (simulando Grupo Odín)...`);
    const { subject, html, text } = generarContenido(distribuidores[0]);
    try {
      const result = await enviarEmail(testTarget, `[TEST DISTRIBUIDOR DELSOL] ${subject}`, html, text);
      console.log(`✓ Email de prueba enviado con éxito! ID: ${result.id}`);
      console.log('👉 Revisa tu bandeja de entrada.');
    } catch (e) {
      console.error('❌ Error al enviar:', e.message);
    }
    return;
  }

  if (arg === '--send-all') {
    const delaySec = parseInt(process.argv[3], 10) || 30;

    // Cargar exclusiones del CRM
    let sentEmails = new Set();
    let sentNames = new Set();
    if (fs.existsSync(CRM_FILE)) {
      const crmData = JSON.parse(fs.readFileSync(CRM_FILE, 'utf8'));
      (crmData.historico_enviados || []).forEach(x => {
        if (x.email) sentEmails.add(x.email.toLowerCase().trim());
        if (x.destinatario) sentNames.add(x.destinatario.toLowerCase().trim());
      });
    }

    const filtrados = distribuidores.filter(d => {
      if (d.estado === 'ENVIADO') return false;
      const em = (d.email || '').toLowerCase().trim();
      const nom = (d.nombre || '').toLowerCase().trim();
      if (sentEmails.has(em)) return false;
      if (sentNames.has(nom)) return false;
      return true;
    });

    console.log(`🔒 BLINDAJE ANTI-DUPLICADOS ACTIVO:`);
    console.log(`   - Distribuidores ya enviados: ${distribuidores.length - filtrados.length}`);
    console.log(`   - Distribuidores limpios a enviar: ${filtrados.length}`);
    console.log(`   - Cadencia entre envíos: ${delaySec} segundos\n`);

    if (filtrados.length === 0) {
      console.log('✨ No quedan distribuidores pendientes por enviar.');
      return;
    }

    for (let i = 0; i < filtrados.length; i++) {
      const d = filtrados[i];
      const { subject, html, text } = generarContenido(d);
      console.log(`[${i + 1}/${filtrados.length}] Enviando a ${d.nombre} (${d.email}) - ${d.zona}...`);
      try {
        const result = await enviarEmail(d.email, subject, html, text);
        console.log(`  ✓ Enviado con éxito! Resend ID: ${result.id}`);
        registrarEnvio(d, result.id, subject);
      } catch (err) {
        console.error(`  ❌ Error al enviar a ${d.nombre}:`, err.message);
      }

      if (i < filtrados.length - 1) {
        console.log(`  ⏳ Esperando ${delaySec} segundos antes del siguiente envío...`);
        for (let s = delaySec; s > 0; s -= 5) {
          process.stdout.write(`    ... ${s}s restantes\r`);
          await new Promise((r) => setTimeout(r, 5000));
        }
        console.log('    ✓ Tiempo cumplido. Pasando al siguiente.\n');
      }
    }
    console.log('\n✨ Campaña a Distribuidores Oficiales DELSOL finalizada con éxito.');
    return;
  }

  if (arg === '--send-one') {
    const targetId = process.argv[3];
    const distribuidor = distribuidores.find((d) => d.id === targetId);
    if (!distribuidor) {
      console.error(`❌ Distribuidor ${targetId} no encontrado.`);
      return;
    }

    console.log(`🚀 Enviando a ${distribuidor.nombre} (${distribuidor.email})...`);
    const { subject, html, text } = generarContenido(distribuidor);
    try {
      const result = await enviarEmail(distribuidor.email, subject, html, text);
      console.log(`✓ Enviado correctamente a ${distribuidor.nombre}. Resend ID: ${result.id}`);
      registrarEnvio(distribuidor, result.id, subject);
    } catch (e) {
      console.error('❌ Error:', e.message);
    }
    return;
  }
}

run();
