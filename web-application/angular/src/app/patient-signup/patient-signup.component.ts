import { Component, OnInit } from "@angular/core";
import { HealthcareDialogContent } from "../healthcare-dialog-content/healthcare-dialog-content.component";
import { ToastrNotificationService } from "../toastr-notification.service";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CustomValidator } from "../shared/validators/validation";
import { PatientSignUpService } from "../shared/patientSignUp.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-patient-signup",
  templateUrl: "./patient-signup.component.html",
  styleUrls: ["./patient-signup.component.css"],
})
export class PatientSignupComponent implements OnInit {
  element: HTMLImageElement;
  imageSrc: string = "";  //BharatChadalawada - Image source variable
  avtarImgSrc: string = "";//BharatChadalawada - Avatar image source variable
  passwordNotMatch: boolean = false;//BharatChadalawada - Password match variable
  userAlreadyExist: boolean = false;//BharatChadalawada - User already exist boolean variable
  profileImageChangedStatus = "init";
  uploadImageLabel = "Choose file (max size 1MB)";
  imageFileIsTooBig = false;
  selectedFileSrc: string;
  isAgree:boolean = false;
  showPassword: boolean = false;//BharatChadalawada - Password visibility variable
  retypeShowPassword: boolean = false;//BharatChadalawada - Password retype variable
//BharatChadalawada
//Updated to make TC button functional and check if agreed by user 
  constructor(
    private formBuilderService: FormBuilder,
    private router: Router,
    private toastr: ToastrNotificationService,
    private patientSignUpService: PatientSignUpService, 
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  patientModel = {};
//BharatChadalawada
//added pattern for Password 
//Show Password functionality 
  Form = this.formBuilderService.group({
    emailPhone: ["", Validators.required],
    password: ["", [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.*[A-Z]).{6,}$/)
    ]],
    is_agree:[false,Validators.required],
    imageUrl: ["",Validators.required],
    retypepassword:["",Validators.required],
    avtarImg:[""]
  });
//BharatChadalawada
//Updated the Submit button 
//Checks if passwords match 
//Success response toast added
  submitForm() { 
    this.passwordNotMatch = this.Form.get('retypepassword').value == this.Form.get('password').value? false: true;
    if(!this.isAgree){
      this.toastr.errorToast('Please Agree to the Terms and Conditions','Error')
      return;
    }
    if(!this.passwordNotMatch){
      console.log('formvalues-------- ', this.Form.value)
    this.Form.get('is_agree').setValue(this.isAgree)
      this.patientSignUpService.create(this.Form.value).subscribe(
        (res) => {
          this.router.navigate(["patient/login"]);
          this.toastr.successToast("A verification email has been sent", "Registration Submitted");
        },(error) => {

          //BharatChadalawada
          //Added alert toast for response error

          this.toastr.errorToast(error.error.message, error.statusText);
          console.log('An error occurred:', error);
        }
      );
    }
  }

  // previewImage(imageInput: HTMLInputElement): void {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     this.imageSrc = reader.result as string;
  //   };  

  //   reader.addEventListener("load", (event: any) => {
  //     this.imageSrc = event.target.result;
  //     this.patientSignUpService.uploadProfileImage(file).subscribe(
  //       (response) => {
  //         this.Form.patchValue({
  //           imageUrl: response.url,
  //         });
  //       },
  //       () => {
  //         this.profileImageChangedStatus = "fail";
  //       }
  //     );
  //   });

  //   reader.readAsDataURL(file);
  // }
//BharatChadalawada
// Image functionality added 
  onImageSelected(event:any){
    this.element = <HTMLImageElement>document.getElementById("avataricon");
    console.log('src-------', this.element)
    // console.log('event-------------------- ', event)
    const file:File = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (event:any) =>{
      this.imageSrc = reader.result as string
      this.Form.get('imageUrl').setValue(this.imageSrc)
      this.Form.get('imageUrl').markAsTouched()

    };
    reader.readAsDataURL(file)
  }

//BharatChadalawada
//Avatar functionality altered and made functional
  openDialog() {
    const dialogRef = this.dialog.open(HealthcareDialogContent);
    dialogRef.afterClosed().subscribe((result: any) => {
      this.Form.get('imageUrl').setValue(result)
      this.Form.get('imageUrl').markAsTouched()
    });
  }

  /*removeUploadLine() {
    const uploadLine = document.getElementById("uploadLine");
    if (uploadLine) {
      uploadLine.remove();
    }
  }*/
  //BharatChadalawada
  //Password visibility functionality added
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  retypePasswordVisibility(){
    this.retypeShowPassword = !this.retypeShowPassword;
  }
}