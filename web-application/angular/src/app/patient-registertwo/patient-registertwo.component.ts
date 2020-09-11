import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PatientService } from "../shared/patient.service";
import { NgForm } from "@angular/forms";
import { formatNumber } from "@angular/common";
import { RouterLink } from "@angular/router";


/**
 * Page 2 of 3 for patient account registration
 */
@Component({
  selector: "app-patient-registertwo",
  templateUrl: "./patient-registertwo.component.html",
  styleUrls: ["../app.component.css"]
})
export class PatientRegistertwoComponent implements OnInit {
  emergencyContactMatch: boolean;
  emergencyNumberMatch: boolean;
  emergencyContactNameLength: boolean;
  public socialsecurity = [
    /[0-9]/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
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

  values: string = "";

  onKey(event: any) {
    // without type info
    this.values = event.target.value;
  }

  constructor(public patientService: PatientService, private router: Router) {}

  ngOnInit() {
    this.showSecond();
    let stored = JSON.parse(localStorage.getItem("Patient-info"));

    if (!stored) {
      this.firstPage();
    }
    if (stored) {
      this.values = stored.confirmPassword;
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
        birthday: stored.birthday,
        sex: stored.sex,
        ssn: stored.ssn,
        allergies: "None",
        ec: stored.ec,
        ecRelationship: stored.ecRelationship,
        ecPhone: stored.ecPhone,
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
        none: true,
        drink: "",
        smoke: ""
      };
    }
  }

  myFunction() {
    window.scrollBy(-5000, -5000);
  }

  checkEmergencyContactNameNumber() {
    let stored = JSON.parse(localStorage.getItem("Patient-info"));
    let check = this.patientService.selectedPatient.ec.split(" ");

    if (
      this.patientService.selectedPatient.ec.length == 0 ||
      this.patientService.selectedPatient.ecPhone.length == 0 ||
      this.patientService.selectedPatient.ecRelationship.length == 0
    ) {
      this.showSecond();
    } else if (check.length == 1 || check[check.length - 1].length == 0) {
      this.emergencyContactNameLength = true;
      this.emergencyContactMatch = false;
      this.showSecond();
    } else if (
      this.patientService.selectedPatient.ec ==
        `${stored.fname} ${stored.lname}` &&
      this.patientService.selectedPatient.ecPhone == stored.phone
    ) {
      this.emergencyContactMatch = true;
      this.emergencyNumberMatch = true;
      document.getElementById("ec").style.borderColor = "red";
      document.getElementById("ecPhone").style.borderColor = "red";
      this.showSecond();
    } else if (this.patientService.selectedPatient.ecPhone == stored.phone) {
      this.emergencyContactMatch = false;
      this.emergencyNumberMatch = true;
      this.emergencyContactNameLength = false;
      document.getElementById("ecPhone").style.borderColor = "red";
      document.getElementById("ec").style.borderColor = "";
      this.showSecond();
    } else if (
      this.patientService.selectedPatient.ec ==
      `${stored.fname} ${stored.lname}`
    ) {
      this.emergencyContactMatch = true;
      this.emergencyNumberMatch = false;
      document.getElementById("ec").style.borderColor = "red";
      document.getElementById("ecPhone").style.borderColor = "";
      this.showSecond();
    } else {
      this.emergencyContactMatch = false;
      this.emergencyNumberMatch = false;
      document.getElementById("ecPhone").style.borderColor = "";
      document.getElementById("ec").style.borderColor = "";

      let PatientInfo = {
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
        birthday: this.patientService.selectedPatient.birthday,
        sex: this.patientService.selectedPatient.sex,
        ssn: this.patientService.selectedPatient.ssn,
        ec: this.patientService.selectedPatient.ec,
        ecPhone: this.patientService.selectedPatient.ecPhone,
        ecRelationship: this.patientService.selectedPatient.ecRelationship,
        allergies: "None",
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

      var myJSON = JSON.stringify(PatientInfo);

      let pageType = {
        pageType: "thirdPage"
      };
      var pageJSON = JSON.stringify(pageType);

      localStorage.setItem("pageType", pageJSON);

      localStorage.setItem("Patient-info", myJSON);

      this.goSearch();
    }
  }

  goSearch() {
    this.router.navigate(["patient/registerThree"]);
  }

  goBackOne() {
    //console.log("go back one");
    this.myFunction();

    let stored = JSON.parse(localStorage.getItem("Patient-info"));

    let PatientInfo = {
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
      birthday: this.patientService.selectedPatient.birthday,
      sex: this.patientService.selectedPatient.sex,
      ssn: this.patientService.selectedPatient.ssn,
      ec: this.patientService.selectedPatient.ec,
      ecPhone: this.patientService.selectedPatient.ecPhone,
      ecRelationship: this.patientService.selectedPatient.ecRelationship,
      allergies: stored.allergies,
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

    var myJSON = JSON.stringify(PatientInfo);

    localStorage.setItem("Patient-info", myJSON);

    this.router.navigate(["patient/register"]);
  }

  firstPage() {
    this.router.navigate(["patient/register"]);
  }

  showSecond() {
    //console.log("enter showSecond");
    this.myFunction();
    // document.getElementById("part1").style.visibility="hidden";
    document.getElementById("part2").style.visibility = "visible";
    // document.getElementById("part3").style.visibility="hidden";
    // document.getElementById("register_successful").style.visibility="hidden";
    document.getElementById("r2").style.display = "block";
    // document.getElementById("register_successful").style.display="none";
  }

  // Submit step 2/3
  onSubmit2(form: NgForm) {
    //console.log("form 2 sumbitted");
  }
}
