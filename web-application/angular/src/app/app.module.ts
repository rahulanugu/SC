import { PatientAuthGuard } from './patient-auth.guard';
import { LoginPatientService } from './shared/login-patient.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestDemoComponent } from './request-demo/request-demo.component';
import { PatientComponent } from './patient-login/patient.component';
import { RegPatientComponent } from './patient-register/reg-patient.component';
import { HealthcareLoginComponent } from './healthcare-login/healthcare-login.component';
import { HealthcareRegisterComponent } from './healthcare-register/healthcare-register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {TextMaskModule} from 'angular2-text-mask';
import { RegisterComponent } from './register/register.component';
import { DbService } from './db.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RequestDemoComponent,
    PatientComponent,
    RegPatientComponent,
    HealthcareLoginComponent,
    HealthcareRegisterComponent,
    HeaderComponent,
    FooterComponent,
    
    RegisterComponent,
    PatientProfileComponent,
    ContactUsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule
 
  ],
  providers: [
    DbService,
    LoginPatientService,
    PatientAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
