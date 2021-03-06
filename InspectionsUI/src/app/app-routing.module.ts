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
    component: MainComponent,
    // children: [
    //   {
    //     path: '',
    //     component: MainComponent
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: EditComponent
    //   }
    // ]
  },
  {
    path: 'inspections/create',
    component: EditComponent
  },
  {
    path: 'inspections/edit/:id',
    component: EditComponent
  },
  {
    path: '**',
    redirectTo: 'inspections'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
