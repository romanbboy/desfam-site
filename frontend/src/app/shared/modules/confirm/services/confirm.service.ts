import { Injectable } from '@angular/core';
import {ConfirmationService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private confirmationService: ConfirmationService) { }

  confirm(options: {msg: string, accept: Function}) {
    this.confirmationService.confirm({
      message: options.msg,
      accept: () => {
        options.accept();
      }
    });
  }
}
