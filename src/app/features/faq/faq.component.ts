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
      question: '¿Cómo funciona la cuota mensual en los Agentes IA?',
      answer: 'La cuota mensual cubre el consumo real de las APIs de IA (como OpenAI/Claude), la infraestructura cloud en producción y el mantenimiento/ajuste continuo del agente. Tú no necesitas gestionar claves de API ni servidores por separado.',
      isOpen: true
    },
    {
      question: '¿Cuáles son los plazos de entrega habituales?',
      answer: 'Para un desarrollo web o agente de IA inicial, el tiempo típico de entrega es de 2 a 4 semanas. En proyectos SaaS más complejos o arquitecturas custom, acordamos fases de entrega iterativas.',
      isOpen: false
    },
    {
      question: '¿Qué garantía y soporte ofreces tras el lanzamiento?',
      answer: 'Todos los proyectos incluyen un periodo de garantía de 30 días post-lanzamiento para corrección de cualquier incidencia. Además, ofrezco planes de mantenimiento continuo y bolsas de horas.',
      isOpen: false
    },
    {
      question: '¿Se puede integrar un Agente IA con mi CRM o base de datos actual?',
      answer: 'Absolutamente. Todos los agentes se pueden conectar vía API REST o Webhooks con tu CRM, base de datos PostgreSQL/MySQL o plataformas de mensajería como WhatsApp y Telegram.',
      isOpen: false
    }
  ]);

  toggleFaq(index: number) {
    this.faqs.update(items =>
      items.map((item, i) => i === index ? { ...item, isOpen: !item.isOpen } : item)
    );
  }
}
