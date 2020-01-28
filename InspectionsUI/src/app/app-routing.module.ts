import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './inspection/edit/edit.component';
import { MainComponent } from './inspection/main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inspections',
    pathMatch: 'full'
  },
  {
    path: 'inspections',
    component: MainComponent
  },
  {
    path: 'create',
    component: EditComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: '**',
    redirectTo: 'inspections'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
