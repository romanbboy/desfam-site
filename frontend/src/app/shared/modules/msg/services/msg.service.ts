import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MsgService {
  constructor(private messageService: MessageService) {}

  info() {
    this.messageService.add({severity: 'info', summary:'Service Message', detail:'Via MessageService'});
  }

  clear() {
    this.messageService.clear();
  }
}
