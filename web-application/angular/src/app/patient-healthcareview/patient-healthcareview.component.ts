import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-patient-healthcareview',
  templateUrl: './patient-healthcareview.component.html',
  styleUrls: ['./patient-healthcareview.component.css']
})
export class PatientHealthcareviewComponent implements OnInit {

  highcharts5 = Highcharts;
   chartOptions5 = {   
      chart : {
         type:'pie',
         options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
         }
      },
      title : {
         text: 'Comprehensive Patient medical history'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            shadow: false,
            center: ['50%', '50%'],
            size:'75%',
            innerSize: '40%' ,
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
               enabled: true,
               format: '<b>{point.name}%</b>: {point.percentage:.1f} ',
               style: {
                  color:
                  'black',
                  fontsize: '75%'
               },
            }
         }
      },
      series : [{
         type: 'pie',
         name: 'Patient History',
         data: [
            ['CoPays',   45.0],
            ['VisitinClaims',       26.8],
            {
               name: 'MedicalClaims',
               y: 12.8,
               sliced: true,
               selected: true
            },
            ['DentalClaims',    8.5],
            ['VisionClaims',     6.2],
            ['Others',      0.7]
         ]
      }]
   };
  constructor() { }

  ngOnInit(): void {
  }

}
