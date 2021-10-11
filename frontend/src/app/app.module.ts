import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {DatebookModule} from "./datebook/datebook.module";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {TopBarModule} from "./shared/modules/topBar/topBar.module";
import {SettingsModule} from "./settings/settings.module";
import {MainModule} from "./main/main.module";
import {StoreModule} from "@ngrx/store";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/services/authinterceptor.service";
import {NoticeModule} from "./shared/modules/notice/notice.module";
import {UiModule} from "./shared/modules/ui/ui.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {AlertModule} from "./shared/modules/alert/alert.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmModule} from "./shared/modules/confirm/confirm.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    MainModule,
    AuthModule,
    DatebookModule,
    TopBarModule,
    SettingsModule,
    NoticeModule,
    UiModule,
    AlertModule,
    ConfirmModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
