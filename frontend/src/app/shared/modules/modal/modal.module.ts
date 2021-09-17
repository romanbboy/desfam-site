import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ConfirmationComponent} from "./components/confirmation/confirmation.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ConfirmationComponent],
  exports: [ConfirmationComponent]
})
export class ModalModule {}
