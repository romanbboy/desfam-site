import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DatebookComponent} from "./components/datebook/datebook.component";
import {RouterModule} from "@angular/router";
import {HeadlineModule} from "../shared/modules/headline/headline.module";
import {NotepadModule} from "../shared/modules/notepad/notepad.module";

const routes = [
  {
    path: 'datebooks/:slug',
    component: DatebookComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeadlineModule,
    NotepadModule
  ],
  declarations: [DatebookComponent],
  exports: [DatebookComponent]
})
export class DatebookModule {}
