import { Component, inject, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  submitError = signal<string | null>(null);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
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

  onSubmit() {
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
