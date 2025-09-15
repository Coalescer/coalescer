import { Injectable } from '@angular/core';
import projectsAssetsJson from '../projects/projects.assets.json';

const projectsAssets = projectsAssetsJson as ProjectsAssetsMap;

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projects = [
    {
      id: 'capote',
      title: 'Capote',
      thumbnail: '../../assets/imgs/home/capote-01.jpg'
    },
  ];

  getAllProjects() {
    return this.projects;
  }
  
  getProjectImages(id: string) {
    return projectsAssets[id];
  }

  async getProjectTranslations(id: string, lang: 'pt' | 'en') {
    const translations = await import(`../projects/${id}/translations/${id}.${lang}.json`);
    return translations.default;
  }
}
