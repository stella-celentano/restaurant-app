import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http"

import { ToastrModule } from "ngx-toastr"

import { NavigationModule } from "./modules/navigation/navigation.module"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ChefsComponent } from './modules/chefs/chefs.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoadingComponent,
    ChefsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NavigationModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
