import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SiteLayoutsComponent } from './shared/layouts/site-layouts/site-layouts.component';
import { ShareModule } from './shared/shared.module';
import { ExerciseGuideModule } from './components/pages/exercise-guide/exercise-guide.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    RegistrationComponent,
    SiteLayoutsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ShareModule,
    ExerciseGuideModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
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
