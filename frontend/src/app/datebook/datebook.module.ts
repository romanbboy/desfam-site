import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DatebookComponent} from "./components/datebook/datebook.component";
import {RouterModule} from "@angular/router";
import {HeadlineModule} from "../shared/modules/headline/headline.module";
import {NotepadModule} from "../shared/modules/notepad/notepad.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {GetDatebookEffect} from "./store/effects/getDatebook.effect";
import {UiModule} from "../shared/modules/ui/ui.module";
import {NoticeModule} from "../shared/modules/notice/notice.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FieldNoticeModule} from "../shared/modules/field-notice/field-notice.module";
import {UserService} from "../shared/services/user.service";
import {PicshowModule} from "../shared/modules/picshow/picshow.module";
import {DeleteParticipantEffect} from "./store/effects/deleteParticipant.effect";
import {EscapeDatebookEffect} from "./store/effects/escapeDatebook.effect";
import {GetIssuesEffect} from "./store/effects/getIssues.effect";

const routes = [
  {
    path: 'datebooks/:id',
    component: DatebookComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('datebook', reducers),
    EffectsModule.forFeature([
      GetDatebookEffect,
      GetIssuesEffect,
      DeleteParticipantEffect,
      EscapeDatebookEffect
    ]),
    HeadlineModule,
    NotepadModule,
    UiModule,
    NoticeModule,
    ReactiveFormsModule,
    FieldNoticeModule,
    PicshowModule
  ],
  declarations: [DatebookComponent],
  exports: [DatebookComponent],
  providers: [UserService]
})
export class DatebookModule {}
