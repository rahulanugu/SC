import { TermsConditionsComponent } from "./terms-conditions/terms-conditions.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/* Componets to create routes for */
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
import { PatientHealthcareviewnextComponent } from "./patient-healthcareviewnext/patient-healthcareviewnext.component";
import { Error404Component } from "./error404/error404.component";
import { Error500Component } from "./error500/error500.component";
import { HealthcareResetPasswordComponent } from "./healthcare-reset-password/healthcare-reset-password.component";
import { HealthcareResetPasswordPageComponent } from "./healthcare-reset-password-page/healthcare-reset-password-page.component";
import { PatientManageProfileComponent } from "./patient-manage-profile/patient-manage-profile.component";
import { DeactivatedPatientComponent } from "./deactivated-patient/deactivated-patient.component";
import { ReactivatePatientComponent } from "./reactivate-patient/reactivate-patient.component";
import { HealthcareManageProfileComponent } from "./healthcare-manage-profile/healthcare-manage-profile.component";
import { ReactivateHealthcareProviderComponent } from "./reactivate-healthcare-provider/reactivate-healthcare-provider.component";
import { AthenaLoginComponent } from "./athenalogin/athenalogin.component";
import { HealthcareConfirmationComponent } from "./healthcare-confirmation/healthcare-confirmation.component";
import { HealthcareVerificationComponent } from "./healthcare-verification/healthcare-verification.component";
import { HealthcareDialogContent } from "./healthcare-dialog-content/healthcare-dialog-content.component";

