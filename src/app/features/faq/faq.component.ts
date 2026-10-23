import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = signal<FaqItem[]>([
    {
      question: '¿Qué incluyen exactamente los Planes Mensuales para Empresas (200 € / 350 € / 500 €)?',
      answer: 'Actúo como tu departamento externo de Ingeniería, DevSecOps y ERP. Desde 200 €/mes mantengo tu plataforma en un servidor central blindado (o gestiono tu VPS), versiono todo el código en un repositorio privado de GitHub con despliegues automáticos sin caídas (Zero-Downtime), aplico parches inmediatos ante vulnerabilidades críticas (CVE) en Node.js, PHP o dependencias, realizo copias de seguridad diarias cifradas y monitorizo tus servicios 24/7.',
      isOpen: true
    },
    {
      question: 'Nuestra empresa tiene una web en Node.js, Angular, React o PHP pero no tenemos equipo técnico interno, ¿puedes hacerte cargo?',
      answer: 'Sí. Realizo una auditoría inicial de seguridad y estado, organizo todo vuestro código en GitHub privado con flujos de despliegue limpios, actualizo las versiones vulnerables (como parches LTS de Node.js o PHP) y asumo el soporte técnico y evolutivo continuo para que no dependáis de agencias lentas ni freelancers puntuales.',
      isOpen: false
    },
    {
      question: '¿Es necesario abrir puertos en el router o exponer mi base de datos de Factusol?',
      answer: 'No, jamás. Toda la arquitectura de Bentian ERP Bridge funciona mediante conexiones salientes seguras HTTPS con modelo Local-First. Tu base de datos Factusol (Access .accdb) nunca se expone a internet, eliminando cualquier vector de intrusión o ransomware.',
      isOpen: false
    },
    {
      question: '¿Puedo seguir usando Factusol en la oficina mientras se sincroniza con la tienda online?',
      answer: 'Sí, 100% compatible. El motor de sincronización accede mediante OLEDB en modo concurrente no bloqueante (Share Deny None), sin bloquear archivos (.laccdb) ni ralentizar el trabajo diario de facturación, mostrador o almacén en tu red local.',
      isOpen: false
    },
    {
      question: '¿Qué ocurre si se corta la conexión a internet o se apaga el servidor local?',
      answer: 'El sistema incorpora tolerancia offline de hasta 30 días con arquitectura Store-and-Forward y almacenamiento local mediante JSON Atómico Certificado con protección Anti-Wiping. Si se interrumpe la red, los pedidos se custodian de forma segura y se inyectan automáticamente en Factusol al volver la conexión, sin pérdidas ni duplicados.',
      isOpen: false
    },
    {
      question: '¿Tienen permanencia los planes mensuales y cómo se realiza la facturación?',
      answer: 'No existe permanencia forzosa: confío plenamente en la estabilidad y el valor técnico del servicio mes a mes. Se emite factura oficial B2B mensual deducible y firmamos un Acuerdo de Confidencialidad (NDA) desde el primer día para proteger el código y los datos de tu empresa.',
      isOpen: false
    }
  ]);

  toggleFaq(index: number) {
    this.faqs.update(items =>
      items.map((item, i) => i === index ? { ...item, isOpen: !item.isOpen } : item)
    );
  }
}
