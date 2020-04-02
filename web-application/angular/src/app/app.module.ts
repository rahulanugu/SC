import { PatientAuthGuard } from './patient-auth.guard';
import { LoginPatientService } from './shared/login-patient.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestAccessComponent} from './request-access/request-access.component';
import { PatientComponent } from './patient-login/patient.component';
import { RegPatientComponent } from './patient-register/reg-patient.component';
import { HealthcareLoginComponent } from './healthcare-login/healthcare-login.component';
import { HealthcareRegisterComponent } from './healthcare-register/healthcare-register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TextMaskModule} from 'angular2-text-mask';
import { RegisterComponent } from './register/register.component';
import { DbService } from './db.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PatientStatisticsComponent } from './patient-profile/patient-statistics/patient-statistics.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { PatientRegistertwoComponent} from './patient-registertwo/patient-registertwo.component'
import { PatientRegisterthreeComponent } from './patient-registerthree/patient-registerthree.component';
import { RegisterSuccessfulPageComponent} from './register-successful-page/register-successful-page.component';
import { PatientNavbarComponent } from './patient-profile/patient-navbar/patient-navbar.component';
import { CareersComponent } from './careers/careers.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';
import { JobCategoriesComponent } from './job-categories/job-categories.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { HealthcareVerifyComponent } from './healthcare-verify/healthcare-verify.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';

import { HomePageComponent } from './home-page/home-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DataService } from './data.service';
import { HealthcareProfileComponent } from './healthcare-profile/healthcare-profile.component';
import { MatRadioModule } from '@angular/material/radio';
import { PatientHealthcareviewComponent } from './patient-healthcareview/patient-healthcareview.component'; 
import { HighchartsChartModule } from 'highcharts-angular';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RequestAccessComponent,
    PatientComponent,
    RegPatientComponent,
    HealthcareLoginComponent,
    HealthcareRegisterComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    PatientProfileComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    PatientStatisticsComponent,
    ContactUsFormComponent,
    CommonHeaderComponent,
    PatientRegisterthreeComponent,
    PatientRegistertwoComponent,
    RegisterSuccessfulPageComponent,
    PatientNavbarComponent,
    CareersComponent,
    JobOpeningsComponent,
    JobCategoriesComponent,
    ApplyJobComponent,
    ResetPasswordComponent,
    ResetPasswordPageComponent,
    HealthcareVerifyComponent,

    HomePageComponent,
    SearchBarComponent,
    HealthcareProfileComponent,
    PatientHealthcareviewComponent,
    Error404Component,
    Error500Component,
    

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatRadioModule,
    HighchartsChartModule
   ],
  providers: [
    DbService,
    LoginPatientService,
    PatientAuthGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }