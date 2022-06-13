
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundPeopleComponent } from './page-not-found-people/page-not-found-people.component';
import { ProfileComponent } from './people/profile/profile.component';
import { SearchComponent } from './people/search/search.component';
import {PeopleViewComponent} from "./people-view/people-view.component";
import {Layouts} from "./app.component";

const routes: Routes = [
	{
		path: 'person',
		loadChildren: () => import('./people/people.module').then(mod => mod.PeopleModule),
    data: { layout: Layouts.Main },
	},
	{
        path: 'profile',
        component: ProfileComponent,
        data: { layout: Layouts.Main },
    },
	{
        path: 'search',
        component: SearchComponent,
        data: { layout: Layouts.Main },
    },
	{
		path: '',
		component: HomeComponent,
    data: { layout: Layouts.Main },
	},
	{
		path: 'people-info/:id',
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
