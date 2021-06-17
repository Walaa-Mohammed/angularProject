import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutKhamsatComponent } from './Khamsat Community/AboutKhamsatModule/about-khamsat/about-khamsat.component';
import { AddnewSubjectComponent } from './Khamsat Community/AboutKhamsatModule/addnew-subject/addnew-subject.component';
import { AddnewModelImplementedComponent } from './Khamsat Community/Business models implemented/addnew-model-implemented/addnew-model-implemented.component';
import { ModelsImplementedComponent } from './Khamsat Community/Business models implemented/models-implemented/models-implemented.component';
import { AddnewNotFoundServiceComponent } from './Khamsat Community/NotFoundServiceModule/addnew-not-found-service/addnew-not-found-service.component';
import { NotFoundServiceComponent } from './Khamsat Community/NotFoundServiceModule/not-found-service/not-found-service.component';
import { AddnewUserExperienceComponent } from './Khamsat Community/UserExperiencesAndStoriesModule/addnew-user-experience/addnew-user-experience.component';
import { UserExperiencesAndStoriesComponent } from './Khamsat Community/UserExperiencesAndStoriesModule/user-experiences-and-stories/user-experiences-and-stories.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { KhamsatDotComComponent } from './khamsat-dot-com/khamsat-dot-com.component';
import { HsoubHeaderComponent } from './hsoub-header/hsoub-header.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutKhamsatComponent,
    NotFoundServiceComponent,
    ModelsImplementedComponent,
    UserExperiencesAndStoriesComponent,
    AddnewModelImplementedComponent,
    AddnewSubjectComponent,
    AddnewNotFoundServiceComponent,
    AddnewUserExperienceComponent,
    RegisterComponent,
    LoginComponent,
    KhamsatDotComComponent,
    HsoubHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
