import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) { }

  successToast(msg, title) {
    this.toastr.success(msg, title);
  }

  errorToast(msg, title) {
    this.toastr.error(msg, title);
  }
}
