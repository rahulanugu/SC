import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { DataService } from '../data.service';
import { PatientService } from '../shared/patient.service';
import { Router } from '@angular/router';
import { PatientBasic } from '../shared/patient.basic.model';
import {MatTableDataSource} from '@angular/material';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-healthcare-profile',
  templateUrl: './healthcare-profile.component.html',
  styleUrls: ['./healthcare-profile.component.css']
})
export class HealthcareProfileComponent implements OnInit {


  allPatients: Patient[]
  filteredPatients: Patient[]
  providerFirstName: string;
  dataSource: MatTableDataSource<Object>;
  displayedColumns: string[] = ['sno','fname', 'lname', 'sex','birthday','view'];
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
    /*this.service.getPatient().subscribe((patients) => {
      var tmpArr = []
      for (let i = 0; i < patients.length; i++) {
        var tmp = {}
        tmp['fname'] = patients[i]['fname'];
        tmp['lname'] = patients[i]['lname'];
        tmp['sex'] = patients[i]['sex'];
        tmp['birthday'] = patients[i]['birthday'];
        tmp['sno'] = i+1;
        tmp['view'] = patients[i]['_id'];
        tmpArr.push(tmp);
      }
      console.log(tmpArr);
      this.dataSource = new MatTableDataSource(tmpArr);
     });*/
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
    this.dataSource.filter = filterValue;
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
    columnDefs = [
        {headerName: "id", field: "id" ,sortable: true, filter: true},
        {headerName: "name", field: "name",sortable: true, filter: true},
        {headerName: "status", field: "status"},
        {headerName: "value", field: "value"},
        {headerName: "code", field: "code",sortable: true, filter: true},
        {headerName: "effectiveDateTime", field: "effectiveDateTime"}
    ];
    rowData = [
        {id: "TLAsiQXC3WlPGLEoSKMe.FvJWdE9yU9rpRK9VQ4Zste0B", name: "POC PLATELET COUNT", status: "final",value:210,code:" ",effectiveDateTime:"2012-10-27T18:45:00Z"},
        {id: "TYcTop.0vJsGrmR-BIgypXCcYN1Qpj2h5rH00.Fo-y1QB", name: "HEMOGLOBIN A1C/HEMOGLOBIN TOTAL IN BLOOD", status: "final",value:7.1,code:"4548-4",effectiveDateTime:"2006-07-07T14:50:00Z"},
        {id: "TyTACVT8EN3y297LJpmHOTRzwSjv9b2P1BFGIE-mjMUIB", name: "HEMOGLOBIN BLOOD GAS", status: "final",value:15,code:""  ,effectiveDateTime:"2010-02-20T17:34:00Z"},
        {id: "TSTSVo6iPXJ550gR.dzbEwPwQ.OgtmL46.qNOys3T3PEB", name: "HEMOGLOBIN BLOOD GAS", status: "final",value:13.9,code:""  ,effectiveDateTime:"2009-03-18T15:49:00Z"},
        {id: "TYCUjrj3QX46ruuAzS4KssuUDL-z1qDLMd10e2t5uW0YB", name: "HEMOGLOBIN BLOOD GAS", status: "final",value:14.4,code:""  ,effectiveDateTime:"2007-07-25T15:49:00Z"},
        {id: "TmkRWk0ZaNDkgPXzKZxGkwdslHYFIXs3jc9qqCzVJrWsB", name: "HEMOGLOBIN BLOOD GAS", status: "final",value:14.1,code:""  ,effectiveDateTime:"2006-07-07T14:43:00Z"},
        {id: "TilEpnEc2JSAPBX9OZuAvb8lJpBBns1vqmnK8DZKy4AIB", name: "HEMOGLOBIN (G/DL) IN BLOOD", status: "final",value:15,code:"718-7"  ,effectiveDateTime:"2012-10-19T21:26:00Z"},
        {id: "TDJDQ1SGKpTxooOqzhg-DwF2gYqmwRfJDubWl5ayepbUB", name: "HEMOGLOBIN (G/DL) IN BLOOD", status: "final",value:15,code:"718-7"  ,effectiveDateTime:"2009-03-12T12:45:00Z"},
        {id: "TilEpnEc2JSAPBX9OZuAvbzu8L93AEHFOzfle-ffyNmQB", name: "HEMATOCRIT (%) IN BLOOD BY AUTOMATED COUNT", status: "final",value:45,code:"4544-3",effectiveDateTime:"2012-10-19T21:26:00Z"},
        {id: "TyTACVT8EN3y297LJpmHOTVaNYMKb9mQfHPVHi652DWwB", name: "HEMATOCRIT (%) IN BLOOD BY AUTOMATED COUNT", status: "final",value:44.4,code:"4544-3",effectiveDateTime:"2010-02-20T17:34:00Z"},
        {id: "TSTSVo6iPXJ550gR.dzbEwE50pI28LqjQdfsPRcMqCdQB", name: "HEMATOCRIT (%) IN BLOOD BY AUTOMATED COUNT", status: "final",value:40.9,code:"4544-3",effectiveDateTime:"2009-03-18T15:49:00Z"},
        {id: "TDJDQ1SGKpTxooOqzhg-DwHj5SJJZCcSCVCrNfOPjo7AB", name: "HEMATOCRIT (%) IN BLOOD BY AUTOMATED COUNT", status: "final",value:42.9,code:"4544-3",effectiveDateTime:"2009-03-12T12:45:00Z"}
    ];

}