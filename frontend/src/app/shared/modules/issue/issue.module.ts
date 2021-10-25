import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IssueComponent} from "./components/issue/issue.component";
import {ModalModule} from "../modal/modal.module";
import {PicshowModule} from "../picshow/picshow.module";

@NgModule({
  imports: [CommonModule, ModalModule, PicshowModule],
  exports: [IssueComponent],
  declarations: [IssueComponent]
})
export class IssueModule {}
