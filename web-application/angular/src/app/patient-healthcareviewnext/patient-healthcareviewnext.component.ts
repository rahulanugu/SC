import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { HealthcareviewService } from '../shared/healthcareview.service';
import { DataService } from '../data.service';

@Component({
   selector: 'app-patient-healthcareviewnext',
   templateUrl: './patient-healthcareviewnext.component.html',
   styleUrls: ['./patient-healthcareviewnext.component.css']
})
export class PatientHealthcareviewnextComponent implements OnInit {

   startdate: any;
   enddate: any;
   vital: any;

   patientAnalytic = { "AGE": [1], "ETHNICITY": 1, "GENDER": 1, "50802": 1, "50804": 1, "50808": 1, "50809": 1, "50810": 1, "50811": 1, "50813": 1, "50818": 1, "50820": 1, "50821": 1, "50822": 1, "50824": 1, "50861": 1, "50862": 1, "50863": 1, "50868": 1, "50878": 1, "50882": 1, "50885": 1, "50893": 1, "50902": 1, "50910": 1, "50912": 1, "50931": 1, "50954": 1, "50960": 1, "50970": 1, "50971": 1, "50983": 1, "51006": 1, "51144": 1, "51146": 1, "51200": 1, "51221": 1, "51222": 1, "51237": 1, "51244": 1, "51248": 1, "51249": 1, "51250": 1, "51254": 1, "51256": 1, "51265": 1, "51274": 1, "51275": 1, "51277": 1, "51279": 1, "51301": 1, "51491": 1, "51498": 1, "ICD9_CODE_y": 1 };


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

   condition = {
      'name': 'Hypertension',
      'value': '83'
   }

   recommendedMedications = {
      'not_prescribed': [
         {
            'class': 'ACE Inhibitors',
            'meds': 'CO2A'
         },
         {
            'class': 'Antiplatelet Agents',
            'meds': 'CO2B'
         },
         {
            'class': 'Angiotensin Receptor-Neprilysin Inhibitors',
            'meds': 'CO2L'
         }
      ],
      'allergic': []
   }

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

   abnormalLabs = [
      {
         'test': 'Cholesterol',
         'result': '243 mg/dL',
         'status': 'high'
      },
      {
         'test': 'LDL Cholesterol',
         'result': '141 mg/dL',
         'status': 'high'
      },
      {
         'test': 'Non-HDL Cholesterol',
         'result': '149 mg/dL',
         'status': 'high'
      }
   ]

   priorProcedures = [
      {
         'name': 'Angioplasty',
         'date': '11/05/2015',
         'details': ''
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
   constructor(
      private dataService: DataService,
      private router: Router,
      private healthcareservice: HealthcareviewService
   ) { }

   ngOnInit() {
      var id = 1234
      this.healthcareservice.getFHIRdata(id).subscribe((data) => {
         var dict = JSON.parse(data.toString());
         this.patientInfo = dict["patientDetails"];
         this.patientInfo.bmi = Number(this.patientInfo.bmi).toFixed(2);
         this.diagnosedConditions = dict["diagnosedConditions"];
         this.recommendedMedications = dict["recommendedMedications"];
         this.abnormalLabs = dict["abnormalLabs"];
         this.condition = dict["conditionRisks"];
         this.priorProcedures = dict["priorProcedures"];
         this.vitalData = dict["vitalData"];
      })
      this.healthcareservice.getAnalytic(this.patientAnalytic).subscribe((data) => {
         var dict = JSON.parse(data.toString());
         // this.condition['value'] = Math.round(dict["ASHD coronary artery"]).toString();
         this.condition['value'] = Math.round(dict["Hypertension"]).toString();
         // this.condition['value'] = Math.round(dict["Congestive Heart Failure"]).toString();
         // this.condition['value'] = Math.round(dict["Atrial Fibrilliation"]).toString();
      });

   }
   printPage() {
      window.print();
   }
}
