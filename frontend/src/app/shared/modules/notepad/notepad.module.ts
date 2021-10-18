import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotepadComponent} from "./components/notepad/notepad.component";
import {IssueModule} from "../issue/issue.module";
import {PicshowModule} from "../picshow/picshow.module";
import {UiModule} from "../ui/ui.module";
import {FieldNoticeModule} from "../field-notice/field-notice.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {IssueEffect} from "../issue/store/effects/issue.effect";

@NgModule({
  imports: [
    CommonModule,
    IssueModule,
    PicshowModule,
    UiModule,
    FieldNoticeModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([
      IssueEffect
    ])
  ],
  declarations: [NotepadComponent],
  exports: [NotepadComponent]
})
export class NotepadModule {}
