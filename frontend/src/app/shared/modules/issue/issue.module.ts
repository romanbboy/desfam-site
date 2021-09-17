import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IssueComponent} from "./components/issue/issue.component";
import {ModalModule} from "../modal/modal.module";

@NgModule({
  imports: [CommonModule, ModalModule],
  exports: [IssueComponent],
  declarations: [IssueComponent]
})
export class IssueModule {}
