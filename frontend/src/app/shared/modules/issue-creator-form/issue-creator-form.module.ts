import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueCreatorFormComponent } from './components/issue-creator-form/issue-creator-form.component';
import {FieldNoticeModule} from "../field-notice/field-notice.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UiModule} from "../ui/ui.module";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";



@NgModule({
  declarations: [
    IssueCreatorFormComponent
  ],
  exports: [
    IssueCreatorFormComponent
  ],
  imports: [
    CommonModule,
    FieldNoticeModule,
    ReactiveFormsModule,
    UiModule,
    DropdownModule,
    FormsModule,
    CalendarModule
  ]
})
export class IssueCreatorFormModule { }
