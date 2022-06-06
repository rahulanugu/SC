import { TermsConditionsComponent } from "./terms-conditions/terms-conditions.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";

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
import { PatientHealthcareviewnextComponent1 } from "./patient-healthcareviewnext1/patient-healthcareviewnext1.component";
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
import { BlogComponent } from "./blog/blog.component";
import { BecomeapartnerComponent } from "./becomeapartner/becomeapartner.component";
import { ThankyoupartnerComponent } from "./thankyoupartner/thankyoupartner.component";
import { PatientSignupComponent } from "./patient-signup/patient-signup.component";
import { PatientLoginProfileComponent } from "./patient-login-profile/patient-login-profile.component";
import { PatientCaregiverComponent } from "./patient-caregiver/patient-caregiver.component";
import { DoctorProfileComponent } from "./doctor-profile/doctor-profile.component";
import { RiskAnalysisComponent } from "./risk-analysis/risk-analysis.component";
import { RiskAnalysisInfoComponent } from "./risk-analysis-info/risk-analysis-info.component";
import { PrescriptionsComponent } from "./prescriptions/prescriptions.component";
import { MedicationComponent } from "./medication/medication.component";
import { ConditionsComponent } from "./conditions/conditions.component";
import { LabResultComponent } from "./lab-result/lab-result.component";
import { LabResultInfoComponent } from "./lab-result-info/lab-result-info.component";
import { ProcedureComponent } from "./procedure/procedure.component";
import { ProcedureInfoComponent } from "./procedure-info/procedure-info.component";
import { CaregiverProfileComponent } from "./caregiver-profile/caregiver-profile.component";
import { MedicationDetailsComponent } from "./medication-details/medication-details.component";
import { ProcedureDetailsComponent } from "./procedure-details/procedure-details.component";
import { JobOpeningsComponent } from "./job-openings/job-openings.component";
import { BlogPostComponent } from "./blog-post/blog-post.component";
import { AllscriptsLoginComponent } from "./allscriptslogin/allscriptslogin.component";
import { EmployeeComponent } from "./employee/employee.component";
const routes: Routes = [
  /* pages for the app */
  {
    path: "patients/labresult",
    component: LabResultComponent,
  },
  {
    path: "patients/labresultinfo",
    component: LabResultInfoComponent,
  },
  {
    path: "patient/procedure",
    component: ProcedureComponent,
  },
  {
    path: "patient/procedureinfo",
    component: ProcedureInfoComponent,
  },
  { path: "patientlogin", component: PatientComponent },
  { path: "login", component: LoginComponent },
  { path: "login/athena", component: AthenaLoginComponent },
  { path: "login/allscripts", component: AllscriptsLoginComponent },
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
  { path: "job-openings", component: JobOpeningsComponent },
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
    component:
      HealthcareProfileComponent /*, canActivate: [HealthcareAuthGuard]*/,
  },
  {
    path: "healthcare-profile/patient/:patientid",
    component:
      PatientHealthcareviewComponent /*, canActivate: [HealthcareAuthGuard]*/,
  },
  {
    path: "healthcare-profile/patient/:patientid/:diseaseid",
    component:
      PatientHealthcareviewnextComponent /*, canActivate: [HealthcareAuthGuard]*/,
  },
  {
    path: "healthcare-profile/readmission",
    component:
      PatientHealthcareviewnextComponent1 /*, canActivate: [HealthcareAuthGuard]*/,
  },
  /*{
    path: "healthcare-profile/editprofile",
    component: HealthcareManageProfileComponent, canActivate: [HealthcareAuthGuard],
    //opening deactivate
  },*/
  {
    path: "healthcare/confirmation",
    component: HealthcareConfirmationComponent,
    canActivate: [HealthcareAuthGuard],
    //needs backend
  },
  {
    path: "healthcare/verificationemail",
    component: HealthcareVerificationComponent,
    canActivate: [HealthcareAuthGuard],
    //needs backend
  },
  {
    path: "healthcare-profile/accountsettings",
    component: HealthcareAccountSettingsComponent,
  },
  {
    path: "healthcare/patientportal",
    component: HealthcarePatientPortalComponent,
    //no interactions
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
    path: "welcomeemail",
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
    path: "whoweare/:employee",
    component:EmployeeComponent
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
    path: "faq",
    component: LandingFaq1Component,
  },
  {
    path: "blog",
    component: BlogComponent,
  },
  {
    path: "blog-post",
    component: BlogPostComponent,
  },
  {
    path: "becomeapartner",
    component: BecomeapartnerComponent,
  },
  {
    path: "thankyoupartner",
    component: ThankyoupartnerComponent,
  },
  {
    path: "patients/signup",
    component: PatientSignupComponent,
  },
  {
    path: "patients/profile",
    component: PatientLoginProfileComponent,
  },
  {
    path: "patients/caregiverprofile",
    component: PatientCaregiverComponent,
  },
  {
    path: "patients/caregiverid",
    component: CaregiverProfileComponent,
  },
  {
    path: "patients/doctorinfo",
    component: DoctorProfileComponent,
  },
  {
    path: "patients/riskanalysis",
    component: RiskAnalysisComponent,
  },
  {
    path: "patients/riskanalysisinfo",
    component: RiskAnalysisInfoComponent,
  },
  {
    path: "patients/prescriptions",
    component: PrescriptionsComponent,
  },
  {
    path: "patients/medicationdetails",
    component: MedicationDetailsComponent,
  },
  {
    path: "patients/medication",
    component: MedicationComponent,
  },
  {
    path: "patients/conditions",
    component: ConditionsComponent,
  },
  {
    path: "patients/procedures",
    component: ProcedureComponent,
  },
  {
    path: "patients/proceduresdetails",
    component: ProcedureDetailsComponent,
  },
];

@NgModule({
  declarations: [HealthcareDialogContent],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
  entryComponents: [HealthcareDialogContent],
})
export class AppRoutingModule {}
