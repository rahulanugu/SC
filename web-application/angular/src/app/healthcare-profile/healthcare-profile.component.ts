import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { DataService } from '../data.service';
import { PatientService } from '../shared/patient.service';
import { Router } from '@angular/router';
import { PatientBasic } from '../shared/patient.basic.model';
import {MatTableDataSource} from '@angular/material';
import { HttpClient,HttpHeaders} from '@angular/common/http';

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

  constructor(
    private dataService: DataService,
    private service : PatientService,
    private router: Router,
    private http:HttpClient
  ) { 
    this.service.getPatient().subscribe((patients) => {
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
     });
  }

  ngOnInit() {
    localStorage.setItem('code',window.location.href.split("?")[1].split("=")[1]);
    //localStorage.setItem('code','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiI3ODhhNWY0NS04ZmNjLTRhZDktYmNlNi1lN2VlZWZjOGFjNDEiLCJlcGljLmVjaSI6InVybjplcGljOlVTQ0RJLW9uLUZISVIiLCJlcGljLm1ldGFkYXRhIjoiV0Zpa0lCckdoVzd6bDVoTVcyZGM4azZadG5HajlveWtWX0xTbElIdzFJcDRPd0RJMEExckZEbU9PbnY4YmlHajRxREJjVUF4azc4RUc2eTlONERWZU9fdjFndGs3YzZFc0FwczJmMkNfWDNfdF9yM1laUDB5QngxMGNwaGxGc2wiLCJlcGljLnRva2VudHlwZSI6ImNvZGUiLCJleHAiOjE2MDIwMTIyODksImlhdCI6MTYwMjAxMTk4OSwiaXNzIjoidXJuOm9pZDpmaGlyIiwianRpIjoiMDZkYzUyNTYtZDA2Yy00MzVmLThiYjktODUyZjYxNmQ5Mjc0IiwibmJmIjoxNjAyMDExOTg5LCJzdWIiOiJlbVNqckVEMEVCWlAybFU3ZVN5UEU2dzMifQ.TN9BWYw5oSX_U4BDOz-j2G9tJwv6uv56JZ213njW93ql7EvX-eHuV1aa7bOIrJoF8iGO4x54DoAAec5NMbvJE-XD_dZ6mFMQoVRhAuc8orPQuBZBWrNmyvftHAhgwlgPPeDC6q3OgJc3dpjh497jbLeTBms2xK9sNEIyfevUZfVurouxN5KlyHzFcw1HAdXfyixeEr03ONRCuxB60T8gl2x8z7ymWKg7vz1oRtqtU_2Z7ePRZp29lwEaADiFXdvXwJyhnTUejSNKdmggxV6btRZUcdnUDtn0yXRavAjw5Y6XCj2g0b40aLLaOLkNqltrCXi2xdOvejKFpTh_yPzJlw');
    const code = localStorage.getItem('code');
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const body=`grant_type=authorization_code&code=${code}&redirect_uri=https://www.scriptchain.co/healthcare-profile&client_id=788a5f45-8fcc-4ad9-bce6-e7eeefc8ac41`;
    this.http.post("https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token", body,{headers}).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('access_token',res["access_token"]);
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
    this.service.search(this.fName,this.lName,this.dob).subscribe(res=>{
        console.log(res);
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