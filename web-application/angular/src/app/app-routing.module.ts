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
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
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
import { HealthcareProfileComponent } from "./healthcare-profile/healthcare-profile.component";
import { HealthcareAuthGuard } from "./healthcare-auth.guard";
import { PatientHealthcareviewComponent } from "./patient-healthcareview/patient-healthcareview.component";
import { PatientHealthcareviewnextComponent } from "./patient-healthcareviewnext/patient-healthcareviewnext.component";
import { PatientHealthcareviewnextComponent1 } from "./patient-healthcareviewnext1/patient-healthcareviewnext1.component";
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
import { BlogPostQuoteComponent } from "./blog-post-quote/blog-post-quote.component";
import { AllscriptsLoginComponent } from "./allscriptslogin/allscriptslogin.component";
import { EmployeeComponent } from "./employee/employee.component";
const routes: Routes = [
  /* pages for the app */
  // Data { searchable (if true send it to search if false do not), if the searchable is true u can pass a desc/Name for the page }
  {
    path: "patients/labresult",
    component: LabResultComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/labresultinfo",
    component: LabResultInfoComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patient/procedure",
    component: ProcedureComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patient/procedureinfo",
    component: ProcedureInfoComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patient/login",
    component: PatientComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "login/athena",
    component: AthenaLoginComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "login/allscripts",
    component: AllscriptsLoginComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "request-access",
    component: RequestAccessComponent,
    data: {
      searchable: true,
      desc: "Request Access",
    },
  },
  {
    path: "patient/register",
    component: RegPatientComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare/login",
    component: HealthcareLoginComponent,
    data: {
      searchable: true,
      desc: "Healthcare Login",
    },
  },
  {
    path: "healthcare/register",
    component: HealthcareRegisterComponent,
    data: {
      searchable: true,
      desc: "Healthcare Register",
    },
  },
  {
    path: "healthcare/verify",
    component: HealthcareVerifyComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare/password/reset",
    component: HealthcareResetPasswordComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare/password/resetpage",
    component: HealthcareResetPasswordPageComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patient/registerTwo",
    component: PatientRegistertwoComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patient/password/reset",
    component: ResetPasswordComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patient/password/resetpage",
    component: ResetPasswordPageComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patient/registerThree",
    component: PatientRegisterthreeComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patient-profile",
    component: PatientProfileComponent,
    // canActivate: [PatientAuthGuard],
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "editpatient",
    component: PatientManageProfileComponent,
    canActivate: [PatientAuthGuard],
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "contact-us",
    component: ContactUsComponent,
    data: {
      searchable: true,
      desc: "Contact Us",
    },
  },
  {
    path: "careers",
    component: CareersComponent,
    data: {
      searchable: true,
      desc: "Careers",
    },
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
    data: {
      searchable: true,
      desc: "Privacy Policy",
    },
  },
  {
    path: "apply-job/:jobid",
    component: ApplyJobComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "job-openings",
    component: JobOpeningsComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "terms-conditions",
    component: TermsConditionsComponent,
    data: {
      searchable: true,
      desc: "Terms & Conditions",
    },
  },
  {
    path: "registersuccessful",
    component: RegisterSuccessfulPageComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "deactivatedpatient",
    component: DeactivatedPatientComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "reactivatepatient",
    component: ReactivatePatientComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "reactivatehealthcareprovider",
    component: ReactivateHealthcareProviderComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare-profile",
    component:
      HealthcareProfileComponent /*, canActivate: [HealthcareAuthGuard]*/,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare-profile/patient/:patientid",
    component:
      PatientHealthcareviewComponent /*, canActivate: [HealthcareAuthGuard]*/,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare-profile/patient/:patientid/readmission",
    component:
      PatientHealthcareviewnextComponent1 /*, canActivate: [HealthcareAuthGuard]*/,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare-profile/patient/:patientid/:diseaseid",
    component:
      PatientHealthcareviewnextComponent /*, canActivate: [HealthcareAuthGuard]*/,
    data: {
      searchable: false,
      desc: "Something",
    },
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
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare/verificationemail",
    component: HealthcareVerificationComponent,
    canActivate: [HealthcareAuthGuard],
    data: {
      searchable: false,
      desc: "Something",
    },
    //needs backend
  },
  {
    path: "healthcare-profile/accountsettings",
    component: HealthcareAccountSettingsComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare/patientportal",
    component: HealthcarePatientPortalComponent,
    canActivate: [HealthcareAuthGuard],
    data: {
      searchable: false,
      desc: "Something",
    },
    //no interactions
  },
  {
    path: "healthcare/header",
    component: HealthcareHeaderComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare/readmissionriskinfo",
    component: HealthcareReadmissionRiskInfoComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "healthcare/adduserpatient",
    component: HealthcareAddUserComponent,
    canActivate: [HealthcareAuthGuard],
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "welcomeemail",
    component: HealthcareWelcomeEmailComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "home",
    component: LandingPageComponent,
    data: {
      searchable: true,
      desc: "Home",
    },
  },
  {
    path: "whatisscriptchain",
    component: LandingWhatIsScriptchainComponent,
    data: {
      searchable: true,
      desc: "What is ScriptChain Health",
    },
  },
  {
    path: "partnerships",
    component: LandingPartnershipsComponent,
    data: {
      searchable: true,
      desc: "Partnerships",
    },
  },
  {
    path: "whoweare",
    component: LandingWhoWeAreComponent,
    data: {
      searchable: true,
      desc: "Who we are",
    },
  },
  {
    path: "whoweare/:employee/:id",
    component: EmployeeComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "capabilitystatement",
    component: LandingCapabilityStatementComponent,
    data: {
      searchable: true,
      desc: "Capability Statement",
    },
  },
  {
    path: "faq",
    component: LandingFaq1Component,
    data: {
      searchable: true,
      desc: "FAQ",
    },
  },
  {
    path: "blog",
    component: BlogComponent,
    data: {
      searchable: true,
      desc: "Blog",
    },
  },
  {
    path: "blog/:id",
    component: BlogPostComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "blog-post/:id",
    component: BlogPostComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "blog-post-quote/:slug",
    component: BlogPostQuoteComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "becomeapartner",
    component: BecomeapartnerComponent,
    data: {
      searchable: true,
      desc: "Become a partner",
    },
  },
  {
    path: "thankyoupartner",
    component: ThankyoupartnerComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/signup",
    component: PatientSignupComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/profile",
    component: PatientLoginProfileComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/caregiverprofile",
    component: PatientCaregiverComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/caregiverid",
    component: CaregiverProfileComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/doctorinfo",
    component: DoctorProfileComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/riskanalysis",
    component: RiskAnalysisComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/riskanalysisinfo",
    component: RiskAnalysisInfoComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/prescriptions",
    component: PrescriptionsComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/medicationdetails",
    component: MedicationDetailsComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/medication",
    component: MedicationComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/conditions",
    component: ConditionsComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/procedures",
    component: ProcedureComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  {
    path: "patients/proceduresdetails",
    component: ProcedureDetailsComponent,
    data: {
      searchable: false,
      desc: "Something",
    },
  },
  // Keep the redirectTo object to the bottom of the array, because the search engine will crash
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  declarations: [HealthcareDialogContent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
  entryComponents: [HealthcareDialogContent],
})
export class AppRoutingModule {}
