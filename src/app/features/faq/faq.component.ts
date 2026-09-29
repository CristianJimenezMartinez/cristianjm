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
      question: '¿Es necesario abrir puertos en el router o exponer mi base de datos de Factusol?',
      answer: 'No, en absoluto. Toda la arquitectura funciona mediante conexiones salientes seguras HTTPS con modelo Local-First. Tu base de datos Factusol (Access .accdb) jamás se expone a internet, eliminando cualquier vector de intrusión externa.',
      isOpen: true
    },
    {
      question: '¿Puedo seguir usando Factusol en la oficina mientras se sincroniza con la web?',
      answer: 'Sí, 100% compatible. El motor de sincronización accede mediante OLEDB en modo concurrente optimizado, sin bloquear tablas ni ralentizar el trabajo diario de facturación, almacén o contabilidad en tu red local.',
      isOpen: false
    },
    {
      question: '¿Qué ocurre si se corta la conexión a internet o la luz en la oficina?',
      answer: 'El sistema incorpora tolerancia offline de hasta 30 días con arquitectura Store-and-Forward. Si se interrumpe la red, los pedidos se encolan de forma segura y se inyectan automáticamente en Factusol en cuanto vuelve la conexión, sin pérdida ni duplicados.',
      isOpen: false
    },
    {
      question: '¿Qué plataformas eCommerce son compatibles con la sincronización?',
      answer: 'Disponemos de conector nativo para WooCommerce y PrestaShop, además de soporte para tiendas personalizadas mediante Universal Bridge API. Sincroniza catálogo, stock disponible (DISSTO), tarifas y albaranes/pedidos en tiempo real.',
      isOpen: false
    }
  ]);

  toggleFaq(index: number) {
    this.faqs.update(items =>
      items.map((item, i) => i === index ? { ...item, isOpen: !item.isOpen } : item)
    );
  }
}
