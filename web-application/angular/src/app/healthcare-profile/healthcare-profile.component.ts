import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { DataService } from '../data.service';
import { PatientService } from '../shared/patient.service';
import { Router } from '@angular/router';
import { PatientBasic } from '../shared/patient.basic.model';
import {MatTableDataSource} from '@angular/material';

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

  constructor(
    private dataService: DataService,
    private service : PatientService,
    private router: Router
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
    localStorage.setItem('code',window.location.href.split("?")[1]);
    console.log(localStorage.getItem('code'));
    this.providerFirstName = localStorage.getItem('fname');
    this.dataService.getPosts().subscribe(posts => {
      this.allPatients = posts
      this.dataService.postsData = posts
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