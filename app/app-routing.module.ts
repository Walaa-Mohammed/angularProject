import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AboutKhamsatComponent } from './Khamsat Community/AboutKhamsatModule/about-khamsat/about-khamsat.component';
import { AddnewModelImplementedComponent } from './Khamsat Community/Business models implemented/addnew-model-implemented/addnew-model-implemented.component';
import { ModelsImplementedComponent } from './Khamsat Community/Business models implemented/models-implemented/models-implemented.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { KhamsatDotComComponent } from './khamsat-dot-com/khamsat-dot-com.component';
import { HsoubHeaderComponent } from './hsoub-header/hsoub-header.component';

const routes: Routes = [

  {path: '', component: KhamsatDotComComponent},

  {path:'register',component:RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'head',component:HsoubHeaderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
