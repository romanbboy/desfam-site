import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CloseComponent} from "./components/close/close.component";
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { SkeletonListComponent } from './components/skeletons/skeleton-list/skeleton-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CloseComponent,
    SubmitButtonComponent,
    SkeletonListComponent
  ],
  exports: [
    CloseComponent,
    SubmitButtonComponent,
    SkeletonListComponent
  ]
})
export class UiModule {}
