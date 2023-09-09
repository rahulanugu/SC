import {Component} from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';

@Component({
    selector: 'healthcare-dialog-content',
    templateUrl: 'healthcare-dialog-content.component.html',
    styleUrls: ['healthcare-dialog-content.component.css'],
})
export class HealthcareDialogContent {

    constructor(public dialogRef: MatDialogRef<HealthcareDialogContent>){
    } 
    element: HTMLImageElement;
    pickAvatar(el){
        this.element = <HTMLImageElement>document.getElementById("avataricon");
        this.element.src = el.src;
        this.dialogRef.close(this.element.src)
    }
    //BharatChadalawada:Close dialog box added
    //BharatChadalawada: Avatar Updated to fix bug in avatar selection
    closeDialog(){ 
        if(this.element){
            this.dialogRef.close(this.element.src)
        }else{
            this.dialogRef.close()
        }
    }
}