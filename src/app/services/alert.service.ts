import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // ✅ Success Alert
  success(message: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  }

  // ✅ Error Alert
  error(message: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }

  // ✅ Warning Alert
  warning(message: string) {
    return Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message
    });
  }

  // ✅ Confirm Dialog
  confirm(message: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    });
  }
}