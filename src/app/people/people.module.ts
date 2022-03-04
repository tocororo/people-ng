
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';

import { CoreModule, TocoFormsModule } from 'toco-lib';

import { PeopleRoutingModule } from './people-routing.module';
import { SearchComponent } from './search/search.component';
import { PeopleComponent } from './people/people.component';

@NgModule({
	declarations: [
		SearchComponent,
		PeopleComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
    	ReactiveFormsModule,
		FlexLayoutModule,
		TranslateModule,

        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
		MatExpansionModule,
		MatMenuModule,
		MatStepperModule,
		MatDividerModule,

		CoreModule,
		TocoFormsModule,
		PeopleRoutingModule
	]
})
export class PeopleModule
{ }
