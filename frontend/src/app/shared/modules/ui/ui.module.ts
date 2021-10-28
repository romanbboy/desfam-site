import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CloseComponent} from "./components/close/close.component";
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { SkeletonListComponent } from './components/skeletons/skeleton-list/skeleton-list.component';
import { SkeletonNotepadComponent } from './components/skeletons/skeleton-notepad/skeleton-notepad.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CloseComponent,
    SubmitButtonComponent,
    SkeletonListComponent,
    SkeletonNotepadComponent
  ],
  exports: [
    CloseComponent,
    SubmitButtonComponent,
    SkeletonListComponent,
    SkeletonNotepadComponent
  ]
})
export class UiModule {}
