import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

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
import { RegisterComponent } from './register/register.component';
import { DbService } from './db.service';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
