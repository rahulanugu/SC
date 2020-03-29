import { TermsConditionsComponent } from "./terms-conditions/terms-conditions.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/* Componets to create routes for */
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RequestAccessComponent } from "./request-access/request-access.component";
import { PatientComponent } from "./patient-login/patient.component";
import { RegPatientComponent } from "./patient-register/reg-patient.component";
import { HealthcareLoginComponent } from "./healthcare-login/healthcare-login.component";
import { HealthcareRegisterComponent } from "./healthcare-register/healthcare-register.component";
import { RegisterComponent } from "./register/register.component";
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { PatientAuthGuard } from "./patient-auth.guard";
import { PatientRegisterthreeComponent } from "./patient-registerthree/patient-registerthree.component";
import { PatientRegistertwoComponent } from "./patient-registertwo/patient-registertwo.component";
import { RegisterSuccessfulPageComponent } from "./register-successful-page/register-successful-page.component";
import { CareersComponent } from "./careers/careers.component";
import { ApplyJobComponent } from "./apply-job/apply-job.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetPasswordPageComponent } from "./reset-password-page/reset-password-page.component";
import { HealthcareVerifyComponent } from "./healthcare-verify/healthcare-verify.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { HealthcareProfileComponent } from "./healthcare-profile/healthcare-profile.component";
import { HealthcareAuthGuard } from "./healthcare-auth.guard";
import { PatientHealthcareviewComponent } from "./patient-healthcareview/patient-healthcareview.component";

const routes: Routes = [
  /* pages for the app */
  { path: "home", component: HomeComponent },
  { path: "patientlogin", component: PatientComponent },
  { path: "login", component: LoginComponent },
  { path: "request-access", component: RequestAccessComponent },
  { path: "patient/register", component: RegPatientComponent },
  { path: "healthcare/login", component: HealthcareLoginComponent },
  { path: "healthcare/register", component: HealthcareRegisterComponent },
  { path: "healthcare/verify", component: HealthcareVerifyComponent },
  { path: "register", component: RegisterComponent },
  { path: "patient/registerTwo", component: PatientRegistertwoComponent },
  { path: "patient/password/reset", component: ResetPasswordComponent },
  { path: "patient/password/resetpage/:token", component: ResetPasswordPageComponent },
  { path: "patient/registerThree", component: PatientRegisterthreeComponent },
  {
    path: "patient-profile",
    component: PatientProfileComponent,
    canActivate: [PatientAuthGuard]
  },
  { path: "contact-us", component: ContactUsComponent },
  { path: "careers", component: CareersComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "apply-job/:jobid", component: ApplyJobComponent },
  { path: "terms-conditions", component: TermsConditionsComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "registersuccessful", component: RegisterSuccessfulPageComponent },
  { path: "searchTest", component:HomePageComponent},
  { path: "healthcare-profile", component: HealthcareProfileComponent, canActivate: [HealthcareAuthGuard]},
  { path: "healthcare-profile/patient/:patientid", component: PatientHealthcareviewComponent, canActivate: [HealthcareAuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
