
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionText } from 'toco-lib';

import { SearchComponent } from './search/search.component';
import { PeopleComponent } from './people/people.component';
import { PersonResolverService } from './people-resolver.service';
import { ProfileComponent } from './profile/profile.component';

const surveyRoutes: Routes = [
    
	{
		path: '',
		component: PeopleComponent,
        resolve: {
            /**
             * This resolver is used on all views. 
             * In the case of viewing view, it needs to resolve an object from the backend. 
             * In the case of adding view, it needs to resolve an object with all its values set to empty. 
             * In the case of editing view, it needs to resolve an object from the backend. 
             */
            'person': PersonResolverService
        },
		// children: [
        //     {
        //         path: ':uuid/' + ActionText.view,
        //         component: SurveyViewComponent
        //     },
        //     {
        //         path: ActionText.add,
        //         component: SurveyQuestionsComponent
        //     },
        //     {
        //         path: '',
        //         redirectTo: '/survey/' + ActionText.add,
        //         pathMatch: 'full'
        //     }
        // ]
	}
];

@NgModule({
	imports: [RouterModule.forChild(surveyRoutes)],

	exports: [RouterModule]
})
export class PeopleRoutingModule
{ }
