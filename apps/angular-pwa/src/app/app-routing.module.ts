import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoleculeHomeComponent } from './molecules/molecule-home/molecule-home.component';

const routes: Routes = [
  { path: '', component: MoleculeHomeComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
