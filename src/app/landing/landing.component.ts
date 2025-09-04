import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { LeadFormComponent } from '../lead-form/lead-form.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NgOptimizedImage, 
    TranslocoModule, 
    LeadFormComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './landing.component.scss',
  templateUrl: './landing.component.html'
})
export class LandingComponent {
  private readonly transloco = inject(TranslocoService);

  isModalOpen = signal(false);
  modalTitle = signal('');

  openModal(title: string) {
    this.modalTitle.set(title);
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }

  setLang(lang: 'en' | 'hy' | 'ru') {
    this.transloco.setActiveLang(lang);
  }
}
