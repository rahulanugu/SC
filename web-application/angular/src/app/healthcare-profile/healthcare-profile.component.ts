import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { DataService } from '../data.service';
import { PatientService } from '../shared/patient.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  png: string;
  name: string;
  dob: string;
  mrn: string;
  check_in1: string;
  check_in2: string;
  readd_risk1: string;
  readd_risk2: string;
  cond_risk1: string;
  cond_risk2: string;
  cond_risk3: string;
  cond_risk4: string;
  /*readmission_risk: number;
  condition_risk: string;*/
}

const ELEMENT_DATA: PeriodicElement[] = [
  {png: 'leslie_wang.png', name: 'Leslie Isablella Wang', dob: '03/12/1990', mrn: 'YTK34567891',
  check_in1: '12/18/2020', check_in2:'10:30 am',readd_risk1:'15%',readd_risk2:'No Admission Info',
  cond_risk1:'Dx',cond_risk2:'50%',cond_risk3:'28%',cond_risk4:'17%'},
  {png: 'adela.png', name: 'Adela Basic', dob: '02/10/1988', mrn: 'YTK89123456',
  check_in1: '05/05/2020', check_in2:'10:30 am',readd_risk1:'20%',readd_risk2:'No Admission Info',
  cond_risk1:'Dx',cond_risk2:'78%',cond_risk3:'28%',cond_risk4:'17%'},
  {png: 'arjun.png', name: 'Arjun Chandrashekhar', dob: '02/10/1988', mrn: 'YTK89123456',
  check_in1: '04/14/2020', check_in2:'10:30 am',readd_risk1:'25%',readd_risk2:'No Admission Info',
  cond_risk1:'Dx',cond_risk2:'83%',cond_risk3:'28%',cond_risk4:'17%'},
  {png: 'joanna.png', name: 'Joanna Krulik', dob: '02/10/1988', mrn: 'YTK89123456',
  check_in1: '03/25/2020', check_in2:'10:30 am',readd_risk1:'30%',readd_risk2:'No Admission Info',
  cond_risk1:'Dx',cond_risk2:'88%',cond_risk3:'28%',cond_risk4:'17%'},
  {png: 'calderon.png', name: 'Luis Alejandro Calderon', dob: '02/10/1988', mrn: 'YTK89123456',
  check_in1: '08/25/2020', check_in2:'10:30 am',readd_risk1:'35%',readd_risk2:'No Admission Info',
  cond_risk1:'Dx',cond_risk2:'66%',cond_risk3:'28%',cond_risk4:'17%'},
];

@Component({
  selector: 'app-healthcare-profile',
  templateUrl: './healthcare-profile.component.html',
  styleUrls: ['./healthcare-profile.component.css']
})
export class HealthcareProfileComponent implements OnInit {


  allPatients: Patient[]
  filteredPatients: Patient[]
  providerFirstName: string;
  displayedColumns: string[] = ['png','sort(a-z)', 'dob', 'mrn','check_in','readd_risk','cond_risk','btn'];
  dataSource: MatTableDataSource<PeriodicElement>;
  fName: string;
  lName: string;
  dob: string;
  addrow:string;

  constructor(
    private dataService: DataService,
    private service : PatientService,
    private router: Router,
    private http:HttpClient
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
    localStorage.setItem('code',window.location.href.split("?")[1].split("=")[1]);
    const code = localStorage.getItem('code');
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    //const body=`grant_type=authorization_code&code=${code}&redirect_uri=https://www.scriptchain.co/healthcare-profile&client_id=B5362FB7-A608-415F-ABA9-FAE232FCE90E`;
    //this.http.post("https://applescm184region.open.allscripts.com/authorization/connect/token", body,{headers}).subscribe(
    const body=`grant_type=authorization_code&code=${code}&redirect_uri=https://www.scriptchain.co/healthcare-profile&client_id=95da1fe3-9e58-4067-acdd-05664abe02f1`;
    this.http.post("https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token", body,{headers}).subscribe(
      res => {
        console.log(res);
        //localStorage.setItem('access_token',res["access_token"]);
        this.dataService.storeInCache(code,res["access_token"]).subscribe((res2)=>{
          console.log(res2);
        });
      },err=>{
        console.log(err);
      });
      this.providerFirstName = localStorage.getItem('fname');
      this.dataService.getPosts().subscribe(posts => {
      this.allPatients = posts
      this.dataService.postsData = posts
    });
  }

  search(){
    //console.log("test");
    /*ELEMENT_DATA.unshift({png: 'ashley.png', name: "test", dob: "test", mrn: 'YTK89123456',
         check_in1: '11/25/2020', check_in2:'10:30 am',readd_risk1:'0%',readd_risk2:'No Admission Info',
          cond_risk1:'Dx',cond_risk2:'65%',cond_risk3:'28%',cond_risk4:'17%'})*/
    //console.log(ELEMENT_DATA);
    //this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    var dob_tmp = this.dob.split('/');
    var new_dob = dob_tmp[2]+"-"+dob_tmp[0]+"-"+dob_tmp[1];
    //let elem = document.getElementsByClassName("searchresults")[0];
    this.dataService.getFromCache(localStorage.getItem("code")).subscribe(res1=>{
            console.log(res1);
      this.dataService.search(this.fName,this.lName,new_dob,res1).subscribe(res=>{
          console.log(res);
          var name = res["entry"][0].resource.name[0].text.split(" ")[1];
          var dob = res["entry"][0].resource.birthDate;
          //var gender = res["entry"][0].resource.gender;
          //var phone = res["entry"][0].resource.telecom[0].value;
          //var care = res["entry"][0].resource.careProvider[0].display;
          var dob_tmp = dob.split('-');
          var new_dob = dob_tmp[0]+"/"+dob_tmp[0]+"/"+dob_tmp[1];
          ELEMENT_DATA.unshift({png: 'albert_johnson.png', name: name, dob: new_dob, mrn: 'YTK89123456',
          check_in1: '11/25/2020', check_in2:'10:30 am',readd_risk1:'0%',readd_risk2:'No Admission Info',
          cond_risk1:'Dx',cond_risk2:'65%',cond_risk3:'28%',cond_risk4:'17%'})
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      });
    });
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //this.dataSource.filter = filterValue;
  }

  onSelectedOption(e) {
  //The search filtter is recieved and put in k here
    var k = e[1];
    this.getFilteredExpenseList(k);
  }

  getFilteredExpenseList(searchFilter) {
    //function to get the data from searchbar component
    //console.log("Search flter that should be used is "+searchFilter)
    if (this.dataService.searchOption.length > 0)
      {this.allPatients = this.dataService.filteredListOptions(searchFilter);
      this.filteredPatients = this.allPatients;}
    else {
      this.allPatients = this.dataService.postsData;
    }

    //console.log(this.allPatients)
  }

  openPatientProfile(patientId){
    //console.log("patientId being rtried to access is "+patientId)
    this.router.navigate(["healthcare-profile/patient/",patientId]);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('fname');
    this.router.navigate(['patientlogin']);
  }
  islabevents=false;
  isbutton=true;
  prefs=false;
  hidePrefs(){
    this.islabevents=true;
    this.isbutton=false;
  }
}
