import { Component, OnInit, NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { PatientService } from "../shared/patient.service";
import { NgForm } from "@angular/forms";
import { formatNumber } from "@angular/common";
import { error } from "util";
import { RouterLink } from "@angular/router";
import { store } from "@angular/core/src/render3";

@Component({
  selector: "app-reg-patient",
  templateUrl: "./reg-patient.component.html",
  styleUrls: ["../app.component.css"],
  providers: [PatientService]
})
export class RegPatientComponent implements OnInit {
  public phonemask = [
    "(",
    /[0-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  passwordNotMatch: boolean = false;
  userAlreadyExist: boolean = false;

  values: string = "";

  onKey(event: any) {
    this.values = event.target.value;
  }

  constructor(public patientService: PatientService, private router: Router) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.showFirst();
    let stored = JSON.parse(localStorage.getItem("Patient-info"));

    if (stored) {
      this.values = stored.confirmPassword;
      this.patientService.selectedPatient = {
        _id: stored._id,
        fname: stored.fname,
        lname: stored.lname,
        email: stored.email,
        street: stored.street,
        city: stored.city,
        state: stored.state,
        zip: stored.zip,
        country: stored.country,
        address: stored.address,
        phone: stored.phone,
        birthday: stored.birthday,
        sex: stored.sex,
        ssn: stored.ssn,
        allergies: "None",
        ec: stored.ec,
        ecRelationship: stored.ecRelationship,
        ecPhone: stored.ecPhone,
        password: stored.password,
        confirmPassword: stored.confirmPassword,
        anemia: stored.anemia,
        asthma: stored.asthma,
        arthritis: stored.arthritis,
        cancer: stored.cancer,
        gout: stored.gout,
        diabetes: stored.diabetes,
        emotionalDisorder: stored.emotionalDisorder,
        epilepsy: stored.epilepsy,
        fainting: stored.fainting,
        gallstones: stored.gallstones,
        heartDisease: stored.heartDisease,
        heartAttack: stored.heartAttack,
        rheumaticFever: stored.rheumaticFever,
        highBP: stored.highBP,
        digestiveProblems: stored.digestiveProblems,
        ulcerative: stored.ulcerative,
        ulcerDisease: stored.ulcerDisease,
        hepatitis: stored.hepatitis,
        kidneyDiseases: stored.kidneyDiseases,
        liverDisease: stored.liverDisease,
        sleepApnea: stored.sleepApnea,
        papMachine: stored.papMachine,
        thyroid: stored.thyroid,
        tuberculosis: stored.tuberculosis,
        venereal: stored.venereal,
        neurologicalDisorders: stored.neurologicalDisorders,
        bleedingDisorders: stored.bleedingDisorders,
        lungDisease: stored.lungDisease,
        emphysema: stored.emphysema,
        none: stored.none,
        drink: stored.drink,
        smoke: stored.smoke
      };
    } else {
      this.patientService.selectedPatient = {
        _id: "",
        fname: "",
        lname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        address: "",
        phone: "",
        birthday: "",
        sex: "",
        ssn: "",
        allergies: "None",
        ec: "",
        ecRelationship: "",
        ecPhone: "",
        password: "",
        confirmPassword: "",
        anemia: false,
        asthma: false,
        arthritis: false,
        cancer: false,
        gout: false,
        diabetes: false,
        emotionalDisorder: false,
        epilepsy: false,
        fainting: false,
        gallstones: false,
        heartDisease: false,
        heartAttack: false,
        rheumaticFever: false,
        highBP: false,
        digestiveProblems: false,
        ulcerative: false,
        ulcerDisease: false,
        hepatitis: false,
        kidneyDiseases: false,
        liverDisease: false,
        sleepApnea: false,
        papMachine: false,
        thyroid: false,
        tuberculosis: false,
        venereal: false,
        neurologicalDisorders: false,
        bleedingDisorders: false,
        lungDisease: false,
        emphysema: false,
        none: false,
        drink: "",
        smoke: ""
      };
    }
  }
  myFunction() {
    window.scrollBy(-5000, -5000);
  }

  checkUserBeforeSubmit() {
    console.log("checkUserBeforeSubmit");
    let stored = JSON.parse(localStorage.getItem("Patient-info"));

    this.patientService
      .checkUser(this.patientService.selectedPatient.email)
      .subscribe(doc => {
        if (doc == "doesnot exist") {
          document.getElementById("emailValue").style.borderColor = "";
          if (this.patientService.selectedPatient.password == this.values) {
            this.passwordNotMatch = false;
            this.userAlreadyExist = false;
            document.getElementById("password").style.borderColor = "";
            document.getElementById("confirmPassword").style.borderColor = "";
            let PatientInfo = {
              _id: this.patientService.selectedPatient._id,
              fname: this.patientService.selectedPatient.fname,
              lname: this.patientService.selectedPatient.lname,
              email: this.patientService.selectedPatient.email,
              street: this.patientService.selectedPatient.street,
              city: this.patientService.selectedPatient.city,
              state: this.patientService.selectedPatient.state,
              zip: this.patientService.selectedPatient.zip,
              country: this.patientService.selectedPatient.country,
              address: `${this.patientService.selectedPatient.street}, ${this.patientService.selectedPatient.city}, ${this.patientService.selectedPatient.state}, ${this.patientService.selectedPatient.country} ${this.patientService.selectedPatient.zip}`,
              phone: this.patientService.selectedPatient.phone,
              password: this.patientService.selectedPatient.password,
              confirmPassword: this.patientService.selectedPatient
                .confirmPassword,
              birthday: this.patientService.selectedPatient.birthday,
              sex: this.patientService.selectedPatient.sex,
              ssn: this.patientService.selectedPatient.ssn,
              ec: this.patientService.selectedPatient.ec,
              ecRelationship: this.patientService.selectedPatient
                .ecRelationship,
              ecPhone: this.patientService.selectedPatient.ecPhone,
              allergies: this.patientService.selectedPatient.allergies,
              anemia: this.patientService.selectedPatient.anemia,
              asthma: this.patientService.selectedPatient.asthma,
              arthritis: this.patientService.selectedPatient.arthritis,
              cancer: this.patientService.selectedPatient.cancer,
              gout: this.patientService.selectedPatient.gout,
              diabetes: this.patientService.selectedPatient.diabetes,
              emotionalDisorder: this.patientService.selectedPatient
                .emotionalDisorder,
              epilepsy: this.patientService.selectedPatient.epilepsy,
              fainting: this.patientService.selectedPatient.fainting,
              gallstones: this.patientService.selectedPatient.gallstones,
              heartDisease: this.patientService.selectedPatient.heartDisease,
              heartAttack: this.patientService.selectedPatient.heartAttack,
              rheumaticFever: this.patientService.selectedPatient
                .rheumaticFever,
              highBP: this.patientService.selectedPatient.highBP,
              digestiveProblems: this.patientService.selectedPatient
                .digestiveProblems,
              ulcerative: this.patientService.selectedPatient.ulcerative,
              ulcerDisease: this.patientService.selectedPatient.ulcerDisease,
              hepatitis: this.patientService.selectedPatient.hepatitis,
              kidneyDiseases: this.patientService.selectedPatient
                .kidneyDiseases,
              liverDisease: this.patientService.selectedPatient.liverDisease,
              sleepApnea: this.patientService.selectedPatient.sleepApnea,
              papMachine: this.patientService.selectedPatient.papMachine,
              thyroid: this.patientService.selectedPatient.thyroid,
              tuberculosis: this.patientService.selectedPatient.tuberculosis,
              venereal: this.patientService.selectedPatient.venereal,
              neurologicalDisorders: this.patientService.selectedPatient
                .neurologicalDisorders,
              bleedingDisorders: this.patientService.selectedPatient
                .bleedingDisorders,
              lungDisease: this.patientService.selectedPatient.lungDisease,
              emphysema: this.patientService.selectedPatient.emphysema,
              none: this.patientService.selectedPatient.none,
              drink: this.patientService.selectedPatient.drink,
              smoke: this.patientService.selectedPatient.smoke
            };

            var myJSON = JSON.stringify(PatientInfo);
            localStorage.setItem("Patient-info", myJSON);

            this.goSearch();
          } else {
            this.passwordNotMatch = true;
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("confirmPassword").style.borderColor =
              "red";
            this.showFirst();
          }
        } else if (doc == "Subscriber already exists") {
          this.userAlreadyExist = true;
          document.getElementById("emailValue").style.borderColor = "red";
          this.showFirst();
        }
      });
  }

  goSearch() {
    this.router.navigate(["patient/registerTwo"]);
  }

  showFirst() {
    console.log("enter showFirst");
  }

  // Sumbit step 1/3
  onSubmit1(
    street: string,
    city: string,
    state: string,
    country: string,
    zip: string
  ) {
    console.log("form 1 sumbitted");
  }
}