import { HealthcareAccountSettingsComponent } from "./healthcare-account-settings/healthcare-account-settings.component";
import { HealthcarePatientPortalComponent } from "./healthcare-patient-portal/healthcare-patient-portal.component";
import { HealthcareHeaderComponent } from "./healthcare-header/healthcare-header.component";
import { HealthcareReadmissionRiskInfoComponent } from "./healthcare-readmission-risk-info/healthcare-readmission-risk-info.component";
import { HealthcareAddUserComponent } from "./healthcare-add-user/healthcare-add-user.component";
import { HealthcareWelcomeEmailComponent } from "./healthcare-welcome-email/healthcare-welcome-email.component";
import { LandingPageSubfooterComponent } from "./landing-page-subfooter/landing-page-subfooter.component";
import { HealthcareFooterComponent } from "./healthcare-footer/healthcare-footer.component";
import { LandingPageHeaderComponent } from "./landing-page-header/landing-page-header.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LandingWhatIsScriptchainComponent } from "./landing-what-is-scriptchain/landing-what-is-scriptchain.component";
import { LandingPartnershipsComponent } from "./landing-partnerships/landing-partnerships.component";
import { LandingWhoWeAreComponent } from "./landing-who-we-are/landing-who-we-are.component";
import { LandingCapabilityStatementComponent } from "./landing-capability-statement/landing-capability-statement.component";
import { LandingCareersComponent } from "./landing-careers/landing-careers.component";
import { LandingFaq1Component } from "./landing-faq1/landing-faq1.component";
import { LandingFaq2Component } from "./landing-faq2/landing-faq2.component";
import { BlogComponent } from "./blog/blog.component";
const routes: Routes = [
  /* pages for the app */
  { path: "patientlogin", component: PatientComponent },
  { path: "login", component: LoginComponent },
  { path: "login/athena", component: AthenaLoginComponent },
  { path: "request-access", component: RequestAccessComponent },
  { path: "error404", component: Error404Component },
  { path: "error500", component: Error500Component },
  { path: "patient/register", component: RegPatientComponent },
  { path: "healthcare/login", component: HealthcareLoginComponent },
  { path: "healthcare/register", component: HealthcareRegisterComponent },
  { path: "healthcare/verify", component: HealthcareVerifyComponent },
  {
    path: "healthcare/password/reset",
    component: HealthcareResetPasswordComponent,
  },
  {
    path: "healthcare/password/resetpage",
    component: HealthcareResetPasswordPageComponent,
  },
  { path: "register", component: RegisterComponent },
  { path: "patient/registerTwo", component: PatientRegistertwoComponent },
  { path: "patient/password/reset", component: ResetPasswordComponent },
  { path: "patient/password/resetpage", component: ResetPasswordPageComponent },
  { path: "patient/registerThree", component: PatientRegisterthreeComponent },
  {
    path: "patient-profile",
    component: PatientProfileComponent,
    canActivate: [PatientAuthGuard],
  },
  {
    path: "editpatient",
    component: PatientManageProfileComponent,
    canActivate: [PatientAuthGuard],
  },
  { path: "contact-us", component: ContactUsComponent },
  { path: "careers", component: CareersComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "apply-job/:jobid", component: ApplyJobComponent },
  { path: "terms-conditions", component: TermsConditionsComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "registersuccessful", component: RegisterSuccessfulPageComponent },
  { path: "deactivatedpatient", component: DeactivatedPatientComponent },
  { path: "reactivatepatient", component: ReactivatePatientComponent },
  {
    path: "reactivatehealthcareprovider",
    component: ReactivateHealthcareProviderComponent,
  },
  {
    path: "searchTest",
    component: HomePageComponent,
    canActivate: [HealthcareAuthGuard],
  },
  {
    path: "healthcare-profile",
    component: HealthcareProfileComponent /* , canActivate: [HealthcareAuthGuard] */,
  },
  {
    path: "healthcare-profile/patient/:patientid",
    component: PatientHealthcareviewComponent /* canActivate: [HealthcareAuthGuard] */,
  },
  {
    path: "healthcare-profile/patient/:patientid/:diseaseid",
    component: PatientHealthcareviewnextComponent,
  },
  {
    path: "healthcare-profile/editprofile",
    component: HealthcareManageProfileComponent,
  },
  {
    path: "healthcare/confirmation",
    component: HealthcareConfirmationComponent,
  },
  {
    path: "healthcare/verificationemail",
    component: HealthcareVerificationComponent,
  },
  {
    path: "healthcare/accountsettings",
    component: HealthcareAccountSettingsComponent,
  },
  {
    path: "healthcare/patientportal",
    component: HealthcarePatientPortalComponent,
  },
  {
    path: "healthcare/header",
    component: HealthcareHeaderComponent,
  },
  {
    path: "healthcare/readmissionriskinfo",
    component: HealthcareReadmissionRiskInfoComponent,
  },
  {
    path: "healthcare/adduserpatient",
    component: HealthcareAddUserComponent,
  },
  {
    path: "healthcare/welcomeemail",
    component: HealthcareWelcomeEmailComponent,
  },
  {
    path: "healthcare/footer",
    component: HealthcareFooterComponent,
  },
  {
    path: "landing/header",
    component: LandingPageHeaderComponent,
  },
  {
    path: "landing/subfooter",
    component: LandingPageSubfooterComponent,
  },
  {
    path: "home",
    component: LandingPageComponent,
  },
  {
    path: "whatisscriptchain",
    component: LandingWhatIsScriptchainComponent,
  },
  {
    path: "partnerships",
    component: LandingPartnershipsComponent,
  },
  {
    path: "whoweare",
    component: LandingWhoWeAreComponent,
  },
  {
    path: "capabilitystatement",
    component: LandingCapabilityStatementComponent,
  },
  {
    path: "careers",
    component: LandingCareersComponent,
  },
  {
    path: "faq1",
    component: LandingFaq1Component,
  },
  {
    path: "contactus",
    component: LandingFaq2Component,
  },
  {
    path: "blog",
    component: BlogComponent,
  },
];

@NgModule({
  declarations: [HealthcareDialogContent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  entryComponents: [HealthcareDialogContent],
})
export class AppRoutingModule {}
