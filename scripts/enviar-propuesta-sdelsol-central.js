/**
 * Script de envío de la Propuesta de Homologación Tecnológica a la Central de Software DELSOL
 * Emisor: Cristian Jiménez <cristian@cristianjm.com>
 * Destinatarios: altas.distribucion@sdelsol.com, comercial@sdelsol.com
 */

const https = require('https');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER = 'Cristian Jiménez <cristian@cristianjm.com>';

const TO_EMAILS = [
  'altas.distribucion@sdelsol.com',
  'comercial@sdelsol.com'
];

const SUBJECT = 'Propuesta de Solución Tecnológica Homologada: Conector Factusol ↔ WooCommerce (Bentian ERP Bridge)';

const TEXT_CONTENT = `Estimado equipo del Canal de Distribución y Alianzas de Software DELSOL,

Me pongo en contacto con vosotros desde Alicante para presentaros formalmente Bentian ERP Bridge (https://bridge.cristianjm.com), un conector tecnológico de escritorio y servicio nativo para Windows diseñado para resolver la sincronización bidireccional entre Factusol y tiendas online WooCommerce en tiempo real.

Como bien sabéis, Factusol es el estándar de gestión para miles de pymes en España. Sin embargo, cuando estos clientes deciden vender por internet en WooCommerce, se encuentran con que muchas agencias de desarrollo web les recomiendan migrar a ERPs en la nube (Holded, Odoo, Shopify), lo que provoca una fuga evitable de licencias y mantenimiento anual tanto para DELSOL como para vuestra red de distribuidores oficiales (TeamPartners).

Para solucionar este problema de raíz, desarrollamos Bentian ERP Bridge con tres pilares arquitectónicos clave:

1. Arquitectura Local y No Intrusiva: Opera directamente contra la base de datos local de Factusol (.accdb, red local o NAS) mediante transacciones atómicas seguras. No modifica estructuras internas de datos ni interfiere en la operativa diaria de la oficina.
2. Tolerancia a Caídas de Red y Servidor: Diseñado específicamente con blindaje anti-wiping para soportar rutas UNC y microcortes de conexión sin bloqueos OLEDB ni caídas de servicio.
3. Validación en Producción Real: Actualmente opera a diario sincronizando catálogos de más de 1.500 referencias con variantes y control de stock en tiempo real en clientes reales (como Suministros Rubio: https://tienda.suministrosrubio.com/articulos). Además, cuenta con plugin oficial registrado en la Fundación WordPress (slug: bentian-erp-bridge-for-factusol).

¿Qué os proponemos como Partner Tecnológico?
- Homologación / recomendación técnica de Bentian ERP Bridge como solución contrastada de integración WooCommerce para la red TeamPartner y soporte comercial de Factusol Web.
- Licencias NFR (Not For Resale) de laboratorio gratuitas e ilimitadas para vuestros técnicos, formadores y equipo de soporte en Geolit (Mengíbar), para que podáis testear a fondo la herramienta con bases de datos de Factusol 2024, 2025 y 2026.
- Retención directa de clientes: Ayudar a que vuestras pymes sigan usando Factusol como núcleo de facturación durante muchos años sin necesidad de cambiar de ERP.

¿Sería posible coordinar una breve llamada técnica o enviaros un paquete de licencias de prueba para vuestro laboratorio?

Quedo a vuestra total disposición.

Atentamente,

Cristian Jiménez Martínez
Arquitecto de Software & Fundador de Bentian ERP Bridge
Email: cristian@cristianjm.com
Web Oficial: https://bridge.cristianjm.com
Web Personal: https://cristianjm.com
Tel / WhatsApp: +34 669 98 78 88
Alicante, España`;

