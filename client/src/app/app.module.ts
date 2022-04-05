import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { MaterialModule } from './material.module';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SiteLayoutsComponent } from './shared/layouts/site-layouts/site-layouts.component';
import { DefaultLayoutsComponent } from './shared/layouts/default-layouts/default-layouts.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    RegistrationComponent,
    SiteLayoutsComponent,
    DefaultLayoutsComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
