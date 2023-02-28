
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';


import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, MatSidenavModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { AngularFileUploaderModule } from "angular-file-uploader";


import {
  AngularMaterialModule, AuthenticationModule, CoreModule, Environment, SearchModule,
  SearchService, SourceServiceNoAuth, StaticsModule, TocoFormsModule, OrganizationServiceNoAuth
} from 'toco-lib';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { allowedURLS, environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundPeopleComponent } from './page-not-found-people/page-not-found-people.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { SearchListComponent } from './search-list/search-list.component';
import { PeopleViewComponent } from './people-view/people-view.component';
import {MainlayoutComponent} from "./layout/mainlayout/mainlayout.component";
import {PeopleLayoutComponent} from "./layout/people-layout/people-layout.component";
import { GeneralTabComponent } from './people-view/general-tab/general-tab.component';
import { HeaderComponent } from './header/header.component';
import { MenuItemComponent } from './header/menu-item/menu-item.component';
import { MenuComponent } from './header/menu/menu.component';
import { ImportPeopleComponent } from './import-people/import-people.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxDropzoneModule } from 'node_modules/ngx-dropzone';
import { SelectOrgComponent } from './select-org/select-org.component';


export function storageFactory(): OAuthStorage {
  return sessionStorage
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader
{
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	exports: [
    MainlayoutComponent,
    PeopleLayoutComponent
    ],
	declarations: [
		AppComponent,
		HomeComponent,
		PageNotFoundPeopleComponent,
		FooterComponent,
		SearchComponent,
		SearchListComponent,
		PeopleViewComponent,
    MainlayoutComponent,
    PeopleLayoutComponent,
    GeneralTabComponent,
		HeaderComponent,
		MenuComponent,
    MenuItemComponent,
    ImportPeopleComponent,
    SelectOrgComponent,

	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
    MatFileUploadModule,
    AngularFileUploaderModule,
    MatTableModule,
    MatPaginatorModule,
    NgxDropzoneModule,
    AngularFileUploaderModule,
		TranslateModule.forRoot({
		  loader: {
			  provide: TranslateLoader,
			  useFactory: (createTranslateLoader),
			  deps: [HttpClient]
		  }
		}),
		ReactiveFormsModule,
		FlexLayoutModule,
		MarkdownModule.forRoot({
			loader: HttpClient
		}),

		MatButtonModule,
		MatTooltipModule,
		MatMenuModule,
		MatIconModule,
		MatToolbarModule,
		MatDividerModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		MatSidenavModule,
		MatPaginatorModule,
    MatTabsModule,
    MatChipsModule,
    MatExpansionModule,
    MatListModule,
    TocoFormsModule,

    AngularMaterialModule,
    CoreModule,
    StaticsModule,
    TocoFormsModule,
    SearchModule,
    AuthenticationModule,

		AppRoutingModule,

    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: allowedURLS,
          sendAccessToken: true
      }
    }),
	],
	providers: [
    SearchService,
    SourceServiceNoAuth,
    { provide: Environment, useValue: environment },
    { provide: OAuthStorage, useFactory: storageFactory },
	],
	bootstrap: [AppComponent]
})
export class AppModule
{ }
