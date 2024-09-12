import {NgModule, Optional} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
  ],
  providers: [],
})
export class AppModule {
  constructor( @Optional() http: HttpClient) {
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
        'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
