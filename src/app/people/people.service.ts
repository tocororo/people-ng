
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { cloneValue, Environment, Hit, Organization, SearchResponse } from 'toco-lib';

import { Person } from './person.entity';

/**
 * Represents an object with all its values set to `undefined` in Spanish language. 
 * An empty person must have its `id` and `resultAndRecoms` fields set to `undefined`. 
 */
const personEmpty_Spanish: any = {
	'aggregations': {
        'agg1':[
			{
				'buckets': [],
				'doc_count_error_upper_bound': 0,
				'sum_other_doc_count': 0
			}
	
		]
    },
    'hits': {
		'hits': [
			{
				'id': 'string',
				'created': 'string',
				updated: 'string',
				'links': {
					'self': 'string',
					'next': 'string',
					'prev': 'string',
				},
				'metadata': {
					'id': undefined,  /* An empty person must have its `id` set to `undefined`. */
					'name': '',
					'lastName': ''
				},
				'revision': 0
			}
		],
		'total': 1
	},
    'links': {
		'self': 'string',
		'next': 'string',
		'prev': 'string',
	},
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
	private readonly _prefix = 'people';

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
	 * the response body in the `SearchResponse<Person>` type. 
	 * Returns a single person. 
	 * @param id Person id. 
	 * In the case of adding view, this `id` argument is `undefined` (maybe only in the first use of this method). 
	 * In the case of remaining views (viewing and editing views), this `id` argument is NOT `undefined`. 
	 * @param currentLang Language currently used as string. 
	 * The Spanish language is: 'es'. 
	 * The English language is: 'en'. 
	 * @return An `Observable` of the `HTTPResponse`, with a response body in the `SearchResponse<Person>` type. 
	 */
	public getPersonById(id: string, currentLang: string): Observable<SearchResponse<Person>>
	{
//// Backend data //////////////////////////
		// // TODO: Test and fix any issue when connecting to the backend. 

		// /* In the case of adding view, this occurs when the `id` argument is `undefined`, 
		// it needs to get an object with all its values set to `undefined`. 
		// This is a great optimization that you can implement in the backend. */
		// // TODO: I think that we need to create `_env.peopleApi` field and use it instead of `_env.cuorApi`. 
		// let req: string = this._env.cuorApi + this._prefix + '/';

		// /* In the case of remaining views (viewing and editing views), this occurs when the `id` argument is NOT `undefined`, 
		// it needs to get an object set to the stored data. */
		// if (id)
		// {
		// 	req += id + '/';
		// }
		// // console.log(req);

		// return this._http.get<SearchResponse<Person>>(req, { params: { 'lang': currentLang } });
////////////////////////////////////////////


//// Mock data /////////////////////////////
        let res: any;

		if (id)
		{
			/* In the case of remaining views (viewing and editing views), this occurs when the `id` argument is NOT `undefined`, 
			it needs to get an object set to the stored data. */

            if (currentLang == 'es')
            {
                res = cloneValue(personEmpty_Spanish);
            }
            else
            {
                res = cloneValue(personEmpty_Spanish);
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
                res = cloneValue(personEmpty_Spanish);
            }
		}

        return of(res);
////////////////////////////////////////////
	}

	/**
	 * Constructs a `GET` request that interprets the body as a JSON object and returns 
	 * the response body in the `SearchResponse<Person>` type. 
	 * Returns a people group that follows a search criteria. 
	 * E.g.: lang=es&size=15&page=0&q=pinar%20del%20rio&country=Cuba&status=active
	 * @param currentLang Language currently used as string. 
	 * The Spanish language is: 'es'. 
	 * The English language is: 'en'. 
	 * @return An `Observable` of the `HTTPResponse`, with a response body in the `SearchResponse<Person>` type. 
	 */
	public getPeople(params: HttpParams): Observable<SearchResponse<Person>>
	{
		const options = {
			params: params,
			// headers: this.headers
		};
		// console.log(params);
		const req = this._env.sceibaApi + 'persons/';
		// console.log(req);
		return this._http.get<SearchResponse<Person>>(req);
	}

	getOrganizations(params: HttpParams): Observable<SearchResponse<Organization>>
	{
		const options = {
			params: params,
			// headers: this.headers
		};
		// console.log(params);
		const req = this._env.cuorApi + 'organizations/';
		// console.log(req);

		return this._http.get<SearchResponse<Organization>>(req, options);
	}

	public editPerson(person: Person): Observable<any>
	{
//// Backend data //////////////////////////
		// // TODO: Poner correctamente el campo `this._env.sceibaApi` o crear un `this._env.peopleApi`. 
		// const url: string = this._env.sceibaApi + this._prefix + '/' + person.id;

        // /* It is NOT necessary to indicate the language. */
		// return this._http.put<SearchResponse<Person>>(url, JSON.stringify(person), this._httpOptions);
////////////////////////////////////////////


//// Mock data /////////////////////////////
		console.error('editPerson: There is not backend yet!', person);
		return of(person);
////////////////////////////////////////////
	}
}
