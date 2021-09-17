import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NoticeComponent} from "./components/notice/notice.component";

@NgModule({
  imports: [CommonModule],
  declarations: [NoticeComponent],
  exports: [NoticeComponent]
})
export class NoticeModule {}
