import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../features/header-component/header-component';

@Component({
  selector: 'coa-info-component',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeaderComponent,
  ],
  templateUrl: './info-component.html',
  styleUrl: './info-component.scss'
})
export class InfoComponent {
  loading = false;
  
  currentLang = '';

  language_pt = 'PT';
  language_en = 'EN';
  email = 'mail@coalesceratelier.com';
  team = ['Marta Gouveia', 'Tonny Marques'];
  contacts = ['(+351) 967 512 318', '(+351) 912 741 655'];
  credit = 'Marco Cândido';

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    this.loadLocalTranslation(lang);
  }

  switchLang(lang: string) {
    this.loadLocalTranslation(lang);
  }

  private loadLocalTranslation(lang: string) {
    this.loading = true;

    Promise.all([
      import(`./info.${lang}.json`),
      import(`../../features/header-component/header.${lang}.json`)
    ]).then(([infoModule, headerModule]) => {
      this.translate.setTranslation(lang, {
        ...headerModule.default,
        ...infoModule.default
      }, true);

      this.translate.use(lang).subscribe(() => {
        this.currentLang = lang;
        this.loading = false;
      });
    }).catch(err => {
      this.loading = false;
    });
  }
}