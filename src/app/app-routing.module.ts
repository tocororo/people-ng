
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundPeopleComponent } from './page-not-found-people/page-not-found-people.component';
import { ProfileComponent } from './people/profile/profile.component';
import { SearchComponent } from './people/search/search.component';

const routes: Routes = [
	{
		path: 'person',
		loadChildren: () => import('./people/people.module').then(mod => mod.PeopleModule)
	},
	{
        path: 'profile',
        component: ProfileComponent
    },
	{
        path: 'search',
        component: SearchComponent
    },
	{
		path: '',
		component: HomeComponent,
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
