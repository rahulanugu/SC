import {Component} from '@angular/core';

@Component({
    selector: 'healthcare-dialog-content',
    templateUrl: 'healthcare-dialog-content.component.html',
    styleUrls: ['healthcare-dialog-content.component.css'],
})
export class HealthcareDialogContent {

    element: HTMLImageElement;
    pickAvatar(el){
        this.element = <HTMLImageElement>document.getElementById("avataricon");
        this.element.src = el.src;
    }
}