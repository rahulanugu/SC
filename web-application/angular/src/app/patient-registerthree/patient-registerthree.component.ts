import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PatientService } from "../shared/patient.service";
import { NgForm, FormArray, FormControl } from "@angular/forms";
import { formatNumber } from "@angular/common";
import { RouterLink } from "@angular/router";

/**
 * Page 3 of 3 for patient account registration
 */
@Component({
  selector: "app-patient-registerthree",
  templateUrl: "./patient-registerthree.component.html",
  styleUrls: ["./../app.component.css"]
})
export class PatientRegisterthreeComponent implements OnInit {
  enteredDrinkAmount: boolean;
  diseaseArrayLength: boolean;
  enteredSmokeAmount: boolean;
  disableMe: boolean = false;
  diseaseArray: Array<string> = [];

  constructor(public patientService: PatientService, private router: Router) {}
  ngOnInit() {
    this.showThird();
    let stored = JSON.parse(localStorage.getItem("Patient-info"));
    let pageType = JSON.parse(localStorage.getItem("pageType"));

    if (!stored) {
      this.firstPage();
    } else if (!pageType) {
      this.secondPage();
    } else {
      console.log("entered");

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
    }
  }

  addDisease(diseaseName: string) {
    let checkType = document.getElementById(`${diseaseName}`);
    if (this.diseaseArray.includes(diseaseName)) {
      let indexOfDisease = this.diseaseArray.indexOf(diseaseName);

      this.diseaseArray.splice(indexOfDisease, 1);
    } else if (
      !this.diseaseArray.includes(diseaseName) ||
      checkType.getAttribute("ng-reflect-model") == "true"
    ) {
      this.diseaseArray.push(diseaseName);
    }
  }

  myFunction() {
    window.scrollBy(-5000, -5000);
  }

