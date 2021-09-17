import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SettingsComponent} from "./components/settings/settings.component";
import {RouterModule} from "@angular/router";
import {PicshowModule} from "../shared/modules/picshow/picshow.module";
import {UploaderModule} from "../shared/modules/uploader/uploader.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NoticeModule} from "../shared/modules/notice/notice.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {FieldNoticeModule} from "../shared/modules/field-notice/field-notice.module";
import {UiModule} from "../shared/modules/ui/ui.module";

const routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers),
    PicshowModule,
    UploaderModule,
    ReactiveFormsModule,
    NoticeModule,
    FieldNoticeModule,
    UiModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
