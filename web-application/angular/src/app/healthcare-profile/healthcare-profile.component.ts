import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { DataService } from '../data.service';
import { PatientService } from '../shared/patient.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

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
  {png: 'ashley.png', name: 'Ashley Citarella', dob: '02/10/1988', mrn: 'YTK89123456',
  check_in1: '11/25/2020', check_in2:'10:30 am',readd_risk1:'0%',readd_risk2:'No Admission Info',
  cond_risk1:'Dx',cond_risk2:'65%',cond_risk3:'28%',cond_risk4:'17%'},
  {png: 'albert_johnson.png', name: 'Albert Johnson', dob: '02/10/1988', mrn: 'YTK89123456',
  check_in1: '10/20/2020', check_in2:'10:30 am',readd_risk1:'10%',readd_risk2:'No Admission Info',
  cond_risk1:'Dx',cond_risk2:'75%',cond_risk3:'28%',cond_risk4:'17%'},
  {png: 'leslie_wang.png', name: 'Leslie Isablella Wang', dob: '02/10/1988', mrn: 'YTK89123456',
  check_in1: '07/15/2020', check_in2:'10:30 am',readd_risk1:'15%',readd_risk2:'No Admission Info',
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
  dataSource = ELEMENT_DATA;
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
  }

  ngOnInit() {
    localStorage.setItem('code',window.location.href.split("?")[1].split("=")[1]);
    const code = localStorage.getItem('code');
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const body=`grant_type=authorization_code&code=${code}&redirect_uri=https://www.scriptchain.co/healthcare-profile&client_id=B5362FB7-A608-415F-ABA9-FAE232FCE90E`;
    this.http.post("https://applescm184region.open.allscripts.com/authorization/connect/token", body,{headers}).subscribe(
      res => {
        console.log(res);
        //localStorage.setItem('access_token',res["access_token"]);
        this.dataService.storeInCache(code,res["access_token"]).subscribe((res)=>{
          console.log(res);
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
    let elem = document.getElementsByClassName("searchresults")[0];
    this.dataService.getFromCache(localStorage.getItem("code")).subscribe(res1=>{
      //let res1 = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiI3ODhhNWY0NS04ZmNjLTRhZDktYmNlNi1lN2VlZWZjOGFjNDEiLCJlcGljLmVjaSI6InVybjplcGljOlVTQ0RJLW9uLUZISVIiLCJlcGljLm1ldGFkYXRhIjoibl9ybjlGaW82VHpHSklEWnVzSTktRkRjajl5Qk03YmpnbXFtUm5ldHVRaDJESlpUZ0xPZUpub1QtczJvUDFwUmpJNHB5el84N0h4ZzFqLVRocTF5VmpPR3RGeTkwMkoxSFNaSFNrWTkzeFkxbVRnYnhqSmNNWDVaZzRGc0lOMWMiLCJlcGljLnRva2VudHlwZSI6ImFjY2VzcyIsImV4cCI6MTYwNDA0NzA0MCwiaWF0IjoxNjA0MDQzNDQwLCJpc3MiOiJ1cm46b2lkOmZoaXIiLCJqdGkiOiJlYWQ5MDgyYi1kODAyLTQ1ZDctOGExYy1mNjQ5Y2NlYTdlZDciLCJuYmYiOjE2MDQwNDM0NDAsInN1YiI6ImVtU2pyRUQwRUJaUDJsVTdlU3lQRTZ3MyJ9.nJCOXYw0jEgxExls9K8khC6DU4OIF8ODvLL66UplcqgAtDKgBkFSLG4ougExEKksprftanf37KQgpnk_KKXtX3rBZgN9oRnc47r9ALJ0RUSVX1ZZgZ5_kIKs3Ntn4K8I6ew7rYkVZe4gH9tzGpl8k6sL46y8pl84JMA6PfMCgH17IZ-ooApSes__R7mDQHDBadlsq8p2kpLiFthX6hqoQoYMGUMX-aaoQAUaMPPLBPxEBO9j149QfGl1cX18Q4mryskyLu2yZs_FuPtn1urLkA9PHei4n_--hLcMj9DvmX5y7b9kC-xK0gxPBtXWL3VwvuNbr4k5EIuvtHrx8HJdug"
      this.dataService.search(this.fName,this.lName,this.dob,res1).subscribe(res=>{
          console.log(res);
          var name = res["entry"][0].resource.name[0].text.split(" ")[1];
          var dob = res["entry"][0].resource.birthDate;
          var gender = res["entry"][0].resource.gender;
          var phone = res["entry"][0].resource.telecom[0].value;
          var care = res["entry"][0].resource.careProvider[0].display;
        elem.insertAdjacentHTML('afterbegin',"<div class='box' style='padding:10px;box-shadow: 1px 1px 10px 3px lightgray;background-color: white;margin-bottom: 5%;padding-top: 1%;'>"+
        "<div class='row' style='border-bottom: 2px solid #E1E4EB;'><div class='col-md-2' style='margin-bottom: 1%;'><img src='../../assets/Avatar.png'/>"+
        "<b style='margin-left:3%;padding:1%'>"+name+"</b></div><div class='col-md-5' ></div>"+
        "<div class='col-md-4' style='padding:1%'>Next Appointment Today 11:30 am</div><div class='col-md-1' style='padding:1%'>"+
        "<img src='../../assets/view.png' style='cursor:pointer' (click)= 'openPatientProfile(1234)'/></div></div>"+
        "<div class='row row1' style='padding-top: 1%;'><div class='col-md-1'><b>DOB</b></div><div class='col-md-2'>"+dob+"</div>"+
        "<div class='col-md-3'><b>Driver's License</b></div><div class='col-md-3'>NHL2323128</div>"+
        "<div class='col-md-3'>"+care+"</div></div><div class='row row1' style='padding-top: 1%;'>"+
        "<div class='col-md-1'><b>Sex</b></div><div class='col-md-2'>"+gender+"</div>"+
        "<div class='col-md-3'><b>Last 4 digits of SSN</b></div><div class='col-md-3'>0010</div>"+
        "<div class='col-md-3'>Department of Cardiology</div></div><div class='row row1' style='padding-top: 1%;'>"+
        "<div class='col-md-1'><b>Residence</b></div><div class='col-md-2'>New York City, NY</div>"+
        "<div class='col-md-3'><b>Phone Number</b></div><div class='col-md-3'>"+phone+"</div>"+
        "<div class='col-md-3'>Dr. Beth Smith</div></div><div class='row row1' style='padding-top: 1%;'>"+
        "<div class='col-md-1'><b>MRN</b></div><div class='col-md-2'>YTK18273825</div>"+
        "<div class='col-md-3'><b>Email</b></div><div class='col-md-3'>theo@gmail.com</div>"+
        "<div class='col-md-3'>COPD,CHF,Diabetes(Type 2)</div></div></div>"
      );

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
