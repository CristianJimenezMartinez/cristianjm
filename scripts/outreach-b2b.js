/**
 * Plan de Choque B2B — Envío Personalizado 1 a 1 para Agencias Web
 * Emisor oficial: Cristian Jiménez <cristian@cristianjm.com>
 * Vía: Resend API autorizada con SPF + DKIM + DMARC en cristianjm.com
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER = 'Cristian Jiménez <cristian@cristianjm.com>';

// Directorio cualificado de agencias de desarrollo e-commerce en España
const AGENCIAS = [
  {
    nombreAgencia: 'Soy.es',
    email: 'info@soy.es',
    ciudad: 'Alicante / Valencia',
    especialidad: 'desarrollo avanzado en PrestaShop y e-commerce',
    ganchoPersonalizado: 'He seguido vuestros desarrollos en PrestaShop y la solvencia con la que abordáis proyectos de catálogo extenso en Soy.es.'
  },
  {
    nombreAgencia: 'PangoStudio',
    email: 'hola@pangostudio.com',
    ciudad: 'Valencia',
    especialidad: 'tiendas online en WooCommerce y PrestaShop a medida',
    ganchoPersonalizado: 'Conozco el nivel de detalle que ponéis en PangoStudio tanto en tiendas WooCommerce como PrestaShop para empresas y distribuidores.'
  },
  {
    nombreAgencia: 'Wecomm Solutions',
    email: 'fcojavier@wecomm.es',
    ciudad: 'Alicante / Murcia',
    especialidad: 'mantenimiento y desarrollo integral de comercio electrónico',
    ganchoPersonalizado: 'Sé que en Wecomm Solutions gestionáis el mantenimiento continuo de tiendas donde la fiabilidad del catálogo y el stock es crítica.'
  },
  {
    nombreAgencia: 'Neuraweb',
    email: 'info@neuraweb.com',
    ciudad: 'La Rioja',
    especialidad: 'desarrollo de tiendas WooCommerce de alto rendimiento',
    ganchoPersonalizado: 'Veo que en Neuraweb os enfocáis en exprimir el rendimiento y la estabilidad técnica en tiendas WooCommerce.'
  },
  {
    nombreAgencia: 'Sysprovider',
    email: 'comercial@sysprovider.es',
    ciudad: 'Madrid',
    especialidad: 'soluciones de comercio electrónico e infraestructura e-commerce',
    ganchoPersonalizado: 'Conozco la trayectoria de Sysprovider gestionando proyectos de comercio electrónico con necesidades de infraestructura sólida.'
  },
  {
    nombreAgencia: 'Jabatec',
    email: 'info@jabatec.com',
    ciudad: 'Barcelona',
    especialidad: 'desarrollo de tiendas online a medida y soporte técnico',
    ganchoPersonalizado: 'En Jabatec tenéis mucha experiencia creando tiendas online personalizadas donde los clientes exigen sincronización con sus sistemas de gestión.'
  },
  {
    nombreAgencia: 'Ganton',
    email: 'contacto@ganton.es',
    ciudad: 'Madrid',
    especialidad: 'desarrollo técnico de tiendas WooCommerce',
    ganchoPersonalizado: 'He visto vuestro enfoque técnico en Ganton para proyectos de WooCommerce donde no valen las soluciones genéricas.'
  },
  {
    nombreAgencia: 'Iroot Agency',
    email: 'info@iroot.es',
    ciudad: 'Sevilla',
    especialidad: 'desarrollo y optimización de e-commerce en el sur de España',
    ganchoPersonalizado: 'Sigo el trabajo que hacéis en Iroot Agency en Andalucía creando tiendas e-commerce robustas para pymes y marcas.'
  }
];

function generarContenido(agencia) {
  const subject = `Integración Factusol ↔ WooCommerce para proyectos de ${agencia.nombreAgencia}`;
  
  const text = `Hola equipo de ${agencia.nombreAgencia},

He estado viendo vuestro trabajo en ${agencia.especialidad} y creo que podría haber una oportunidad de colaboración interesante.

Cuando un cliente utiliza Factusol y quiere vender online con WooCommerce, conectar ambos sistemas suele convertirse en un proyecto complejo: catálogo, variantes, tarifas, stock y pedidos tienen que funcionar de forma fiable, y mantener esa integración internamente puede consumir muchas horas no facturables de desarrollo y soporte.

Soy Cristian Jiménez, desarrollador de software y creador de Bentian ERP Bridge (https://bridge.cristianjm.com).

Hemos desarrollado un conector para sincronizar Factusol con WooCommerce mediante un agente local de Windows, diseñado para trabajar directamente con la instalación existente del cliente sin tener que migrar la base de datos a la nube. Ya tenemos una instalación en producción con miles de referencias operando a diario: Suministros Rubio (https://tienda.suministrosrubio.com/articulos).

La idea es colaborar con agencias como la vuestra para que podáis ofrecer esta integración a vuestros clientes sin tener que construir ni mantener toda la solución desde cero.

Nosotros nos encargaríamos de la parte específica de la conexión con Factusol, la puesta en marcha y el soporte técnico acordado. Podemos estudiar un modelo de colaboración adaptado a vuestra forma de trabajar, incluida la posibilidad de marca blanca si encaja.

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
  <p>Hola equipo de <strong>${agencia.nombreAgencia}</strong>,</p>

  <p>He estado viendo vuestro trabajo en <strong>${agencia.especialidad}</strong> y creo que podría haber una oportunidad de colaboración interesante.</p>

  <p>Cuando un cliente utiliza <strong>Factusol</strong> y quiere vender online con <strong>WooCommerce</strong>, conectar ambos sistemas puede convertirse en un proyecto complejo: catálogo, variantes, tarifas, stock y pedidos tienen que funcionar de forma fiable, y mantener esa integración puede consumir muchas horas de desarrollo y soporte.</p>

  <p>Soy Cristian Jiménez, desarrollador de software y creador de <strong>Bentian ERP Bridge</strong> (<a href="https://bridge.cristianjm.com" style="color: #4f46e5; text-decoration: underline;">bridge.cristianjm.com</a>).</p>

  <p>Hemos desarrollado un conector para sincronizar Factusol con WooCommerce mediante un agente local de Windows, diseñado para trabajar directamente con la instalación existente del cliente sin tener que trasladar la base de datos completa a la nube. Ya tenemos una instalación en producción con miles de referencias operando a diario: <a href="https://tienda.suministrosrubio.com/articulos" style="color: #4f46e5; text-decoration: underline;">Suministros Rubio</a>.</p>

  <p>La idea es colaborar con agencias como la vuestra para que podáis ofrecer esta integración a vuestros clientes sin tener que construir y mantener toda la solución internamente.</p>

  <p>Nos encargaríamos de la parte específica de la conexión con Factusol, la puesta en marcha y el soporte técnico acordado. Podemos estudiar un modelo de colaboración adaptado a vuestra forma de trabajar, incluida la posibilidad de marca blanca si encaja.</p>

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

async function run() {
  const arg = process.argv[2] || '--dry-run';

  console.log('====================================================');
  console.log(' 🚀 PLAN DE CHOQUE B2B — BENTIAN ERP BRIDGE');
  console.log(` Emisor: ${SENDER}`);
  console.log(` Modo:   ${arg}`);
  console.log('====================================================\n');

  if (arg === '--dry-run') {
    console.log(`📋 Mostrando los correos personalizados para las ${AGENCIAS.length} agencias:\n`);
    AGENCIAS.forEach((agencia, i) => {
      const { subject, text } = generarContenido(agencia);
      console.log(`--- [AGENCIA ${i + 1}/${AGENCIAS.length}: ${agencia.nombreAgencia} (${agencia.email})] ---`);
      console.log(`Asunto: ${subject}`);
      console.log(`Cuerpo:\n${text}\n`);
    });
    console.log('👉 Para enviar un email de prueba a tu bandeja de entrada:');
    console.log('   node scripts/outreach-b2b.js --test\n');
    console.log('👉 Para enviar a todas las empresas una a una:');
    console.log('   node scripts/outreach-b2b.js --send\n');
    return;
  }

  if (arg === '--test') {
    const testTarget = 'cristianjimeneztrabajo@gmail.com';
    console.log(`📬 Enviando email de prueba a ${testTarget} (simulando agencia Soy.es)...`);
    const { subject, html, text } = generarContenido(AGENCIAS[0]);
    try {
      const result = await enviarEmail(testTarget, `[TEST DE PROSPECCIÓN] ${subject}`, html, text);
      console.log(`✓ Email de prueba enviado con éxito! ID: ${result.id}`);
      console.log('👉 Revisa tu bandeja de entrada (cristianjimeneztrabajo@gmail.com).');
    } catch (e) {
      console.error('❌ Error al enviar:', e.message);
    }
    return;
  }

  if (arg === '--send') {
    console.log(`🚀 Iniciando envío secuencial a las ${AGENCIAS.length} empresas con pausa humana de seguridad (6s entre envíos)...\n`);
    for (let i = 0; i < AGENCIAS.length; i++) {
      const agencia = AGENCIAS[i];
      const { subject, html, text } = generarContenido(agencia);

      console.log(`[${i + 1}/${AGENCIAS.length}] Enviando a ${agencia.nombreAgencia} (${agencia.email})...`);
      try {
        const result = await enviarEmail(agencia.email, subject, html, text);
        console.log(`  ✓ Enviado correctamente. Resend ID: ${result.id}`);
      } catch (err) {
        console.error(`  ❌ Error al enviar a ${agencia.nombreAgencia}:`, err.message);
      }

      if (i < AGENCIAS.length - 1) {
        console.log('  ⏳ Esperando 6 segundos antes del siguiente envío...');
        await new Promise((r) => setTimeout(r, 6000));
      }
    }
    console.log('\n✨ Todos los correos del Plan de Choque han sido despachados.');
    return;
  }

  console.log('Uso: node scripts/outreach-b2b.js [--dry-run | --test | --send]');
}

run();
