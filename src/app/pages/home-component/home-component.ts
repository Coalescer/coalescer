import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../features/header-component/header-component';

@Component({
  selector: 'coa-home-component',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    HeaderComponent
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent {
  projects: any[] = [];
  currentLang = '';
  language_pt = 'PT';
  language_en = 'EN';

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    
    this.projects = this.projectsService.getAllProjects();
    this.loadLocalTranslation(lang);
  }

  openProject(id: string) {
    this.router.navigate(['/projects', id]);
  }

  switchLang(lang: string) {
    this.loadLocalTranslation(lang);
  }

  private loadLocalTranslation(lang: string) {
    Promise.all([
      import(`./home.${lang}.json`),
      import(`../../features/header-component/header.${lang}.json`)
    ]).then(([homeModule, headerModule]) => {
      this.translate.setTranslation(
        lang,
        { ...headerModule.default, ...homeModule.default },
        true
      );

      this.translate.use(lang).subscribe(() => {
        this.currentLang = lang;
      });
    });
  }
}
