
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundPeopleComponent } from './page-not-found-people/page-not-found-people.component';
import { SearchComponent } from './search/search.component';
import {PeopleViewComponent} from "./people-view/people-view.component";
import {Layouts} from "./app.component";

const routes: Routes = [
	// {
  //       path: 'profile',
  //       component: ProfileComponent,
  //       data: { layout: Layouts.Main },
  //   },
	{
		path: '',
		component: HomeComponent,
    data: { layout: Layouts.Main },
	},
	{
    path: 'search',
    component: SearchComponent,
    data: { layout: Layouts.Main },
    },
	{
		path: ':id/profile',
		component: PeopleViewComponent,
    data: { layout: Layouts.People },
	},
	// {
	// 	path: '**',
	// 	component: PageNotFoundPeopleComponent
	// }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule
{ }
