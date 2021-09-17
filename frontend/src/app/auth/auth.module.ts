import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {RegistrationEffect} from "./store/effects/registration.effect";
import {AuthService} from "./services/auth.service";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {NoticeModule} from "../shared/modules/notice/notice.module";
import {LoginEffect} from "./store/effects/login.effect";
import {GetCurrentUserEffect} from "./store/effects/getCurrentUser.effect";
import {LogoutEffect} from "./store/effects/logout.effect";
import {UpdateCurrentUserEffect} from "./store/effects/updateCurrentUser.effect";
import {FieldNoticeModule} from "../shared/modules/field-notice/field-notice.module";
import {UiModule} from "../shared/modules/ui/ui.module";

const routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EffectsModule.forFeature([
      RegistrationEffect,
      LoginEffect,
      GetCurrentUserEffect,
      LogoutEffect,
      UpdateCurrentUserEffect
    ]),
    StoreModule.forFeature('auth', reducers),
    NoticeModule,
    FieldNoticeModule,
    UiModule
  ],
  declarations: [RegistrationComponent, LoginComponent],
  providers: [AuthService]
})
export class AuthModule {}
