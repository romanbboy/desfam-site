import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService: MessageService) {}

  success(msg): void {
    this.messageService.add({severity: 'success', detail: msg});
  }

  error(msg): void {
    this.messageService.add({severity: 'error', detail: msg});
  }

  info(msg): void {
    this.messageService.add({severity: 'info', detail: msg});
  }

  warn(msg): void {
    this.messageService.add({severity: 'warn', detail: msg});
  }

  clear() {
    this.messageService.clear();
  }
}