  uncheckall(name: string) {
    let checkType = document.getElementById("uncheck");
    let stored = JSON.parse(localStorage.getItem("Patient-info"));
    this.diseaseArray.splice(0, this.diseaseArray.length);

    if (checkType.getAttribute("ng-reflect-model") == "false") {
      this.diseaseArray.push(name);
    } else {
      this.diseaseArray.pop();
    }

    if (checkType.getAttribute("ng-reflect-model") == "false") {
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
        password: stored.password,
        confirmPassword: stored.confirmPassword,
        birthday: stored.birthday,
        sex: stored.sex,
        ssn: stored.ssn,
        ec: stored.ec,
        ecRelationship: stored.ecRelationship,
        ecPhone: stored.ecPhone,
        allergies: stored.allergies,
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
        none: this.patientService.selectedPatient.none,
        drink: this.patientService.selectedPatient.drink,
        smoke: this.patientService.selectedPatient.smoke
      };
      this.disableMe = true;
    } else {
      this.disableMe = false;
    }
  }

  preCheckBeforeSubmit() {
    let stored = JSON.parse(localStorage.getItem("Patient-info"));

    if (
      this.patientService.selectedPatient.drink.length == 0 &&
      this.patientService.selectedPatient.smoke.length == 0 &&
      this.diseaseArray.length == 0
    ) {
      this.enteredDrinkAmount = true;
      this.enteredSmokeAmount = true;
      this.diseaseArrayLength = true;
      this.showThird();
    } else if (this.diseaseArray.length == 0) {
      this.enteredDrinkAmount = false;
      this.enteredSmokeAmount = false;
      this.diseaseArrayLength = true;
      this.showThird();
    } else if (this.patientService.selectedPatient.drink.length == 0) {
      this.enteredSmokeAmount = false;
      this.enteredDrinkAmount = true;
      this.diseaseArrayLength = false;
      this.showThird();
    } else if (this.patientService.selectedPatient.smoke.length == 0) {
      this.enteredSmokeAmount = true;
      this.enteredDrinkAmount = false;
      this.diseaseArrayLength = false;
      this.showThird();
    } else {
      this.enteredSmokeAmount = false;
      this.enteredDrinkAmount = false;
      this.diseaseArrayLength = false;

      let PatientInfo = {
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
        password: stored.password,
        birthday: stored.birthday,
        sex: stored.sex,
        ssn: stored.ssn,
        ec: stored.ec,
        ecRelationship: stored.ecRelationship,
        ecPhone: stored.ecPhone,
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
        rheumaticFever: this.patientService.selectedPatient.rheumaticFever,
        highBP: this.patientService.selectedPatient.highBP,
        digestiveProblems: this.patientService.selectedPatient
          .digestiveProblems,
        ulcerative: this.patientService.selectedPatient.ulcerative,
        ulcerDisease: this.patientService.selectedPatient.ulcerDisease,
        hepatitis: this.patientService.selectedPatient.hepatitis,
        kidneyDiseases: this.patientService.selectedPatient.kidneyDiseases,
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

      this.onSubmit3();
    }
  }

  goBackAgain() {
    console.log("go back again");
    this.myFunction();
    let stored = JSON.parse(localStorage.getItem("Patient-info"));

    let PatientInfo = {
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
      password: stored.password,
      confirmPassword: stored.confirmPassword,
      birthday: stored.birthday,
      sex: stored.sex,
      ssn: stored.ssn,
      ec: stored.ec,
      ecPhone: stored.ecPhone,
      ecRelationship: stored.ecRelationship,
      allergies: this.patientService.selectedPatient.allergies,
      anemia: this.patientService.selectedPatient.anemia,
      asthma: this.patientService.selectedPatient.asthma,
      arthritis: this.patientService.selectedPatient.arthritis,
      cancer: this.patientService.selectedPatient.cancer,
      gout: this.patientService.selectedPatient.gout,
      diabetes: this.patientService.selectedPatient.diabetes,
      emotionalDisorder: this.patientService.selectedPatient.emotionalDisorder,
      epilepsy: this.patientService.selectedPatient.epilepsy,
      fainting: this.patientService.selectedPatient.fainting,
      gallstones: this.patientService.selectedPatient.gallstones,
      heartDisease: this.patientService.selectedPatient.heartDisease,
      heartAttack: this.patientService.selectedPatient.heartAttack,
      rheumaticFever: this.patientService.selectedPatient.rheumaticFever,
      highBP: this.patientService.selectedPatient.highBP,
      digestiveProblems: this.patientService.selectedPatient.digestiveProblems,
      ulcerative: this.patientService.selectedPatient.ulcerative,
      ulcerDisease: this.patientService.selectedPatient.ulcerDisease,
      hepatitis: this.patientService.selectedPatient.hepatitis,
      kidneyDiseases: this.patientService.selectedPatient.kidneyDiseases,
      liverDisease: this.patientService.selectedPatient.liverDisease,
      sleepApnea: this.patientService.selectedPatient.sleepApnea,
      papMachine: this.patientService.selectedPatient.papMachine,
      thyroid: this.patientService.selectedPatient.thyroid,
      tuberculosis: this.patientService.selectedPatient.tuberculosis,
      venereal: this.patientService.selectedPatient.venereal,
      neurologicalDisorders: this.patientService.selectedPatient
        .neurologicalDisorders,
      bleedingDisorders: this.patientService.selectedPatient.bleedingDisorders,
      lungDisease: this.patientService.selectedPatient.lungDisease,
      emphysema: this.patientService.selectedPatient.emphysema,
      none: this.patientService.selectedPatient.none,
      drink: this.patientService.selectedPatient.drink,
      smoke: this.patientService.selectedPatient.smoke
    };

    var myJSON = JSON.stringify(PatientInfo);

    localStorage.setItem("Patient-info", myJSON);

    this.router.navigate(["patient/registerTwo"]);
  }

  firstPage() {
    this.router.navigate(["patient/register"]);
  }

  secondPage() {
    this.router.navigate(["patient/registerTwo"]);
  }

  showThird() {
    console.log("enter showThird");
    this.myFunction();
    document.getElementById("part3").style.visibility = "visible";
    document.getElementById("r3").style.display = "block";
  }

  // Create new patient in db
  onSubmit3() {
    document.getElementById("r3").style.display = "none";
    let stored = JSON.parse(localStorage.getItem("Patient-info"));

    this.patientService.postPatient(stored).subscribe(res => {
      console.log("patient saved successfully");
      localStorage.removeItem("Patient-info");
      localStorage.removeItem("pageType");

      // for verification using jwt and token
      var myJSON = JSON.stringify(res);
      localStorage.setItem("user-jwt", myJSON);
      this.router.navigate(["registersuccessful"]);
    });
  }
}
