import {
  Component,
  OnInit,
  ɵConsole
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  HealthcareLoginService
} from '../shared/healthcare-login.service';
import {
  Router
} from '@angular/router';
import {
  HealthcareEditService
} from '../shared/healthcare-edit.service';
import {
  Patient
} from '../shared/patient.model';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  MatTableDataSource
} from '@angular/material';
import {
  DataService
} from '../data.service';
import {
  PatientService
} from '../shared/patient.service';



/**
 * Page: Login page for heatlhcare providers
 */
export class AthenaLoginDetails {
  //datamodel for sending username and password to backend
  username: string;
  password: string;
}
@Component({
  selector: 'app-healthcare-login',
  templateUrl: './athenalogin.component.html',
  styleUrls: ['../app.component.css']
})
export class AthenaLoginComponent implements OnInit {

  healthcareLoginDetails = new AthenaLoginDetails();
  allPatients: Patient[]
  filteredPatients: Patient[]
  providerFirstName: string;
  dataSource: MatTableDataSource < Object > ;
  displayedColumns: string[] = ['sno', 'fname', 'lname', 'sex', 'birthday', 'view'];
  fName: string;
  lName: string;
  dob: string;
  addrow: string;

  constructor(
    private formBuilderService: FormBuilder,
    private healthcareLoginService: HealthcareLoginService,
    private healthcareEditService: HealthcareEditService,
    private dataService: DataService,
    private service: PatientService,
    private router: Router,
    private http: HttpClient

  ) {}

  ngOnInit() {
    localStorage.setItem('code', window.location.href);
    const code = localStorage.getItem('code');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=https://www.scriptchain.co/healthcare-profile&client_id=788a5f45-8fcc-4ad9-bce6-e7eeefc8ac41`;
    this.http.post("https://api.athenahealth.com/oauthpreview/token", body, {
      headers
    }).subscribe(
      res => {
        localStorage.setItem('token',res["idToken"])
        localStorage.setItem('fname',res["firstName"])
        localStorage.setItem('email', res["username"])
        localStorage.setItem('password', res["password"])
        console.log(res);
        //localStorage.setItem('access_token',res["access_token"]);
        this.dataService.storeInCache(code, res["access_token"]).subscribe((res) => {
          console.log(res);
        });
      }, err => {
        console.log(err);
      });
    this.providerFirstName = localStorage.getItem('fname');
    this.dataService.getPosts().subscribe(posts => {
      this.allPatients = posts
      this.dataService.postsData = posts
    });
  }
}


/* //this.router.navigate(['healthcare-profile'])
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic NHA2ZGtrOWVteDhjYnU2aGhxamJ4cmFqOlB2aFp2bkVzZzZyQWNOdw==");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          //redirect: 'follow',
          observe: 'redirect' as 'redirect'
      

        };
                 fetch("https://api.athenahealth.com/oauthpreview/token", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

      },
*/


/*         err => {
          console.log(err)
          //console.log("Error is")
          //console.log(err)
          if (err.status == 401) {
            document.querySelector('#emailAddress').classList.remove('is-invalid');
            document.querySelector('#invalidEmailPrompt').classList.add('d-none');
            document.querySelector('#password').classList.add('is-invalid');
            document.querySelector('#invalidPasswordPrompt').classList.remove('d-none');
            document.querySelector('#deactivatedEmail').classList.add('d-none');


          } else if (err.status == 303) {
            //console.log("deactivated email handling")
            //send a reactivare mail
            this.healthcareEditService.makeReactivateRequest({
              email: this.Form.value.emailAddress
            }).subscribe(
              response => {
                //console.log("response is recieved")
                document.querySelector('#deactivatedEmail').classList.remove('d-none');
              },
              error => {
                //console.log("error is recieved")
                this.router.navigate['error500']
              }
            );
          } else {
            //console.log("errorcode")
            document.querySelector('#invalidPasswordPrompt').classList.add('d-none');
            document.querySelector('#emailAddress').classList.add('is-invalid');
            document.querySelector('#password').classList.add('is-invalid');
            document.querySelector('#invalidEmailPrompt').classList.remove('d-none');
            document.querySelector('#deactivatedEmail').classList.add('d-none');

          }
        }
      )

    }

  } */
