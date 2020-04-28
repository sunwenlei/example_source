import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsComponent } from './persons/persons.component';
import { AppComponent } from './app.component';
import { Person_detailComponent } from './person_detail/person_detail.component';


const routes: Routes = [
  // {path: '', component: AppComponent, pathMatch: 'full'},
  {path: 'persons', component: PersonsComponent},
  {path: 'person_detail', component: Person_detailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
