import { PatientAuthGuard } from "./patient-auth.guard";
import { LoginPatientService } from "./shared/login-patient.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatGridListModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AthenaLoginComponent } from "./athenalogin/athenalogin.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { RequestAccessComponent } from "./request-access/request-access.component";
import { PatientComponent } from "./patient-login/patient.component";
import { RegPatientComponent } from "./patient-register/reg-patient.component";
import { HealthcareLoginComponent } from "./healthcare-login/healthcare-login.component";
import { HealthcareRegisterComponent } from "./healthcare-register/healthcare-register.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { TextMaskModule } from "angular2-text-mask";
import { RegisterComponent } from "./register/register.component";
import { DbService } from "./db.service";
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { TermsConditionsComponent } from "./terms-conditions/terms-conditions.component";
import { PatientStatisticsComponent } from "./patient-profile/patient-statistics/patient-statistics.component";
import { ContactUsFormComponent } from "./contact-us-form/contact-us-form.component";
import { CommonHeaderComponent } from "./common-header/common-header.component";
import { PatientRegistertwoComponent } from "./patient-registertwo/patient-registertwo.component";
import { PatientRegisterthreeComponent } from "./patient-registerthree/patient-registerthree.component";
import { RegisterSuccessfulPageComponent } from "./register-successful-page/register-successful-page.component";
import { PatientNavbarComponent } from "./patient-profile/patient-navbar/patient-navbar.component";
import { PatientFooterComponent } from "./patient-profile/patient-footer/patient-footer.component";
import { CareersComponent } from "./careers/careers.component";
import { JobOpeningsComponent } from "./job-openings/job-openings.component";
import { JobCategoriesComponent } from "./job-categories/job-categories.component";
import { ApplyJobComponent } from "./apply-job/apply-job.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetPasswordPageComponent } from "./reset-password-page/reset-password-page.component";
import { HealthcareVerifyComponent } from "./healthcare-verify/healthcare-verify.component";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { HomePageComponent } from "./home-page/home-page.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { SideBarComponent } from "./sidebar/sidebar.component";
import { DataService } from "./data.service";
import { HealthcareProfileComponent } from "./healthcare-profile/healthcare-profile.component";
import { MatRadioModule } from "@angular/material/radio";
import { PatientHealthcareviewComponent } from "./patient-healthcareview/patient-healthcareview.component";
import { PatientHealthcareviewnextComponent } from "./patient-healthcareviewnext/patient-healthcareviewnext.component";
import { PatientHealthcareviewnextComponent1 } from "./patient-healthcareviewnext1/patient-healthcareviewnext1.component";
import { HighchartsChartModule } from "highcharts-angular";
import { Error404Component } from "./error404/error404.component";
import { Error500Component } from "./error500/error500.component";
import { HealthcareResetPasswordComponent } from "./healthcare-reset-password/healthcare-reset-password.component";
import { HealthcareResetPasswordPageComponent } from "./healthcare-reset-password-page/healthcare-reset-password-page.component";
import { PatientManageProfileComponent } from "./patient-manage-profile/patient-manage-profile.component";
import { DeactivatedPatientComponent } from "./deactivated-patient/deactivated-patient.component";
import { ReactivatePatientComponent } from "./reactivate-patient/reactivate-patient.component";
import { HealthcareManageProfileComponent } from "./healthcare-manage-profile/healthcare-manage-profile.component";
import { ReactivateHealthcareProviderComponent } from "./reactivate-healthcare-provider/reactivate-healthcare-provider.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatConfirmDialogComponent } from "./mat-confirm-dialog/mat-confirm-dialog.component";
import { ScriptLoaderService } from "angular-google-charts";
import { GoogleChartsModule } from "angular-google-charts";
import { HealthcareConfirmationComponent } from "./healthcare-confirmation/healthcare-confirmation.component";
import { HealthcareVerificationComponent } from "./healthcare-verification/healthcare-verification.component";
import { HealthcareAccountSettingsComponent } from "./healthcare-account-settings/healthcare-account-settings.component";
import { HealthcarePatientPortalComponent } from "./healthcare-patient-portal/healthcare-patient-portal.component";
import { HealthcareHeaderComponent } from "./healthcare-header/healthcare-header.component";
import { HealthcareReadmissionRiskInfoComponent } from "./healthcare-readmission-risk-info/healthcare-readmission-risk-info.component";
import { HealthcareAddUserComponent } from "./healthcare-add-user/healthcare-add-user.component";
import { HealthcareWelcomeEmailComponent } from "./healthcare-welcome-email/healthcare-welcome-email.component";
import { HealthcareFooterComponent } from "./healthcare-footer/healthcare-footer.component";
import { HealthcareFooterLoginComponent } from "./healthcare-footer-login/healthcare-footer-login.component";
import { LandingPageHeaderComponent } from "./landing-page-header/landing-page-header.component";
import { LandingPageSubfooterComponent } from "./landing-page-subfooter/landing-page-subfooter.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LandingWhatIsScriptchainComponent } from "./landing-what-is-scriptchain/landing-what-is-scriptchain.component";
import { LandingPartnershipsComponent } from "./landing-partnerships/landing-partnerships.component";
import { LandingWhoWeAreComponent } from "./landing-who-we-are/landing-who-we-are.component";
import { LandingCapabilityStatementComponent } from "./landing-capability-statement/landing-capability-statement.component";
import { LandingCareersComponent } from "./landing-careers/landing-careers.component";
import { LandingFaq1Component } from "./landing-faq1/landing-faq1.component";
import { BlogComponent } from "./blog/blog.component";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material";
import { MatExpansionModule } from "@angular/material/expansion";
import { BecomeapartnerComponent } from "./becomeapartner/becomeapartner.component";
import { MatCardModule } from "@angular/material/card";
import { ThankyoupartnerComponent } from './thankyoupartner/thankyoupartner.component';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { PatientLoginProfileComponent } from './patient-login-profile/patient-login-profile.component';
import { PatientCaregiverComponent } from './patient-caregiver/patient-caregiver.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { RiskAnalysisComponent } from './risk-analysis/risk-analysis.component';
import { RiskAnalysisInfoComponent } from './risk-analysis-info/risk-analysis-info.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { MedicationComponent } from './medication/medication.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { LabResultComponent } from './lab-result/lab-result.component';
import { LabResultInfoComponent } from './lab-result-info/lab-result-info.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { ProcedureInfoComponent } from './procedure-info/procedure-info.component';
import { CaregiverProfileComponent } from './caregiver-profile/caregiver-profile.component';
import { MedicationDetailsComponent } from './medication-details/medication-details.component';
import { ProcedureDetailsComponent } from "./procedure-details/procedure-details.component";
import { BlogCardComponent } from './shared/components/blog-card/blog-card.component';
import { IndustryCardComponent } from './shared/components/industry-card/industry-quote-card.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareModule } from 'ngx-sharebuttons';
import { ToastrModule } from 'ngx-toastr';
import { AllscriptsLoginComponent } from "./allscriptslogin/allscriptslogin.component";
import { PortalProgressBarComponent } from './shared/components/portal-progress-bar/portal-progress-bar.component';
import { LandingPageCarouselComponent } from './landing-page-carousel/landing-page-carousel.component';
import { LandingPageWelcomeMessageComponent } from './landing-page-welcome-message/landing-page-welcome-message.component';
import { LandingPageInformationComponent } from './landing-page-information/landing-page-information.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { EmployeeComponent } from './employee/employee.component';
library.add(faChevronDown)
library.add(faChevronRight)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AthenaLoginComponent,
    AllscriptsLoginComponent,
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
    PatientFooterComponent,
    CareersComponent,
    JobOpeningsComponent,
    JobCategoriesComponent,
    ApplyJobComponent,
    ResetPasswordComponent,
    ResetPasswordPageComponent,
    HealthcareVerifyComponent,
    HomePageComponent,
    SearchBarComponent,
    SideBarComponent,
    HealthcareProfileComponent,
    PatientHealthcareviewComponent,
    PatientHealthcareviewnextComponent,
    PatientHealthcareviewnextComponent1,
    Error404Component,
    Error500Component,
    HealthcareResetPasswordComponent,
    HealthcareResetPasswordPageComponent,
    PatientManageProfileComponent,
    DeactivatedPatientComponent,
    ReactivatePatientComponent,
    HealthcareManageProfileComponent,
    ReactivateHealthcareProviderComponent,
    MatConfirmDialogComponent,
    HealthcareConfirmationComponent,
    HealthcareVerificationComponent,
    HealthcareAccountSettingsComponent,
    HealthcarePatientPortalComponent,
    HealthcareHeaderComponent,
    HealthcareReadmissionRiskInfoComponent,
    HealthcareAddUserComponent,
    HealthcareWelcomeEmailComponent,
    HealthcareFooterComponent,
    LandingPageHeaderComponent,
    LandingPageSubfooterComponent,
    LandingPageComponent,
    LandingWhatIsScriptchainComponent,
    LandingPartnershipsComponent,
    LandingWhoWeAreComponent,
    LandingCapabilityStatementComponent,
    LandingCareersComponent,
    LandingFaq1Component,
    BlogComponent,
    BecomeapartnerComponent,
    ThankyoupartnerComponent,
    PatientSignupComponent,
    PatientLoginProfileComponent,
    PatientCaregiverComponent,
    DoctorProfileComponent,
    RiskAnalysisComponent,
    RiskAnalysisInfoComponent,
    PrescriptionsComponent,
    MedicationComponent,
    ConditionsComponent,
    LabResultComponent,
    LabResultInfoComponent,
    ProcedureComponent,
    ProcedureInfoComponent,
    HealthcareFooterLoginComponent,
    CaregiverProfileComponent,
    MedicationDetailsComponent,
    ProcedureDetailsComponent,
    BlogCardComponent,
    IndustryCardComponent,
    BlogPostComponent,
    PortalProgressBarComponent,
    LandingPageCarouselComponent,
    LandingPageWelcomeMessageComponent,
    LandingPageInformationComponent,
    ReadMoreComponent,
    EmployeeComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ShareButtonsModule,
    ShareModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatRadioModule,
    HighchartsChartModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatTabsModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatExpansionModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
  ],
  providers: [
    DbService,
    LoginPatientService,
    PatientAuthGuard,
    DataService,
    ScriptLoaderService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent],
})
export class AppModule {}
