import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { HealthcareviewService } from '../shared/healthcareview.service';

@Component({
   selector: 'app-patient-healthcareviewnext1',
   templateUrl: './patient-healthcareviewnext1.component.html',
   styleUrls: ['./patient-healthcareviewnext1.component.css']
})
export class PatientHealthcareviewnextComponent1 implements OnInit {

   startdate: any;
   enddate: any;
   vital: any;

   patientInfo = {
      'name': 'Theodore Grey',
      'sex': 'Male',
      'age': 68,
      'height': 70,
      'weight': 200,
      'bmi': (703 * 200 / (70 * 70)).toFixed(2),
      'id': '1234',
      'mrn': 'YTK89123456',
      'dob': '03/12/1951',
      'next_appt': {
         'date': '11/25/2020',
         'time': '10:30 am'
      },
      'readmissionRisks': [
         {
            'name': 'Coronary Heart Disease',
            'symptoms': 'Angina, dizziness, nausea',
            'value': null
         }
      ],
      'allergies': [],
      'lifestyle': {
         'smokes': true,
      },
      'prescribedMedications': [
         {
            'name': 'Crestor',
            'dosage': '20mg',
            'date_prescribed': '09/17/2008'
         }
      ]
   }

   feet = Math.trunc(this.patientInfo.height / 12)
   inches = this.patientInfo.height % 12

   readmissionRisk = 52

   diagnosedConditions = [
      {
         'name': 'Coronary Artery Disease',
         'date': '1/20/2015',
         'details': ''
      },
      {
         'name': 'Diabetes (Type II)',
         'date': '07/13/2011',
         'details': ''
      },
      {
         'name': 'Hyperlipidemia',
         'date': '12/02/2009',
         'details': ''
      }
   ]

   admissionHistory = [
      {
         'discharge': '11/05/2020',
         'date': '11/12/2020',
         'details': 'Patient admitted for heart failure'
      }
   ]



   public bottomdiv2: boolean = false;
   public bottomdiv3: boolean = false;
   public bottomdiv4: boolean = false;
   public bottomdiv: boolean = false;
   public bottomdiv5: boolean = false;
   displaybelow2() {
      this.bottomdiv2 = !this.bottomdiv2;
      this.bottomdiv = false;
      this.bottomdiv3 = false;
      this.bottomdiv4 = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
   displaybelow3() {
      this.bottomdiv3 = !this.bottomdiv3;
      this.bottomdiv = false;
      this.bottomdiv2 = false;
      this.bottomdiv4 = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
   displaybelow4() {
      this.bottomdiv4 = !this.bottomdiv4;
      this.bottomdiv = false;
      this.bottomdiv3 = false;
      this.bottomdiv2 = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
   displaybelow() {
      this.bottomdiv = !this.bottomdiv;
      this.bottomdiv2 = false;
      this.bottomdiv3 = false;
      this.bottomdiv4 = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
   scrollRight() {
      var e = <HTMLDivElement>(document.getElementById("scroller"));
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
         e.scrollLeft += 30;
         scrollAmount += 30;
         if (scrollAmount >= 300) {
            window.clearInterval(slideTimer);
         }
      }, 25);
   }
   scrollLeft() {
      var e = <HTMLDivElement>(document.getElementById("scroller"));
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
         e.scrollLeft -= 30;
         scrollAmount += 30;
         if (scrollAmount >= 300) {
            window.clearInterval(slideTimer);
         }
      }, 25);
   }

