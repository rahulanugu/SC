import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Componets to create routes for */
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RequestDemoComponent} from './request-demo/request-demo.component';
import {PatientComponent} from './patient-login/patient.component';
import {RegPatientComponent} from './patient-register/reg-patient.component'
import {HealthcareLoginComponent} from './healthcare-login/healthcare-login.component';
import {HealthcareRegisterComponent} from './healthcare-register/healthcare-register.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  /* pages for the app */
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'contact', component: RequestDemoComponent},
  { path: 'patient/login', component: PatientComponent},
  { path: 'patient/register', component: RegPatientComponent},
  { path: 'healthcare/login', component: HealthcareLoginComponent},
  { path: 'healthcare/register', component: HealthcareRegisterComponent},
  { path: 'register', component:RegisterComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
