import { Routes } from '@angular/router';
import { NoticiasComponent } from './components/noticias.component';

export const routes: Routes = [
  {
    path: '',
    component: NoticiasComponent
  },
  {
    path: 'noticias',
    component: NoticiasComponent
  }
];
