import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'coa-header-component',
  imports: [
    CommonModule, 
    RouterModule, 
    TranslateModule,
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    this.loadHeaderTranslation(lang);
  }

  private loadHeaderTranslation(lang: string) {
    import(`./header.${lang}.json`).then(module => {
      this.translate.setTranslation(lang, module.default ?? module, true);
    }).catch(err => {
      console.error(`Erro ao carregar tradução do header (${lang}):`, err);
    });
  }
}
