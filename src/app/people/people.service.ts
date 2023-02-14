
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { cloneValue, Environment, Hit, Organization, SearchResponse } from 'toco-lib';

import { Person } from './person.entity';

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
		const req = this._env.sceibaApi + 'search/persons/';
		// console.log(req);
		return this._http.get<SearchResponse<Person>>(req);
	}

	public getPeopleById(uuid: string): Observable<any>
	{
    const req = this._env.sceibaApi + "pid/persons/" + uuid;
		return this._http.get<SearchResponse<Person>>(req);
	}
}
