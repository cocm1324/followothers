import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';

@NgModule({
	declarations: [
		AppComponent,
		ListComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ApolloModule,
		HttpLinkModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { 
	constructor (
		apollo: Apollo, 
		httpLink: HttpLink
	) {
		apollo.create({
			link: httpLink.create({uri: ''}),
			cache: new InMemoryCache()
		});
	}
}
