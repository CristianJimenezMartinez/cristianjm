/**
 * Plan de Choque — Campaña Beta Abierta Gratuita Albacete y Provincia
 * Emisor: Cristian Jiménez <cristian@cristianjm.com>
 * Enfoque: Proximidad local en Castilla-La Mancha + Beta sin coste de licencia
 */

const fs = require('fs');
const path = require('path');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER = 'Cristian Jiménez <cristian@cristianjm.com>';

const PROSPECTOS_FILE = path.join(__dirname, 'prospectos-albacete-beta.json');
const CRM_FILE = path.join(__dirname, 'crm-outreach.json');

function cargarProspectos() {
  const data = JSON.parse(fs.readFileSync(PROSPECTOS_FILE, 'utf8'));
  return data.prospectos;
}

function generarContenido(prospecto) {
  const ubicacion = prospecto.municipio || prospecto.ciudad || 'Albacete';
  const saludo = prospecto.saludo || `Hola equipo de ${prospecto.nombre}`;
  const subject = `Conector Factusol ↔ WooCommerce (Beta gratuita para proyectos en ${ubicacion})`;

  const text = `${saludo},

He estado viendo vuestro trabajo en ${prospecto.especialidad} en ${ubicacion} y creo que os puede interesar una oportunidad de colaboración técnica muy directa.

Cuando un cliente de la zona utiliza Factusol y quiere vender online con WooCommerce, conectar ambos sistemas suele convertirse en un proyecto complejo: catálogo, variantes, tarifas, stock y pedidos tienen que sincronizarse de forma fiable sin que vuestro equipo pierda decenas de horas de desarrollo y soporte.

Soy Cristian Jiménez, desarrollador de software y creador de Bentian ERP Bridge (https://bridge.cristianjm.com).

Hemos desarrollado un conector para sincronizar Factusol con WooCommerce mediante un agente local de Windows, diseñado para trabajar directamente con la instalación existente del cliente sin tener que migrar la base de datos a la nube. Ya tenemos una instalación en producción con miles de referencias operando a diario: Suministros Rubio (https://tienda.suministrosrubio.com/articulos).

Estamos abriendo una Beta abierta gratuita dirigida a agencias y profesionales de Albacete y provincia:
- Ponemos a vuestra disposición el conector con puesta en marcha y soporte técnico directo por mi parte sin coste de licencia durante la fase Beta.
- Vosotros podéis ofrecer la integración a vuestros clientes con total libertad y resolverles el problema de Factusol sin tener que programarlo ni mantenerlo internamente.

¿Tenéis actualmente algún cliente con Factusol que quiera vender online con WooCommerce?

Si es así, ¿os encaja que lo comentemos brevemente?

Un saludo,

Cristian Jiménez Martínez
Desarrollador de software | Bentian ERP Bridge
cristian@cristianjm.com
Producto: https://bridge.cristianjm.com · Web personal: https://cristianjm.com · LinkedIn: https://linkedin.com/in/cristian-jimenez-martinez/`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14.5px; line-height: 1.65; color: #1f2937; max-width: 620px; margin: 0; padding: 12px;">
  <p>${saludo},</p>

  <p>He estado viendo vuestro trabajo en <strong>${prospecto.especialidad}</strong> en ${ubicacion} y creo que os puede interesar una oportunidad de colaboración técnica muy directa.</p>

  <p>Cuando un cliente utiliza <strong>Factusol</strong> y quiere vender online con <strong>WooCommerce</strong>, conectar ambos sistemas suele convertirse en un proyecto complejo: catálogo, variantes, tarifas, stock y pedidos tienen que sincronizarse de forma fiable sin que vuestro equipo pierda decenas de horas de desarrollo y soporte.</p>

  <p>Soy Cristian Jiménez, desarrollador de software y creador de <strong>Bentian ERP Bridge</strong> (<a href="https://bridge.cristianjm.com" style="color: #4f46e5; text-decoration: underline;">bridge.cristianjm.com</a>).</p>

  <p>Hemos desarrollado un conector para sincronizar Factusol con WooCommerce mediante un agente local de Windows, diseñado para trabajar directamente con la instalación existente del cliente sin tener que trasladar la base de datos completa a la nube. Ya tenemos una instalación en producción con miles de referencias operando a diario: <a href="https://tienda.suministrosrubio.com/articulos" style="color: #4f46e5; text-decoration: underline;">Suministros Rubio</a>.</p>

  <div style="background-color: #f8fafc; border-left: 3px solid #4f46e5; padding: 12px 16px; margin: 18px 0; border-radius: 0 6px 6px 0;">
    <p style="margin: 0 0 6px 0; font-weight: 600; color: #0f172a;">Programa de Beta Abierta Gratuita en Albacete y provincia:</p>
    <ul style="margin: 0; padding-left: 18px; color: #334155; font-size: 14px;">
      <li style="margin-bottom: 5px;"><strong>Sin coste de licencia:</strong> Acceso completo y gratuito al conector durante la fase Beta con soporte y asistencia en la puesta en marcha.</li>
      <li><strong>Cero desarrollo interno:</strong> Vosotros ofrecéis la solución llave en mano a vuestros clientes sin tener que programar ni mantener la conexión con Factusol.</li>
    </ul>
  </div>

  <p style="background-color: #f1f5f9; border-left: 3px solid #4f46e5; padding: 12px 14px; margin: 18px 0; border-radius: 0 4px 4px 0; font-weight: 500; color: #0f172a;">
    ¿Tenéis actualmente algún cliente con Factusol que quiera vender online con WooCommerce?<br>
    <span style="font-weight: normal; color: #475569; font-size: 13.5px; display: inline-block; margin-top: 4px;">Si es así, ¿os encaja que lo comentemos brevemente?</span>
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

function registrarEnvio(prospecto, resendId, subject) {
  try {
    const rawP = JSON.parse(fs.readFileSync(PROSPECTOS_FILE, 'utf8'));
    const target = rawP.prospectos.find((x) => x.id === prospecto.id);
    if (target) {
      target.estado = 'ENVIADO';
      target.fecha_envio = new Date().toISOString();
      target.resend_id = resendId;
    }
    fs.writeFileSync(PROSPECTOS_FILE, JSON.stringify(rawP, null, 2), 'utf8');

    if (fs.existsSync(CRM_FILE)) {
      const rawCrm = JSON.parse(fs.readFileSync(CRM_FILE, 'utf8'));
      rawCrm.historico_enviados = rawCrm.historico_enviados || [];
      rawCrm.historico_enviados.push({
        id: prospecto.id,
        destinatario: prospecto.nombre,
        contacto: prospecto.contacto_persona || prospecto.saludo,
        zona: prospecto.municipio,
        fecha_envio: new Date().toISOString().split('T')[0],
        email: prospecto.email,
        asunto: subject,
        resend_id: resendId,
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
  const prospectos = cargarProspectos();

  console.log('====================================================');
  console.log(' 🏰 CAMPAÑA BETA ALBACETE — BENTIAN ERP BRIDGE');
  console.log(` Emisor: ${SENDER}`);
  console.log(` Total prospectos en directorio: ${prospectos.length}`);
  console.log(` Modo:   ${arg}`);
  console.log('====================================================\n');

  if (arg === '--dry-run') {
    prospectos.forEach((p, i) => {
      const loc = (p.municipio || p.ciudad || 'Albacete').padEnd(28);
      console.log(`[${p.id}] ${p.nombre.padEnd(28)} | ${loc} | ${p.email.padEnd(28)} | ${p.categoria}`);
    });
    console.log('\nUso:');
    console.log('  node scripts/outreach-albacete-beta.js --dry-run');
    console.log('  node scripts/outreach-albacete-beta.js --test');
    console.log('  node scripts/outreach-albacete-beta.js --send-municipio Villarrobledo 30');
    console.log('  node scripts/outreach-albacete-beta.js --send-one AB-14');
    return;
  }

  if (arg === '--test') {
    const testTarget = 'cristianjimeneztrabajo@gmail.com';
    console.log(`📬 Enviando email de prueba de la campaña Albacete a ${testTarget} (simulando Nuteco Web)...`);
    const { subject, html, text } = generarContenido(prospectos[0]);
    try {
      const result = await enviarEmail(testTarget, `[TEST ALBACETE] ${subject}`, html, text);
      console.log(`✓ Email de prueba enviado con éxito! ID: ${result.id}`);
      console.log('👉 Revisa tu bandeja de entrada.');
    } catch (e) {
      console.error('❌ Error al enviar:', e.message);
    }
    return;
  }

  if (arg === '--send-municipio') {
    const mun = process.argv[3];
    const delaySec = parseInt(process.argv[4], 10) || 30;
    if (!mun) {
      console.error('❌ Falta especificar el municipio. Ej: --send-municipio Villarrobledo 30');
      return;
    }
    const filtrados = prospectos.filter(
      (p) => (p.municipio && p.municipio.toLowerCase().includes(mun.toLowerCase())) && p.estado !== 'ENVIADO'
    );
    if (filtrados.length === 0) {
      console.log(`ℹ️ No hay prospectos pendientes para el municipio "${mun}".`);
      return;
    }

    console.log(`🚀 Iniciando envío a ${filtrados.length} prospecto(s) de ${mun} (pausa de ${delaySec}s entre envíos)...\n`);
    for (let i = 0; i < filtrados.length; i++) {
      const p = filtrados[i];
      const { subject, html, text } = generarContenido(p);
      console.log(`[${i + 1}/${filtrados.length}] Enviando a ${p.nombre} (${p.email})...`);
      try {
        const result = await enviarEmail(p.email, subject, html, text);
        console.log(`  ✓ Enviado con éxito! Resend ID: ${result.id}`);
        registrarEnvio(p, result.id, subject);
      } catch (err) {
        console.error(`  ❌ Error al enviar a ${p.nombre}:`, err.message);
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
    console.log(`\n✨ Campaña para ${mun} finalizada con éxito.`);
    return;
  }

  if (arg === '--send-remaining') {
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

    const filtrados = prospectos.filter(p => {
      if (p.estado === 'ENVIADO') return false;
      const em = (p.email || '').toLowerCase().trim();
      const nom = (p.nombre || '').toLowerCase().trim();
      if (sentEmails.has(em)) return false;
      if (sentNames.has(nom)) return false;
      return true;
    });

    console.log(`🔒 BLINDAJE ANTI-DUPLICADOS ACTIVO:`);
    console.log(`   - Correos/Contactos capados (ya enviados previamente): ${sentEmails.size}`);
    console.log(`   - Prospectos limpios a enviar: ${filtrados.length}`);
    console.log(`   - Cadencia entre envíos: ${delaySec} segundos\n`);

    if (filtrados.length === 0) {
      console.log('✨ No quedan prospectos pendientes por enviar. Todo el directorio está completado.');
      return;
    }

    for (let i = 0; i < filtrados.length; i++) {
      const p = filtrados[i];
      const { subject, html, text } = generarContenido(p);
      console.log(`[${i + 1}/${filtrados.length}] Enviando a ${p.nombre} (${p.email}) - ${p.municipio}...`);
      try {
        const result = await enviarEmail(p.email, subject, html, text);
        console.log(`  ✓ Enviado con éxito! Resend ID: ${result.id}`);
        registrarEnvio(p, result.id, subject);
      } catch (err) {
        console.error(`  ❌ Error al enviar a ${p.nombre}:`, err.message);
      }

      if (i < filtrados.length - 1) {
        console.log(`  ⏳ Esperando ${delaySec} segundos de seguridad antes del siguiente...`);
        for (let s = delaySec; s > 0; s -= 5) {
          process.stdout.write(`    ... ${s}s restantes\r`);
          await new Promise((r) => setTimeout(r, 5000));
        }
        console.log('    ✓ Tiempo cumplido. Pasando al siguiente.\n');
      }
    }
    console.log(`\n✨ Campaña completa de Albacete finalizada con éxito.`);
    return;
  }

  if (arg === '--send-one') {
    const targetId = process.argv[3];
    const prospecto = prospectos.find((p) => p.id === targetId);
    if (!prospecto) {
      console.error(`❌ Prospecto ${targetId} no encontrado.`);
      return;
    }

    console.log(`🚀 Enviando a ${prospecto.nombre} (${prospecto.email})...`);
    const { subject, html, text } = generarContenido(prospecto);
    try {
      const result = await enviarEmail(prospecto.email, subject, html, text);
      console.log(`✓ Enviado correctamente a ${prospecto.nombre}. Resend ID: ${result.id}`);
      registrarEnvio(prospecto, result.id, subject);
    } catch (e) {
      console.error('❌ Error:', e.message);
    }
    return;
  }
}

run();
