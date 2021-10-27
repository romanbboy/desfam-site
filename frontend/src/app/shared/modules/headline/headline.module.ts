import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeadlineComponent} from "./components/headline/headline.component";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, CalendarModule, FormsModule],
  declarations: [HeadlineComponent],
  exports: [HeadlineComponent]
})
export class HeadlineModule {}
