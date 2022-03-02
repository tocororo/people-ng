
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { cloneValue, Environment, Hit } from 'toco-lib';

import { Person } from './person.entity';

/**
 * Represents an object with all its values set to `undefined` in Spanish language. 
 * An empty person must have its `id` and `resultAndRecoms` fields set to `undefined`. 
 */
const personEmpty_Spanish: any = {
    'metadata': {
        'id': undefined,  /* An empty person must have its `id` set to `undefined`. */
        'name': '',
        'lastName': ''
    }
};

/**
 * Represents an object with all its values set to `undefined` in English language. 
 * An empty person must have its `id` and `resultAndRecoms` fields set to `undefined`. 
 */
const personEmpty_English: any = {
    'metadata': {
        'id': undefined,  /* An empty person must have its `id` set to `undefined`. */
        'user': '',
        'date': ''
    }
};

/**
 * Represents an object used as mock data in Spanish language. 
 */
const personExample_Spanish: any = {
    'metadata': {
        'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
        'name': 'Name000',
        'lastName': 'LastName000 LastName000'
    }
};

/**
 * Represents an object used as mock data in English language. 
 */
const personExample_English: any = {
    'metadata': {
        'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
        'name': 'Name000',
        'lastName': 'LastName000 LastName000'
    }
};

/**
 * Represents the service that communicates with the backend for all issues 
 * that refer to work with people. 
 */
@Injectable({
	providedIn: 'root'
})
export class PeopleService
{
	private _prefix = 'people';

	private _httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ',
		}),
	};

	public constructor(private _env: Environment, private _router: Router, private _http: HttpClient)
	{ }

	/**
	 * Constructs a `GET` request that interprets the body as a JSON object and returns 
	 * the response body in the `Hit<Person>` type. 
	 * @param id Person id. 
	 * In the case of adding view, this `id` argument is `undefined` (maybe only in the first use of this method). 
	 * In the case of remaining views (viewing and editing views), this `id` argument is NOT `undefined`. 
	 * @param currentLang Language currently used as string. 
	 * The Spanish language is: 'es'. 
	 * The English language is: 'en'. 
	 * @return An `Observable` of the `HTTPResponse`, with a response body in the `Hit<Person>` type. 
	 */
	public getPersonById(id: string, currentLang: string): Observable<Hit<Person>>
	{
//// Backend data //////////////////////////
		// // TODO: Test and fix any issue when connecting to the backend. 

		// /* In the case of adding view, this occurs when the `id` argument is `undefined`, 
		// it needs to get an object with all its values set to `undefined`, and 
        // the `resultAndRecoms` field set to `undefined`. 
		// This is a great optimization that you can implement in the backend. */
		// // TODO: I think that we need to crete `_env.peopleApi` field and use it instead of `_env.cuorApi`. 
		// let req: string = this._env.cuorApi + 'people/';

		// /* In the case of remaining views (viewing and editing views), this occurs when the `id` argument is NOT `undefined`, 
		// it needs to get an object set to the stored data. */
		// if (id)
		// {
		// 	req += id + '/';
		// }
		// // console.log(req);

		// return this._http.get<Hit<Person>>(req, { params: { 'currentLang': currentLang } }).pipe(
		// 	map(hit => {
		// 		if (hit)
		// 		{
		// 			return hit;
		// 		}
		// 		else
		// 		{
		// 			// TODO: Do a better processing for this case; for example, show an error message before redirecting to home view. 
		// 			this._router.navigate(['/']);
		// 		}
		// 	})
		// );
////////////////////////////////////////////


//// Mock data /////////////////////////////
        let res: any;

		if (id)
		{
			/* In the case of remaining views (viewing and editing views), this occurs when the `id` argument is NOT `undefined`, 
			it needs to get an object set to the stored data. */

            if (currentLang == 'es')
            {
                res = cloneValue(personExample_Spanish);
            }
            else
            {
                res = cloneValue(personExample_English);
            }
		}
		else
		{
			/* In the case of adding view, this occurs when the `id` argument is `undefined`, 
			it needs to get an object with all its values set to `undefined`, and 
            the `resultAndRecoms` field set to `undefined`. 
			This is a great optimization that you can implement in the backend. */

            if (currentLang == 'es')
            {
                res = cloneValue(personEmpty_Spanish);
            }
            else
            {
                res = cloneValue(personEmpty_English);
            }
		}

        return of(res);
////////////////////////////////////////////
	}

	public editPerson(person: Person): Observable<any>
	{
//// Backend data //////////////////////////
		// // TODO: Poner correctamente el campo `this._env.sceibaApi` o crear un `this._env.peopleApi`. 
		// const url: string = this._env.sceibaApi + this._prefix + '/' + person.id;

        // /* It is NOT necessary to indicate the language. */
		// return this._http.put<Hit<Person>>(url, JSON.stringify(person), this._httpOptions);
////////////////////////////////////////////


//// Mock data /////////////////////////////
		console.error('editPerson: There is not backend yet!', person);
		return of(person);
////////////////////////////////////////////
	}
}
