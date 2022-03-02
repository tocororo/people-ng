
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundPeopleComponent } from './page-not-found-people/page-not-found-people.component';

const routes: Routes = [
	{
		path: 'people',
		loadChildren: () => import('./people/people.module').then(mod => mod.PeopleModule)
	},
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: '**',
		component: PageNotFoundPeopleComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule
{ }