const HTML_CONTENT = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14.5px; line-height: 1.65; color: #1f2937; max-width: 650px; margin: 0; padding: 16px;">
  <p>Estimado equipo del Canal de Distribución y Alianzas de <strong>Software DELSOL</strong>,</p>

  <p>Me pongo en contacto con vosotros para presentaros formalmente <strong>Bentian ERP Bridge</strong> (<a href="https://bridge.cristianjm.com" style="color: #4f46e5; text-decoration: underline;">bridge.cristianjm.com</a>), un conector tecnológico de escritorio y servicio nativo para Windows diseñado para resolver la sincronización bidireccional entre <strong>Factusol</strong> y tiendas online <strong>WooCommerce</strong> en tiempo real.</p>

  <p>Como bien sabéis, Factusol es el estándar de gestión para miles de pymes en España. Sin embargo, cuando estos clientes deciden vender por internet en WooCommerce, se encuentran con que muchas agencias de desarrollo web les recomiendan migrar a ERPs en la nube (Holded, Odoo, Shopify), lo que provoca una fuga evitable de licencias y mantenimiento anual tanto para DELSOL como para vuestra red de distribuidores oficiales (<strong>TeamPartners</strong>).</p>

  <p>Para solucionar este problema de raíz, desarrollamos Bentian ERP Bridge con tres pilares arquitectónicos clave:</p>

  <ul style="padding-left: 20px; color: #374151;">
    <li style="margin-bottom: 8px;"><strong>Arquitectura Local y No Intrusiva:</strong> Opera directamente contra la base de datos local de Factusol (.accdb, red local o NAS) mediante transacciones atómicas seguras. No modifica estructuras internas de datos ni interfiere en la operativa diaria de la oficina.</li>
    <li style="margin-bottom: 8px;"><strong>Tolerancia a Caídas de Red y Servidor:</strong> Diseñado específicamente con blindaje anti-wiping para soportar rutas UNC y microcortes de conexión sin bloqueos OLEDB ni caídas de servicio.</li>
    <li style="margin-bottom: 8px;"><strong>Validación en Producción Real:</strong> Actualmente opera a diario sincronizando catálogos de más de 1.500 referencias con variantes y control de stock en tiempo real en clientes reales (como Suministros Rubio: <a href="https://tienda.suministrosrubio.com/articulos" style="color: #4f46e5;">tienda.suministrosrubio.com/articulos</a>). Además, cuenta con plugin oficial registrado en la Fundación WordPress (slug: <code>bentian-erp-bridge-for-factusol</code>).</li>
  </ul>

  <p style="font-weight: 600; color: #111827; margin-top: 18px;">¿Qué os proponemos como Partner Tecnológico?</p>
  <ol style="padding-left: 20px; color: #374151;">
    <li style="margin-bottom: 8px;"><strong>Homologación y recomendación técnica</strong> de Bentian ERP Bridge como solución contrastada de integración WooCommerce para la red TeamPartner y soporte comercial de Factusol Web.</li>
    <li style="margin-bottom: 8px;"><strong>Licencias NFR (Not For Resale) de laboratorio gratuitas e ilimitadas</strong> para vuestros técnicos, formadores y equipo de soporte en Geolit (Mengíbar), para que podáis testear a fondo la herramienta con bases de datos de Factusol 2024, 2025 y 2026.</li>
    <li style="margin-bottom: 8px;"><strong>Retención directa de clientes:</strong> Ayudar a que vuestras pymes sigan usando Factusol como núcleo de facturación durante muchos años sin necesidad de cambiar de ERP.</li>
  </ol>

  <p>¿Sería posible coordinar una breve llamada técnica o enviaros un paquete de licencias de prueba para vuestro laboratorio?</p>

  <p>Quedo a vuestra total disposición.</p>

  <p style="margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 16px; color: #4b5563; font-size: 13.5px;">
    <strong>Cristian Jiménez Martínez</strong><br>
    Arquitecto de Software & Fundador de Bentian ERP Bridge<br>
    Email: <a href="mailto:cristian@cristianjm.com" style="color: #4f46e5;">cristian@cristianjm.com</a><br>
    Web Oficial: <a href="https://bridge.cristianjm.com" style="color: #4f46e5;">bridge.cristianjm.com</a> · Web Personal: <a href="https://cristianjm.com" style="color: #4f46e5;">cristianjm.com</a><br>
    Alicante, España
  </p>
</body>
</html>
`;

function sendEmail() {
  console.log('Enviando propuesta a Software DELSOL...');
  console.log('Destinatarios:', TO_EMAILS);

  const payload = JSON.stringify({
    from: SENDER,
    to: TO_EMAILS,
    reply_to: 'cristian@cristianjm.com',
    subject: SUBJECT,
    text: TEXT_CONTENT,
    html: HTML_CONTENT
  });

  const options = {
    hostname: 'api.resend.com',
    port: 443,
    path: '/emails',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('✅ Propuesta enviada con éxito a Software DELSOL:', responseData);
      } else {
        console.error(`❌ Error al enviar (${res.statusCode}):`, responseData);
      }
    });
  });

  req.on('error', (err) => {
    console.error('❌ Error de conexión:', err);
  });

  req.write(payload);
  req.end();
}

if (process.argv.includes('--send')) {
  sendEmail();
} else {
  console.log('Modo preview. Para enviar ejecuta: node scripts/enviar-propuesta-sdelsol-central.js --send');
  console.log('Asunto:', SUBJECT);
  console.log('Destinatarios:', TO_EMAILS);
}
