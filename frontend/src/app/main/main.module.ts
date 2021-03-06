import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainComponent} from './components/main/main.component';
import {RouterModule} from "@angular/router";
import {ListDatebooksModule} from "../shared/modules/listDatebooks/listDatebooks.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {UiModule} from "../shared/modules/ui/ui.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FieldNoticeModule} from "../shared/modules/field-notice/field-notice.module";
import {EffectsModule} from "@ngrx/effects";
import {AddDatebookEffect} from "./store/effects/addDatebook.effect";
import {NoticeModule} from "../shared/modules/notice/notice.module";
import {GetAllDatebooksEffect} from "./store/effects/getAllDatebooks.effect";
import {MsgModule} from "../shared/modules/msg/msg.module";
import {GetAllInvitationEffect} from "./store/effects/getAllInvitation.effect";
import {InvitationEffect} from "./store/effects/invitation.effect";

const  routes = [
  {
    path: '',
    component: MainComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('main', reducers),
    EffectsModule.forFeature([
      AddDatebookEffect,
      GetAllDatebooksEffect,
      GetAllInvitationEffect,
      InvitationEffect
    ]),
    ListDatebooksModule,
    UiModule,
    ReactiveFormsModule,
    FieldNoticeModule,
    NoticeModule,
    MsgModule
  ],
  declarations: [
    MainComponent
  ],
})
export class MainModule {}
