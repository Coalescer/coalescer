import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { HeaderComponent } from "../../features/header-component/header-component";

@Component({
  selector: 'coa-projects-component',
  standalone: true, 
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './projects-component.html',
  styleUrl: './projects-component.scss'
})
export class ProjectsComponent {
  project: any;
  images: string[] = [];
  lineDraws: string[] = [];
  lang: 'pt' | 'en' = 'pt';
  
  leftIndex = 0;
  rightIndex = 0;

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.project = await this.projectsService.getProjectTranslations(id, this.lang);

    const { images, lineDraws } = this.projectsService.getProjectImages(id);

    this.images = images;
    this.lineDraws = lineDraws;

    this.loading = false;
    this.cdr.detectChanges();
  }
  
  onCarouselClick(event: MouseEvent, side: 'left' | 'right') {
    const target = event.currentTarget as HTMLElement;
    const clickX = event.offsetX;
    const half = target.clientWidth / 2;
    
    const direction = clickX < half ? 'prev' : 'next';
    this.changeSlide(side, direction);
  }
  
  changeSlide(side: 'left' | 'right', direction: 'prev' | 'next') {
    if (side === 'left') {
      const max = this.images.length;
      this.leftIndex = direction === 'next'
      ? (this.leftIndex + 1) % max
      : (this.leftIndex - 1 + max) % max;
    } else {
      const max = this.lineDraws.length;
      this.rightIndex = direction === 'next'
      ? (this.rightIndex + 1) % max
      : (this.rightIndex - 1 + max) % max;
    }
  }

  async switchLang(lang: 'pt' | 'en') {
    const id = this.route.snapshot.paramMap.get('id')!;
    
    this.lang = lang;
    this.project = await this.projectsService.getProjectTranslations(id, lang);
    this.cdr.detectChanges();
  }
}