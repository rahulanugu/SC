
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Componets to create routes for */
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RequestAccessComponent} from './request-access/request-access.component';
import {PatientComponent} from './patient-login/patient.component';
import {RegPatientComponent} from './patient-register/reg-patient.component'
import {HealthcareLoginComponent} from './healthcare-login/healthcare-login.component';
import {HealthcareRegisterComponent} from './healthcare-register/healthcare-register.component';
import {RegisterComponent} from './register/register.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientAuthGuard } from './patient-auth.guard';
import { PatientRegisterthreeComponent } from './patient-registerthree/patient-registerthree.component';
import { PatientRegistertwoComponent } from './patient-registertwo/patient-registertwo.component';
import { RegisterSuccessfulPageComponent } from './register-successful-page/register-successful-page.component';

const routes: Routes = [
  /* pages for the app */
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'request-access', component: RequestAccessComponent},
  { path: 'patient/login', component: PatientComponent},
  { path: 'patient/register', component: RegPatientComponent},
  { path: 'healthcare/login', component: HealthcareLoginComponent},
  { path: 'healthcare/register', component: HealthcareRegisterComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'patient/registerTwo', component: PatientRegistertwoComponent},
  { path: 'patient/registerThree', component: PatientRegisterthreeComponent},
  { path: 'patient-profile', component:PatientProfileComponent, canActivate: [PatientAuthGuard] },
  { path:'contact-us', component: ContactUsComponent},
  { path:'home/privacy-policy', component: PrivacyPolicyComponent},
  { path: 'home/terms-conditions', component: TermsConditionsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path : 'registersuccessful', component: RegisterSuccessfulPageComponent}
  ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
