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
    service: ['ia-agents', [Validators.required]],
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

    const formData = {
      access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      service: this.contactForm.value.service,
      message: this.contactForm.value.message,
      from_name: 'CristianJM Web Corporativa'
    };

    this.http.post('https://api.web3forms.com/submit', formData).subscribe({
      next: (res: any) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.submitSuccess.set(true);
          this.contactForm.reset({ service: 'ia-agents' });
        } else {
          this.submitError.set('Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.');
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitError.set('No se pudo conectar con el servidor de envíos. Por favor escríbeme directamente a hola@cristianjm.com');
      }
    });
  }
}
