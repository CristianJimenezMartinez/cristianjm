import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  submitError = signal<string | null>(null);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    service: ['factusol-bridge', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

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
          this.contactForm.reset({ service: 'factusol-bridge' });
        } else {
          this.submitError.set(res?.message || 'Ocurrió un error al procesar el mensaje. Inténtalo de nuevo.');
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const errMsg = err?.error?.error?.message || err?.error?.message;
        this.submitError.set(errMsg || 'No se pudo conectar con el servidor de envíos. Por favor escríbeme directamente a cristianjimeneztrabajo@gmail.com');
      }
    });
  }
}
