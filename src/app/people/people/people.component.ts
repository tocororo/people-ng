
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatHorizontalStepper, MatSnackBar } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { ActionText, Hit, MessageHandler, StatusCode, HandlerComponent } from 'toco-lib';

import { Person } from '../person.entity';

import { PeopleService } from '../people.service';

@Component({
	selector: 'app-people',
	templateUrl: './people.component.html',
	styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit
{
	/**
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
     * it is initialized. 
	 * Returns the action through a text. 
	 */
	public _actionText: ActionText;

	/**
	 * Returns the title. 
	 */
	public title: string;

	/**
	 * Returns true if the component has a task in progress; otherwise, false. 
	 * Example of task is: loading, updating, etc. 
	 * By default, its value is `true` because it represents the loading task. 
	 */
	public hasTaskInProgress: boolean;
 
	public peopleFormGroup: FormGroup;
	// public evalJournalDataFormGroup: FormGroup;
	// public evalSurveyFormGroup: FormGroup;

	/**
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
     * it is initialized. 
	 */
	public _person: Person;

	public constructor(private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _transServ: TranslateService,
		private _peopleService: PeopleService,
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar)
	{
		this._actionText = undefined;
		this.title = '';

		/* The component begins its loading task. */
		this.hasTaskInProgress = true;

		this.peopleFormGroup = undefined;
		// this.evalJournalDataFormGroup = undefined;
		// this.evalSurveyFormGroup = undefined;
		this._person = undefined;
	}

	public ngOnInit(): void
	{
		/* The string `ActionText.add` is the value of the last route sub-path that is specified in the `*-routing.module.ts` file. */
		this._actionText = this._activatedRoute.snapshot.children[0].url[(this._activatedRoute.snapshot.children[0].url.length - 1)].path as ActionText;

		switch (this._actionText)
		{
			case ActionText.view:
				{
					this.title = 'TITULO_VISTA_DETALLES';
					break;
				}

			case ActionText.add:
				{
					this.title = 'TITULO_VISTA_ADICIONAR';
					break;
				}

			default:
				{
					throw new Error(`For the '${ PeopleComponent.name }' control, the URL written has an error because the programme does not know what to do with it!`);
				}
		}

		this._activatedRoute.data.subscribe({
			next: (data: { 'person': Hit<Person> }) => {
				/* It is necessary to work with a copy because the `_person` field has some internal fields 
				 * that will be changed when the application language will be changed. 
				 * The previous scene is the only case that will change the `_person` field; so in the rest of the case, 
				 * it is like a readonly field, and it is only used to initialize the form. For that reason, 
				 * its name begins with an underscore to remember you that you can change its value ONLY 
				 * when the application language will be changed. */
				this._person = data.person.metadata;

				this._initFormData();

				/* The component ends its loading task. It is set here and not in the `complete` property because the `complete` notification is not sent. */
				this.hasTaskInProgress = false;
			},
			error: (err: any) => {
				/* The component ends its loading task. */
				this.hasTaskInProgress = false;

				const m = new MessageHandler(this._snackBar);
				m.showMessage(StatusCode.OK, err.message)
			}
		});

		/* Changes the translation when the language changes. */
		this._transServ.onLangChange.subscribe((params: LangChangeEvent) => {
			this._setNewLanguage();
		});

		console.log('Data got for PeopleComponent: ', this._person, this.peopleFormGroup);
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		this.peopleFormGroup = this._formBuilder.group({
			// 'journalData': this.evalJournalDataFormGroup = this._formBuilder.group({ }),

			// 'survey': this.evalSurveyFormGroup = this._formBuilder.group({ })
		});
	}

	/**
	 * Sets the new language. 
	 */
	private _setNewLanguage(): void
	{
	// 	this._peopleService.getPersonById(
	// 		((this._person) ? (this._person.id) : undefined),
	// 		this._transServ.currentLang
	// 	).subscribe({
	// 		next: (data: Hit<Person>) => {

	// 			let i: number, j: number, k: number, l: number;

	// 			let old_sections: Array<SurveySection>;
	// 			let new_sections: Array<SurveySection>;

	// 			let old_categories: Array<SectionCategory>;
	// 			let new_categories: Array<SectionCategory>;

	// 			let old_questions: Array<CategoryQuestion>;
	// 			let new_questions: Array<CategoryQuestion>;

	// 			/* Gets translations for sections. */

	// 			old_sections = this._person.sections;
	// 			new_sections = data.metadata.sections;

	// 			for (i = 0; i < old_sections.length; ++i)
	// 			{
	// 				old_sections[i].title = new_sections[i].title;

	// 				old_categories = old_sections[i].categories;
	// 				new_categories = new_sections[i].categories;

	// 				for (j = 0; j < old_categories.length; ++j)
	// 				{
	// 					old_categories[j].title = new_categories[j].title;

	// 					old_questions = old_categories[j].questionsOrRecoms as Array<CategoryQuestion>;
	// 					new_questions = new_categories[j].questionsOrRecoms as Array<CategoryQuestion>;

	// 					for (k = 0; k < old_questions.length; ++k)
	// 					{
	// 						old_questions[k].desc = new_questions[k].desc;
	// 						old_questions[k].hint = new_questions[k].hint;

	// 						if (old_questions[k].type == CategoryQuestionType.select)
	// 						{
	// 							for (l = 0; l < old_questions[k].selectOptions.length; ++l)
	// 							{
	// 								old_questions[k].selectOptions[l].label = new_questions[k].selectOptions[l].label;
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}

	// 			console.log('this._person.resultAndRecoms: ', this._person.resultAndRecoms);

	// 		},
	// 		error: (err: any) => {
	// 			const m = new MessageHandler(this._snackBar);
	// 			m.showMessage(StatusCode.OK, err.message)
	// 		}
	// 	});
	// 	console.log('New data got by PeopleComponent because the language changed: ', this._person);
	}
}