   vitalData = {
      "weight": {
         "dates": ["2022/04/24", "2022/05/26", "2022/06/25", "2022/07/24", "2022/08/25", "2022/09/25",
            "2022/10/25"],
         "weights": [174.8, 175.2, 174.8, 175.4, 175.8, 176.1, 175]
      },
      "height": {
         "dates": ["2022/04/24", "2022/05/26", "2022/06/25", "2022/07/24", "2022/08/25", "2022/09/25",
            "2022/10/25"],
         "heights": [97, 97.2, 97.5, 98, 98.2, 99.5, 97.5]
      },
      'Diastolic': {
         'dates': ['2006/07/07', '2006/07/12', '2006/07/17', '2006/08/18', '2006/10/22', '2007/01/27', '2007/07/25', '2008/05/03', '2009/03/12', '2009/03/12', '2009/03/14', '2009/03/14', '2009/03/14', '2009/03/18', '2010/02/20', '2010/04/21', '2010/06/12', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/27'],
         'Diastolics': [98, 100, 100, 92, 86, 88, 88, 90, 60, 60, 62, 72, 84, 98, 88, 88, 85, 90, 80, 80, 80, 80, 80]
      },

      'Systolic': {
         'dates': ['2006/07/07', '2006/07/12', '2006/07/17', '2006/08/18', '2006/10/22', '2007/01/27', '2007/07/25', '2008/05/03', '2009/03/12', '2009/03/12', '2009/03/14', '2009/03/14', '2009/03/14', '2009/03/18', '2010/02/20', '2010/04/21', '2010/06/12', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/27'],
         'Systolics': [150, 156, 160, 148, 138, 138, 136, 140, 104, 110, 106, 116, 120, 150, 136, 138, 135, 120, 120, 120, 120, 120, 120]
      }
   }

   highcharts = Highcharts;
   chartOptions = {
      credits: {
         enabled: false
      },
      chart: {
         type: "spline"
      },
      title: {
         text: "Height",
         margin: 15,
         style: { "fontSize": "18px" }
      },
      xAxis: {
         title: {
            text: "Date",
            margin: 10,
         },
         categories: this.vitalData["height"]["dates"]
      },
      yAxis: {
         title: {
            text: "Height cm",
            margin: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent',
         }
      },
      tooltip: {
         valueSuffix: " cm"
      },
      series: [
         {
            data: this.vitalData["height"]["heights"],
            showInLegend: false
         }
      ]
   };
   weight_highcharts = Highcharts;
   weight_chartOptions = {
      credits: {
         enabled: false
      },
      chart: {
         type: "spline"
      },
      title: {
         text: "Weights",
         margin: 15,
         style: { "fontSize": "18px" }
      },
      xAxis: {
         title: {
            text: "Date",
            margin: 10
         },
         categories: this.vitalData["weight"]["dates"]
      },
      yAxis: {
         title: {
            text: "Weight (lbs)",
            margin: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent'
         }
      },
      tooltip: {
         valueSuffix: "lbs"
      },
      series: [
         {
            data: this.vitalData["weight"]["weights"],
            showInLegend: false
         }
      ]
   }

   diastolic_highcharts = Highcharts;
   diastolic_chartOptions = {
      credits: {
         enabled: false
      },
      chart: {
         type: "spline"
      },
      title: {
         text: "Diastolic Blood Pressure",
         margin: 15,
         style: { "fontSize": "18px" }
      },
      xAxis: {
         title: {
            text: "Date",
            margin: 10
         },
         categories: this.vitalData["Diastolic"]["dates"]
      },
      yAxis: {
         title: {
            text: "Diastolic Blood Pressure (mm[Hg])",
            margin: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent'
         }
      },
      tooltip: {
         valueSuffix: "mm[Hg]"
      },
      series: [
         {
            data: this.vitalData["Diastolic"]["Diastolics"],
            showInLegend: false
         }
      ]
   }

   systolic_highcharts = Highcharts;
   systolic_chartOptions = {
      credits: {
         enabled: false
      },
      chart: {
         type: "spline"
      },
      title: {
         text: "Systolic Blood Pressure",
         margin: 15,
         style: { "fontSize": "18px" }
      },
      xAxis: {
         title: {
            text: "Date",
            margin: 10
         },
         categories: this.vitalData["Systolic"]["dates"]
      },
      yAxis: {
         title: {
            text: "Systolic Blood Pressure (mm[Hg])",
            margin: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent'
         }
      },
      tooltip: {
         valueSuffix: "mm[Hg]"
      },
      series: [
         {
            data: this.vitalData["Systolic"]["Systolics"],
            showInLegend: false
         }
      ]
   }
   openNextView(patientId, diseaseId) {
      //console.log("patientId being rtried to access is "+patientId)
      this.router.navigate(["healthcare-profile/patient/" + patientId + "/" + diseaseId]);
   }

   dateValidate() {
      var start = new Date(this.startdate)
      var end = new Date(this.enddate)
      if (start.getTime() > end.getTime()) {
         this.startdate = ""
         this.enddate = ""
         window.alert("start date must before the end date")
      }

      if (this.vital == 'weight' && this.startdate && this.enddate) {
         var date_lis = [];
         var data_lis = [];
         for (var i = 0; i < this.vitalData.weight.dates.length; i++) {
            var date = new Date(this.vitalData.weight.dates[i]);
            if (date >= start && date <= end) {
               date_lis.push(this.vitalData.weight.dates[i]);
               data_lis.push(this.vitalData.weight.weights[i]);
            }
         }
         this.weight_chartOptions = {
            credits: {
               enabled: false
            },
            chart: {
               type: "spline"
            },
            title: {
               text: "Weights",
               margin: 15,
               style: { "fontSize": "18px" }
            },
            xAxis: {
               title: {
                  text: "Date",
                  margin: 10
               },
               categories: date_lis
            },
            yAxis: {
               title: {
                  text: "Weight (lbs)",
                  margin: 10,
                  gridLineWidth: 0,
                  minorGridLineWidth: 0,
                  gridLineColor: 'transparent'
               }
            },
            tooltip: {
               valueSuffix: "lbs"
            },
            series: [
               {
                  data: data_lis,
                  showInLegend: false
               }
            ]
         }
      }
      if (this.vital == 'temperature' && this.startdate && this.enddate) {
         var date_lis = [];
         var data_lis = [];
         for (var i = 0; i < this.vitalData.height.dates.length; i++) {
            var date = new Date(this.vitalData.height.dates[i]);
            if (date >= start && date <= end) {
               date_lis.push(this.vitalData.height.dates[i]);
               data_lis.push(this.vitalData.height.heights[i]);
            }
         }
         this.chartOptions = {
            credits: {
               enabled: false
            },
            chart: {
               type: "spline"
            },
            title: {
               text: "Height",
               margin: 15,
               style: { "fontSize": "18px" }
            },
            xAxis: {
               title: {
                  text: "Date",
                  margin: 10
               },
               categories: date_lis
            },
            yAxis: {
               title: {
                  text: "Height cm",
                  margin: 10,
                  gridLineWidth: 0,
                  minorGridLineWidth: 0,
                  gridLineColor: 'transparent'
               }
            },
            tooltip: {
               valueSuffix: " cm"
            },
            series: [
               {
                  data: data_lis,
                  showInLegend: false
               }
            ]
         };
      }
      if (this.vital == 'diastolic' && this.startdate && this.enddate) {
         var date_lis = [];
         var data_lis = [];
         for (var i = 0; i < this.vitalData.Diastolic.dates.length; i++) {
            var date = new Date(this.vitalData.Diastolic.dates[i]);
            if (date >= start && date <= end) {
               date_lis.push(this.vitalData.Diastolic.dates[i]);
               data_lis.push(this.vitalData.Diastolic.Diastolics[i]);
            }
         }
         this.diastolic_chartOptions = {
            credits: {
               enabled: false
            },
            chart: {
               type: "spline"
            },
            title: {
               text: "Diastolic Blood Pressure",
               margin: 15,
               style: { "fontSize": "18px" }
            },
            xAxis: {
               title: {
                  text: "Date",
                  margin: 10
               },
               categories: date_lis
            },
            yAxis: {
               title: {
                  text: "Diastolic Blood Pressure (mm[Hg])",
                  margin: 10,
                  gridLineWidth: 0,
                  minorGridLineWidth: 0,
                  gridLineColor: 'transparent'
               }
            },
            tooltip: {
               valueSuffix: "mm[Hg]"
            },
            series: [
               {
                  data: data_lis,
                  showInLegend: false
               }
            ]
         }
      }
      if (this.vital == 'systolic' && this.startdate && this.enddate) {
         var date_lis = [];
         var data_lis = [];
         for (var i = 0; i < this.vitalData.Systolic.dates.length; i++) {
            var date = new Date(this.vitalData.Systolic.dates[i]);
            if (date >= start && date <= end) {
               date_lis.push(this.vitalData.Systolic.dates[i]);
               data_lis.push(this.vitalData.Systolic.Systolics[i]);
            }
         }
         this.systolic_chartOptions = {
            credits: {
               enabled: false
            },
            chart: {
               type: "spline"
            },
            title: {
               text: "Systolic Blood Pressure",
               margin: 15,
               style: { "fontSize": "18px" }
            },
            xAxis: {
               title: {
                  text: "Date",
                  margin: 10
               },
               categories: date_lis
            },
            yAxis: {
               title: {
                  text: "Systolic Blood Pressure (mm[Hg])",
                  margin: 10,
                  gridLineWidth: 0,
                  minorGridLineWidth: 0,
                  gridLineColor: 'transparent'
               }
            },
            tooltip: {
               valueSuffix: "mm[Hg]"
            },
            series: [
               {
                  data: data_lis,
                  showInLegend: false
               }
            ]
         }
      }
   }
   constructor(private router: Router,
      private healthcareservice: HealthcareviewService) { }

   ngOnInit() {

      var id = 1234
      this.healthcareservice.getFHIRdata(id).subscribe((data) => {
         var dict = JSON.parse(data.toString());
         console.log(dict["vitalData"]);
         this.patientInfo = dict["patientDetails"];
         this.patientInfo.bmi = Number(this.patientInfo.bmi).toFixed(2);
         this.diagnosedConditions = dict["diagnosedConditions"];
         this.readmissionRisk = dict["readimissionRisk"].toString();
         this.admissionHistory = dict["admissionHistory"];
         this.vitalData = dict["vitalData"];
      })
      /*var chart = new CanvasJS.Chart("chartContainer",{
         title:{
         text: "Vitals"
         },
         axisY:{
           includeZero: false
   
         },
         data: [
         {
           type: "line",
   
           dataPoints: [
           { x: new Date(2012, 0, 1), y: 97, indexLabel: "97" },
           { x: new Date(2012, 1, 1), y: 97.2, indexLabel: "97.2"},
             { x: new Date(2012, 2, 1), y: 97.4, indexLabel: "97.4"},
           { x: new Date(2012, 3, 1), y: 98, indexLabel: "98" },
           { x: new Date(2012, 4, 1), y: 98.2, indexLabel: "98.2" },
           { x: new Date(2012, 5, 1), y: 98.7, indexLabel: "98.7" },
           { x: new Date(2012, 6, 1), y: 99, indexLabel: "highest 99",markerColor: "red", markerType: "triangle" },
           { x: new Date(2012, 7, 1), y: 98.8, indexLabel: "98.8" },
           { x: new Date(2012, 8, 1), y: 98.6, indexLabel: "98.6" , }
     
           ]
         }
         ]
       });
       chart.render();*/
   }
   printPage() {
      window.print();
   }
}
