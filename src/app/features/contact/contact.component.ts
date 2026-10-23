import { Component, inject, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface AuditCheckItem {
  id: string;
  label: string;
  status: 'pass' | 'warn' | 'fail';
  value: string;
  recommendation: string;
}

export interface DomainAuditResult {
  domain: string;
  finalUrl: string;
  timestamp: string;
  score: number;
  riskLevel: 'BAJO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';
  ttfbMs: number;
  statusCode: number;
  tlsProtocol: string | null;
  sslDaysRemaining: number | null;
  exposedServer: string | null;
  exposedPoweredBy: string | null;
  wafDetected: string | null;
  checks: AuditCheckItem[];
  recommendedPlan: 'plan-cloud-200' | 'plan-erp-350';
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Live Domain Audit State
  auditDomainInput = '';
  isAuditing = signal<boolean>(false);
  auditResult = signal<DomainAuditResult | null>(null);
  auditError = signal<string | null>(null);

  // Contact Form State
  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  submitError = signal<string | null>(null);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    website: [''],
    service: ['plan-erp-350', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  private planSelectListener = (event: Event) => {
    const customEvt = event as CustomEvent<string>;
    if (customEvt?.detail) {
      this.contactForm.patchValue({ service: customEvt.detail });
    }
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('select-contact-service', this.planSelectListener);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('select-contact-service', this.planSelectListener);
    }
  }

  runDomainAudit(): void {
    const clean = (this.auditDomainInput || '').trim();
    if (!clean || clean.length < 4) {
      this.auditError.set('Introduce el dominio web de tu empresa (ej: tuempresa.com).');
      return;
    }

    this.isAuditing.set(true);
    this.auditError.set(null);

    this.http.post<{ success: boolean; data: DomainAuditResult }>(
      'https://bridge.cristianjm.com/api/v1/audit-domain',
      { domain: clean }
    ).subscribe({
      next: (res) => {
        this.isAuditing.set(false);
        if (res?.success && res.data) {
          this.auditResult.set(res.data);
          this.contactForm.patchValue({ website: res.data.domain });
        } else {
          this.auditError.set('No se pudo completar el análisis del dominio.');
        }
      },
      error: (err) => {
        this.isAuditing.set(false);
        const msg = err?.error?.error?.message || 'No se pudo conectar con el dominio indicado. Verifica que esté escrito correctamente.';
        this.auditError.set(msg);
      }
    });
  }

  applyAuditToForm(result: DomainAuditResult): void {
    const failedChecks = result.checks
      .filter((c) => c.status !== 'pass')
      .map((c) => `- ${c.label}: ${c.value}`)
      .join('\n');

    const summaryMsg =
      `Solicito propuesta técnica para blindar el dominio ${result.domain} ` +
      `(Puntuación actual: ${result.score}/100 · Nivel de Riesgo: ${result.riskLevel} · TTFB: ${result.ttfbMs} ms).\n\n` +
      `Puntos detectados a corregir:\n${failedChecks || '- Revisión integral de servidor y cabeceras'}`;

    this.contactForm.patchValue({
      website: result.domain,
      service: 'audit-remediation',
      message: summaryMsg
    });

    if (isPlatformBrowser(this.platformId)) {
      const formEl = document.getElementById('contact-form-box');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  getWhatsAppAuditUrl(result: DomainAuditResult): string {
    const text = `Hola Cristian, acabo de analizar el dominio de mi empresa (${result.domain}) en cristianjm.com y ha obtenido una puntuación de seguridad de ${result.score}/100 (Riesgo ${result.riskLevel}). Me gustaría consultar cómo blindarlo con vuestros planes mensuales.`;
    return `https://wa.me/34617205053?text=${encodeURIComponent(text)}`;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.submitSuccess.set(false);

    const payload = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      website: this.contactForm.value.website,
      service: this.contactForm.value.service,
      message: this.contactForm.value.message,
      source: 'cristianjm.com'
    };

    this.http.post('https://bridge.cristianjm.com/api/v1/contact', payload).subscribe({
      next: (res: any) => {
        this.isSubmitting.set(false);
        if (res?.success) {
          this.submitSuccess.set(true);
          this.contactForm.reset({ service: 'plan-erp-350' });
        } else {
          this.submitError.set(res?.message || 'Ocurrió un error al procesar el mensaje. Inténtalo de nuevo.');
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const errMsg = err?.error?.error?.message || err?.error?.message;
        this.submitError.set(errMsg || 'No se pudo conectar con el servidor de envíos. Por favor escríbeme directamente a cristian@cristianjm.com o al +34 617 205 053');
      }
    });
  }
}
