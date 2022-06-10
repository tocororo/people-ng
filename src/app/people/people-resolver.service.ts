
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { SearchResponse } from 'toco-lib';

import { Person } from './person.entity';
import { PeopleService } from './people.service';

/**
 * This resolver is used on all views in order to get information from the backend about a `Person`. 
 * In the case of adding view, it needs to resolve an object with all its values set to empty. 
 * In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. 
 */
@Injectable({
	providedIn: 'root',
})
export class PersonResolverService implements Resolve<SearchResponse<Person>>
{
	public constructor(private _transServ: TranslateService, private _peopleService: PeopleService)
	{ }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchResponse<Person>>
	{
		/* In the case of adding view, this occurs when the `uuid` variable is `undefined`, 
		it needs to get an object with all its values set to `undefined`. 
		This is a great optimization that you can implement in the backend. */

		/* In the case of remaining views (viewing and editing views), this occurs when the `uuid` variable is NOT `undefined`, 
		it needs to get an object set to the stored data. */

        let uuid = route.paramMap.get('uuid');

        console.log('From PersonResolverService called getPersonById \n', 'Person id: ', uuid, '_transServ.currentLang: ', this._transServ.currentLang);

		return this._peopleService.getPersonById(uuid, this._transServ.currentLang);
	}
}
