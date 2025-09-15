import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule  } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'coa-landing-component',
  standalone: true, 
  imports: [
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './landing-component.html',
  styleUrl: './landing-component.scss'
})
export class LandingComponent {
  loading = false;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    this.loadLocalTranslation(lang);
  }

  ngAfterViewInit() {
    const video = document.querySelector('video');

    if (video) {
      video.muted = true;
      video.play().catch(() => {
        console.error('Error playing video automatically.');
      });
    }
  }
  
  goToHome() {
    this.router.navigate(['/home']);
  }

  private loadLocalTranslation(lang: string) {
    this.loading = true;

    import(`./landing.${lang}.json`).then(module => {
      this.translate.setTranslation(lang, module.default, true);
      this.translate.use(lang).subscribe(() => {
        this.loading = false;
      });
    });
  }
}