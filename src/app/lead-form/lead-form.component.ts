import { ChangeDetectionStrategy, Component, output, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input class="mt-1 w-full border rounded px-3 py-2" formControlName="name" type="text" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input class="mt-1 w-full border rounded px-3 py-2" formControlName="email" type="email" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Phone</label>
        <input class="mt-1 w-full border rounded px-3 py-2" formControlName="phone" type="tel" />
      </div>
      <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded" type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class LeadFormComponent {
  private readonly fb = inject(FormBuilder);

  submitted = signal(false);
  readonly submittedEvent = output<{ name: string; email: string; phone: string }>();

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['']
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.submitted.set(true);
    this.submittedEvent.emit(this.form.getRawValue());
  }
}
